define(['util/IchUtil', 
        'util/AppUtil',
        "text!mainPane/tag/Tag.html", 
        "css!mainPane/tag/Tag",
        "mainPane/tag/TagHelper",
        "mainPane/tag/TagSuggestions",
        "mainPane/view_pane/ViewPaneHelper",
        "mainPane/stacks/StacksHelper",
        "m/AppModel",
        'enum/AppEnum'],
        
function(IchUtil, AppUtil, tagHTML, tagCSS, TagHelper, TagSuggestions, ViewPaneHelper, StacksHelper, AppModel, AppEnum)
{
	var tagState = undefined;
	
	function addListeners()
	{
		$(document).on("stackChangeNotification", onStackChangeNotification);
		$(document).on("headerSelectionChanged", onHeaderSelectionChanged); 
		$(document).on("imagesLoaded", TagHelper.onImgLoaded);		
		AppUtil.addTouchEvent('#mainPane #tag #addBtn', TagHelper.onAddClick);
		AppUtil.addTouchEvent('#mainPane #tag .tagItemDiv', TagHelper.onTagClick);
		AppUtil.addSwipeEvent('#mainPane #tag .tagItemDiv', TagHelper.onTagSwipe);
		AppUtil.addTouchEvent('#mainPane #tag #doneTaggingBtn', TagHelper.saveDirtyState);
		AppUtil.addTouchEvent('#mainPane #tag #cancelTaggingBtn', TagHelper.cancelDirtyState);
	}
	
	function onStackChangeNotification()
	{
		TagHelper.setView();
	}
	
	function onHeaderSelectionChanged()
	{
		if(AppModel.isTagging)
			setTimeout(setTaggingState, 100);
		else
			hideTaggingState();
	}
	
	function setTaggingState()
	{
		if(tagState == AppEnum.taggingState)
			return;
		tagState = AppEnum.taggingState;
		TagHelper.isVisible = true;
		TagHelper.setView();
		$('#contentBody #rDiv #tag').show();
		$('#contentBody #rDiv #viewPaneWrapper').css('right', '200px');
		$('#contentBody #rDiv #subHeader').css('right', '200px');
		$('#contentBody #rDiv #stackWrapper').css('right', '220px');		
		StacksHelper.refreshScroll();
		ViewPaneHelper.refreshScroll();
	}
	
	function hideTaggingState()
	{
		if(tagState == AppEnum.taggingState)
		{
			tagState = undefined;
			TagHelper.isVisible = false;
			$('#contentBody #rDiv #tag').hide();
			$('#contentBody #rDiv #viewPaneWrapper').css('right', '0px');
			$('#contentBody #rDiv #subHeader').css('right', '0px');
			$('#contentBody #rDiv #stackWrapper').css('right', '20px');
			StacksHelper.refreshScroll();
			ViewPaneHelper.refreshScroll();
		}
	}
	
	var comp = {
		init:function()
		{		
			IchUtil.applyIchTemplate('tagHTML', tagHTML, $('#tag', "#mainPane"));
			TagSuggestions.parseSuggestions();
			addListeners();
		}
	};
	return comp;
});