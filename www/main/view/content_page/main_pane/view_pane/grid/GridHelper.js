define(['util/IchUtil', 
        'util/AppUtil',        
        'adptr/DeviceAdaptor',
        "text!mainPane/view_pane/grid/GridItem.html",
        "m/AppModel",
        'enum/AppEnum',
        'util/LayoutUtil',
        'util/ScrollUtil'],
        
function(IchUtil, AppUtil, DeviceAdaptor, GridItemHTML, AppModel, AppEnum, LayoutUtil, ScrollUtil)
{
	var picHeight = undefined;
	var picWidth = undefined;
	var picWidthNarrow = undefined;
	var items = undefined;
	var gridPane = undefined;
	var gridPaneItems = undefined;
	var defaultSet = false;
	var hScroll = undefined;
	var itemsServed = undefined;
	var totalWidth = undefined;
	
	function updateScroll()
	{			
		hScroll.scrollTo(0, 0, 0);
		var newWidth = (itemsServed && itemsServed.length > 2) ? Math.ceil(totalWidth / 3) : totalWidth;
		ScrollUtil.updateScroll(gridPaneItems, hScroll, newWidth, 0, 10, function()
		{
			console.log("GRID SCROLL UPDATED");
		});
	}
	
	function addGridItem(picInfo)
	{
		picInfo.gpWidth = (picInfo.orgWidth > picInfo.orgHeight) ? picWidth : picWidthNarrow;
		picInfo.gpHeight = picHeight;
		if(DeviceAdaptor.inBrowser) // for browser testing
			picInfo.source_file = "http://placekitten.com/" + picInfo.gpWidth + '/' + picInfo.gpHeight;
		totalWidth = totalWidth + picInfo.gpWidth + 15;
		IchUtil.appendIchTemplate('noname', GridItemHTML, gridPaneItems, picInfo);	
	}
	
	var helper = {		
		setData : function(data)
		{
			helper.items = (data && data.items) ? data.items : undefined;
			helper.setView();
		},
		setView : function()
		{		
			if(AppModel.isGrid && helper.items)
			{
				if(helper.items == itemsServed) // it is the same collection, leave it be.
					return;
				totalWidth = 0;
				gridPaneItems.empty();
				var items = helper.items;
				var n = items.length;
				for(var i = 0; i < n; i++)
				{
					var item = items[i]; // picInfo
					addGridItem(item);
				}
				itemsServed = helper.items;
				updateScroll();
			}	
		},
		setDefaults : function(parentPane)
		{
			if(defaultSet == false)
			{
				defaultSet = true;
				gridPane = parentPane;
				gridPaneItems = $("#gridPaneItems", parentPane);
				picHeight = Math.floor(LayoutUtil.picHeight / 3) - 5;
				picWidth = Math.floor(LayoutUtil.picWidth / 3);
				picWidthNarrow = Math.floor(LayoutUtil.picWidthNarrow / 3);
				hScroll = ScrollUtil.setHScroll("#contentPage #contentBody #mainPane #rDiv #viewPaneWrapper #gridPane");
			}	
		}
	};
	return helper;
});