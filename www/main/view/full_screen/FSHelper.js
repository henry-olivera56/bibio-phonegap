define(['util/IchUtil', 
        'util/AppUtil',        
        "mainPane/view_pane/ViewPaneHelper",
        'adptr/DeviceAdaptor'],
        
function(IchUtil, AppUtil, ViewPaneHelper, DeviceAdaptor, FullScreenItemHtml)
{
	var isFullScreen = false;
	var pageWidth = undefined;
	var contentWidth = undefined;
	var pageHeight = undefined;
	var fsDiv = undefined;
	var hScroll = undefined;
	var ScrollUtil = undefined;
	var fsItem1 = undefined;
	var fsItem2 = undefined;
	var fsItem3 = undefined;
	var lastScrollX = undefined;
	var dataProvider = undefined;
	var helper = undefined;
	var picHeight = undefined;
	var picWidth = undefined;
	var picWidthNarrow = undefined;
	
	function toggleFullScreen()
	{
		if(isFullScreen)
		{
			$('#fullScreen').show();
		}				
		else
		{
			$('#fullScreen').hide();
			dataProvider = {};
			updateScroll(0, 0);
		}				
	}
	
	function updateScroll(newWidth, scrollToX)
	{			
		hScroll.scrollTo(-scrollToX, 0, 0);
		contentWidth = newWidth;
		lastScrollX = scrollToX;
		
		ScrollUtil.updateScroll(fsDiv, hScroll, newWidth, pageHeight, 10, function()
		{
			setChildPosition(scrollToX);	
		});
	}
	
	function setChildPosition(startPos)
	{
		fsItem1.css('left', startPos - pageWidth);
		fsItem2.css('left', startPos);
		fsItem3.css('left', startPos + pageWidth);
		updateItem(fsItem1);
		updateItem(fsItem2);
		updateItem(fsItem3);
	}
	
	var waiting = false;
	function onScroll()
	{
		if(waiting)
			return;
		waiting = true;
		setTimeout(function()
		{
			onScrolling(hScroll.x);
			waiting = false;
		}, 500);
	}
	
	function onScrolling(scrollX)
	{
		var left1 = fsItem1.position().left;
		var left2 = fsItem2.position().left;
		var left3 = fsItem3.position().left;
		var firstItem = get1stItem(left1, left2, left3);
		var midItem = get2ndItem(left1, left2, left3);
		var lastItem = get3rdItem(left1, left2, left3);
		var currentScrollX = Math.abs(scrollX);
			
		if(lastScrollX > currentScrollX) //scrolling left
		{
			var canMoveLeft = (midItem.position().left > currentScrollX);
			if(canMoveLeft)
			{
				scrollLeftHandler(firstItem, lastItem);
				updateItem(lastItem);
			}
		}			
		else
		{
			var canMoveRight = (midItem.position().left < currentScrollX);
			if(canMoveRight)	
			{
				scrollRightHandler(firstItem, lastItem);	
				updateItem(firstItem);
			}	
		}		
		lastScrollX = currentScrollX;
	}
	
	function scrollLeftHandler(firstItem, lastItem)
	{
		var newX = parseInt(helper.searchAndReplaceNoCase(firstItem.css("left"), 'px', '')) - pageWidth;		
		lastItem.css('left', newX);
	}

	function scrollRightHandler(firstItem, lastItem)
	{
		var newX = parseInt(helper.searchAndReplaceNoCase(lastItem.css("left"), 'px', '')) + pageWidth;		
		firstItem.css('left', newX);
	}
	
	function get1stItem(left1, left2, left3)
	{
		if(left1 < left2 && left1 < left3)
			return fsItem1;
		else if(left2 < left1 && left2 < left3)
			return fsItem2;
		return fsItem3;
	}

	function get2ndItem(left1, left2, left3)
	{
		if((left1 > left2 && left1 < left3) || (left1 > left3 && left1 < left2))
			return fsItem1;
		else if((left2 > left1 && left2 < left3) || (left2 > left3 && left2 < left1))
			return fsItem2;
		return fsItem3;
	}
	
	function get3rdItem(left1, left2, left3)
	{
		if(left1 > left2 && left1 > left3)
			return fsItem1;
		else if(left2 > left1 && left2 > left3)
			return fsItem2;
		return fsItem3;
	}
	
	function updateItem(item)
	{
		var idx = item.css("left");
		var picInfo = dataProvider[idx];
		var fsImg = $(".fsImg", item);
		
		if(picInfo == undefined)
		{
			console.log("ERROR = " + idx);	
			fsImg.attr("src", "");
			fsImg.width(0);
			return; 
		}
		else
		{
			var imgWidth = picInfo.orgWidth;
			var imgHeight = picInfo.orgHeight;
			var isVeritcal = imgHeight > imgWidth;
			if(DeviceAdaptor.inBrowser && isVeritcal) // for browser testing
				picInfo.source_file = "http://placekitten.com/" + picWidthNarrow + '/' + picHeight;
			else if(DeviceAdaptor.inBrowser)
				picInfo.source_file = "http://placekitten.com/" + picWidth + '/' + picHeight;
			fsImg.attr("src", picInfo.source_file);
			if(isVeritcal)
				fsImg.width(picWidthNarrow);
			else
				fsImg.width(picWidth);
		}	
	}
		
	helper = 
	{
		setView : function($vpItem)
		{
			isFullScreen = true;
			toggleFullScreen();
			dataProvider = {};
			var scrollTo = 0;
			var visiblePicInfos = ViewPaneHelper.getVisiblePicInfo();
			var n = (visiblePicInfos) ? visiblePicInfos.length : 0;
			var picId = $vpItem.attr("picId");
			for(var i = 0; i < n; i++)
			{
				var picInfo = visiblePicInfos[i];
				if(picId == picInfo.id)
					scrollTo = i * pageWidth;
				var idx = i * pageWidth + "px";
				dataProvider[idx] = picInfo;
			}
			updateScroll(n * pageWidth, scrollTo);
		},
		setFullScreenDefaults : function(h, w, scrollUtil, picH, picW, picW2)
		{
			pageWidth = w;
			pageHeight = h;
			ScrollUtil = scrollUtil;
			fsDiv = $("#fullScreen #fsParentDiv #fsScrollWrapper #fullScreenItems");
			hScroll = ScrollUtil.setHScroll("#fullScreen #fsParentDiv #fsScrollWrapper");
			hScroll.on('scroll', onScroll);
			hScroll.disable();
			fsItem1 = $("#fsItem0", fsDiv);			
			fsItem2 = $("#fsItem1", fsDiv);
			fsItem3 = $("#fsItem2", fsDiv);
			fsItem1.width(pageWidth);
			fsItem2.width(pageWidth);
			fsItem3.width(pageWidth);
			picHeight = picH;
			picWidth = picW;
			picWidthNarrow = picW2;	
			
			var fsImg = $(".fsImg", "#fullScreen #fsParentDiv #fsScrollWrapper #fullScreenItems .fsItem");
			fsImg.height(picHeight);
		},
		invokeZoomIn : function($img)
		{		
		},
		onRightArrowClick : function()
		{
			var left1 = fsItem1.position().left;
			var left2 = fsItem2.position().left;
			var left3 = fsItem3.position().left;
			var lastItem = get3rdItem(left1, left2, left3);
			var lastItemX = lastItem.position().left;
			
			if(lastItemX >= contentWidth)
				return;
				
			hScroll.scrollTo(-lastItemX, 0, 500);			
			
			setTimeout(function(){
				onScrolling(lastItemX);
			}, 500);
		},
		onLeftArrowClick : function()
		{
			var left1 = fsItem1.position().left;
			var left2 = fsItem2.position().left;
			var left3 = fsItem3.position().left;
			var firstItem = get1stItem(left1, left2, left3);
			var firstItemX = firstItem.position().left;
			
			if(firstItemX < 0)
				return;
					
			hScroll.scrollTo(-firstItemX, 0, 500);
			
			setTimeout(function(){
				onScrolling(firstItemX);
			}, 500);
		},
		searchAndReplaceNoCase: function (str, searchvalue, replace)
		{
			var re = new RegExp(searchvalue,"gi");
			return str.replace(re, replace);
		},
		onCollapseClick : function()
		{
			isFullScreen = false;
			toggleFullScreen();
		}
	};
	return helper;
});