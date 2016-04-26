define(["text!fs/FullScreen.html", 
        "css!fs/FullScreen",
        'util/IchUtil',
        'util/AppUtil',
        'fs/FSHelper',
        "mainPane/view_pane/ViewPaneHelper",
        "text!fs/FullScreenItem.html",
        'util/LayoutUtil',
        'util/ScrollUtil',
        "m/AppModel",
        'enum/AppEnum'],
        
function(FullScreenHTML, FullScreenCSS, IchUtil, AppUtil, FSHelper, ViewPaneHelper, FullScreenItem, LayoutUtil, ScrollUtil, AppModel, AppEnum)
{			
	function addListeners()
	{
		AppUtil.addTouchEvent('#contentPage #contentBody #mainPane #rDiv #viewPaneWrapper #viewPane #viewPaneItems .vpItem', onPinchOpenTapEvent);		
		AppUtil.addTouchEvent('#fullScreen #fsParentDiv #fsScrollWrapper #fullScreenItems .fsItem', onFSImgTabEvent);		
		AppUtil.addTouchEvent('#fullScreen #fsParentDiv #leftArrow', onLeftArrowClick);		
		AppUtil.addTouchEvent('#fullScreen #fsParentDiv #rightArrow', onRightArrowClick);		
		AppUtil.addTouchEvent('#fullScreen #fsParentDiv #fsOptsDiv #collapseBtn', onCollapseClick);		
		AppUtil.addSwipeLeftEvent('#fullScreen #fsParentDiv #fsScrollWrapper #fullScreenItems', onSwipeLeft);	
		AppUtil.addSwipeRightEvent('#fullScreen #fsParentDiv #fsScrollWrapper #fullScreenItems', onSwipeRight);	
	}
	
	function onPinchOpenTapEvent()
	{
		console.log("onPinchOpenTapEvent");
		var isSelectable = AppModel.isSelectable();
		if(isSelectable == false || isSelectable == undefined) // enter full screen
		{
			var $fsItem = $(this);
			FSHelper.setView($fsItem);
		}
	}
	
	function onSwipeLeft(e)
	{
		 onRightArrowClick();
	}
	
	function onSwipeRight(e)
	{
		onLeftArrowClick();
	}
	
	function onFSImgTabEvent()
	{
		//var $img = $(this);
		//FSHelper.invokeZoomIn($img);
	}
	
	function onLeftArrowClick()
	{
		FSHelper.onLeftArrowClick();
	}

	function onRightArrowClick()
	{
		FSHelper.onRightArrowClick();
	}
	
	function onCollapseClick()
	{
		FSHelper.onCollapseClick();
	}
		
	var fullScreenPage = 
	{
		init:function()
		{
			IchUtil.applyIchTemplate('noname', FullScreenHTML, $('#fullScreen'));	
			addListeners();
			var n = 3; // lets only add 3 items
			var viewPaneItemsDiv = $('#fullScreen #fullScreenItems');
			for(var i = 0; i < n; i++)
			{
				var fsObj = {idx: i};
				IchUtil.appendIchTemplate('noname', FullScreenItem, viewPaneItemsDiv, fsObj);	
			}	
			FSHelper.setFullScreenDefaults(LayoutUtil.appHeight, LayoutUtil.appWidth, ScrollUtil, LayoutUtil.picFSHeight, LayoutUtil.picFSWidth, LayoutUtil.picFSWidthNarrow);
		}
	};
	return fullScreenPage;
});