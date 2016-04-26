define(['ich', 'adptr/DeviceAdaptor'],
function(ich, DeviceAdaptor)
{
	function s4() 
	{
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	};
	
	var appUtil = {
		addTouchEvent : function(selector, callback)
		{
			if(DeviceAdaptor.inBrowser)			
				$(document).on("click", selector, callback);
			else
				$(document).on("tap", selector, callback);
		},
		addTabEvent : function(selector, callback)
		{
			if(DeviceAdaptor.inBrowser)			
				$(document).on("click", selector, callback);
			else
				$(document).on("tap", selector, callback);
		},
		addSwipeEvent : function(selector, callback)
		{		
			$(document).on("swipe", selector, callback);
		},
		addSwipeLeftEvent : function(selector, callback)
		{		
			$(document).on("swipeleft", selector, callback);
		},
		addSwipeRightEvent : function(selector, callback)
		{		
			$(document).on("swiperight", selector, callback);
		},
		addDoubleTapEvent : function(selector, callback)
		{			
			$(document).on("doubletap", selector, callback);
		},
		addPinchOpenTapEvent : function(selector, callback)
		{			
			$(document).on("pinchopen", selector, callback);
		},
		getArgumentFromCollection: function (name, collection)
		{
			var n = collectionHasValue(collection) ? collection.length : 0;
	    	for (var i = 0; i < n; i++)
	    	{
		       	//do something
		    }
		},
		collectionHasValue: function (collection)
		{
			return (collection && collection.length > 0);
		},
		getArrayFromObject: function (obj)
		{
			var ary = [];
			for(var prop in obj)
			{
				ary.push(obj[prop]);
			}	
			return ary;
		},
		stringHasValue: function (str)
		{
			return (str && str != undefined && str != "undefined" && str.length > 0);
		},
		argumentsHaveValue: function()
		{
			var n = (arguments && arguments.length > 0) ? arguments.length : 0;
			var arg = '';
			for(var i = 0; i < n; i++)
			{
				arg = arguments[i];
				if(arg && arg.length > 0)
					return true;			
			}
			return false;
		},	
		applyStyleTo: function (comp, sName, sValue)
		{
			$(comp).css(sName, sValue);
		},	
		appendIchTemplate: function(templateName, templateHTML, divForTemplate, templateData)
		{
			ich.addTemplate(templateName, templateHTML);			
			var template = $(ich[templateName](templateData));		
			$(divForTemplate).append(template).trigger("create");		
			ich.clearAll(); // remove template from memory
		},
		applyIchTemplate: function(templateName, templateHTML, divForTemplate, templateData)
		{
			ich.addTemplate(templateName, templateHTML);			
			var template = $(ich[templateName](templateData));		
			$(divForTemplate).html(template).trigger("create");		
			ich.clearAll(); // remove template from memory
		},
		guid : function()
		{
			 return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},
		UIID : function()
		{
			return "UI_" + s4() + s4();
		},
		showLoader: function (value)
		{
			if(value)
				$('#loaderDiv').show();
			else
				$('#loaderDiv').hide();		
		},
		genRandom: function(min, max) 
		{
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
	};
	return appUtil;
});