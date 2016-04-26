define(['log', 
        "ich", 
        'util/AppUtil', 
        'util/TextUtil', 
        "text!mainPane/breadcrumb/Breadcrumb.html",        
        "css!mainPane/breadcrumb/Breadcrumb", 
        "mainPane/refiner/RefinerState",
        'enum/AppEnum'],
        
function(log, ich, AppUtil, TextUtil, breadcrumbHTML, breadcrumbCSS, RefinerState,AppEnum)
{
	function addListeners()
	{
		$(document).on("refinerChange", onRefinerChange);
	}
	
	function onRefinerChange(e, data)
	{
		setBreadcrumb(data);
	}
	
	function setBreadcrumb(data)
	{
		var bTerm = data.term;
		if(bTerm == "*")
			bTerm = "All";

		var bcObj = {term: bTerm};
		var ty = TextUtil.capitaliseFirstLetter(data.type);
		var openCount = 0;
		for (var property in RefinerState.open) 
		{
		    var isOpen = RefinerState.open[property];
		    if(isOpen)
		    {
		    	if(property == AppEnum.places)
		    		property = AppEnum.placesTxt;
		    	openCount++;
		    	bcObj["type" + openCount] = TextUtil.capitaliseFirstLetter(property);
		    }
		}	
		bcObj["comment"] = "Other tags in these photos";
		AppUtil.applyIchTemplate('breadcrumbHTML', breadcrumbHTML, $('#breadcrumb'), bcObj);
		setTypesVisibility(openCount);
	}
	
	function setTypesVisibility(openCount)
	{
		if(openCount == 1)
			$(".sep1, .type2, .sep2, .type3, .sep3, .type4", "#breadcrumb").hide();
		else if(openCount == 2)
			$(".sep2, .type3, .sep3, .type4", "#breadcrumb").hide();
		else if(openCount == 3)
			$(".sep3, .type4", "#breadcrumb").hide();			
	}
	
	var comp = {init:function()
	{			
		addListeners();
	}};
	return comp;
});