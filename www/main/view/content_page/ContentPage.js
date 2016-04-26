define(['log', 
        "ich", 
        'util/AppUtil',
        'adptr/ServiceAdaptor', 
        "text!content/ContentPage.html", 
        "css!content/ContentPage",
        "header/Header",
        "mainPane/MainPane", 
        "fav/Fav", 
        "bin/Bin", 
        "tile/Tile", 
        "setting/Setting",
        'util/LayoutUtil', 
        'phonegap', 
        'model',
        'fs/FullScreen',
        'sync/Sync',
        'typeselection/TypeSel',
        "share/SharePopup",
        'wizard/Wizard'],
        
function(log, ich, AppUtil, ServiceAdaptor, contentHTML, contentCSS, header, mainPane, fav, bin, tile,
		setting, LayoutUtil, phonegap, model, FullScreen, Sync, TypeSel, SharePopup, wizard)
{
	function addListeners()
	{
		$(document).on("navEvent", onDeepNavEvent);
	    $(document).bind("userHasNoPictures", onUserHasNoPictures);
	    $(document).bind("onPictureFilesChange", onPictureFilesChange);
	    $(document).bind("showContent", onShowContent);
	}
	
	function onUserHasNoData()
	{
		console.log("onUserHasNoData!!!!!!!!!!!!");		
		if(phonegap && phonegap.deviceInfo == undefined)
		{
			onPictureFilesChange();		
		}					
		else
		{
			$("#loginPage").hide();
			wizard.init();
			wizard.showPage();
			phonegap.getPictures();
		}
	}

	function onUserHasNoPictures()
	{
		$("#noDataDiv").hide();
		$("#noFilesDiv").show();
	}
	
	function onPictureFilesChange()
	{		
		//invoke indexing.
		//model.index();
		$.event.trigger("wizardEvent", {type: "scanComplete"});
	}
			
	function onDeepNavEvent(e)
	{
		var subContentID = e.subPageID;
		
		if(subContentID == "#fav")
			fav.setView();
		
		$("#contentBody > div").hide();
		$("#contentBody > " + subContentID).show();
	}
	
	function onContentReady()
	{		
		if(model.indexingNeeded)
		{
			model.searchTerm = "*";
			onUserHasNoData();
		}	
		else
		{
			header.invokeDefaultSearch();
		}
	}
	
	function onShowContent()
	{
		$('#wizardPage').hide();
		$('#contentPage').fadeIn(200);
		AppUtil.showLoader(false);
		LayoutUtil.validateContentPageSize();
	}
		
	var contentPage = {
		init:function()
		{
			AppUtil.applyIchTemplate('contentHTML', contentHTML, $('#contentPage'));			
			addListeners();					
			header.init();
			mainPane.init();			
			onContentReady();
			FullScreen.init();
			Sync.init();
			TypeSel.init();
			SharePopup.init();
			fav.init();
		}
	};
	return contentPage;
});