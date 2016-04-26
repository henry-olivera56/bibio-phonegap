define(['log', 
        'enum/AppEnum', 
        'util/AppUtil', 
        'util/ParseUtil',
        'util/LayoutUtil', 
        'cache', 
        'login/LoginPage',
        'content/ContentPage',
        'test/TestPage',
        'wizard/Wizard',
        "m/AppModel"],
        
function(log, AppEnum, AppUtil, ParseUtil, LayoutUtil, cache, LoginPage, ContentPage, testPage, wizard, AppModel)
{	
	function addListeners()
	{
		$(document).bind("deviceInfoChange",onDeviceInfoChange);
		$(document).on("headerSelectionChanged", onHeaderSelectionChanged); 
	}
		
	function initUtils()
	{
		ParseUtil.init();
		LayoutUtil.init();
	}
	
	function invokeStartup()
	{
		//console.log("APP STARTED.");
		if(false)// TestPage
		{   
			testPage.init();
			testPage.showPage();
		} 
		else if(false)// WIZARD Page
		{   
			wizard.init();
			wizard.showPage();
		} 
		else 
		{
			var email = cache.getValue(AppEnum.emailTxt);
			var password = cache.getValue(AppEnum.passwordTxt);
							
			if(AppUtil.stringHasValue(email) && AppUtil.stringHasValue(password) && 1 == 2)
				LoginPage.invokeLogin(email, password, true);
			else
				LoginPage.init();
		}
	}
	
	function onHeaderSelectionChanged()
	{
		if(AppModel.isLogout)
		{
			AppUtil.showLoader(true);
			ParseUtil.logout();
			setTimeout(function()
			{
				location.reload(); 
			}, 1000);
		}	
	}
		
	function onDeviceInfoChange(e, info, infoText)
	{
		//alert(infoText);
	}	

	var app = 
	{
		initializeApplication : function()
		{				
			addListeners();
			initUtils();
			invokeStartup();
		}
	};

	return app;
});