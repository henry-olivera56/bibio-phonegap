define(["ich", 
        "text!login/LoginPage.html", 
        "css!login/LoginPage",
        'util/IchUtil',
        'login/LoginHelper'],
        
function(ich, loginHTML, loginCSS, IchUtil, LoginHelper)
{			
	var loginPage = 
	{
		init:function()
		{
			IchUtil.applyIchTemplate('loginHTML', loginHTML, $('#loginPage'));			
			LoginHelper.init();
		},
		invokeLogin: function(email, pass, rememberMe)
		{
			LoginHelper.invokeLogin(email, pass, rememberMe);
		}
	};
	return loginPage;
});