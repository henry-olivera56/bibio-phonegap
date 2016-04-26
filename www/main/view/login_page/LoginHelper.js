define(["ich", 
        'util/AppUtil',
        'util/ParseUtil',
        'content/ContentPage',
        'model'],
        
function(ich, AppUtil, ParseUtil, ContentPage, model)
{
	var loginHelper = {};
	function addListeners()
	{
		$(".inptCls").focus(onInputFocusIn);
		AppUtil.addTouchEvent('#loginPage .checkBox', onCheckClick);
		AppUtil.addTouchEvent('#loginPage .toggleReset', onToggleReset);
		AppUtil.addTouchEvent('#loginPage .toggleCreate', onToggleCreate);
		AppUtil.addTouchEvent('#loginPage .toggleTerms', onToggleTerms);
		AppUtil.addTouchEvent('#loginPage #loginBtn', onLoginClick);
		AppUtil.addTouchEvent('#loginPage #createBtn', onSignUpClick);
	}
	
	function onInputFocusIn(evt)
	{
		$('.inptDiv').removeClass("inputDivFocused");
		$(this.parentNode).addClass("inputDivFocused");
	}
	
	function onCheckClick()
	{
		var $check = $(".checkIcon", this);
		var checkV = $check.css('visibility');
		if(checkV == 'visible')
			$check.css('visibility', 'hidden');
		else
			$check.css('visibility', 'visible');
	}
	
	function onToggleReset()
	{
		$('#loginBody').slideToggle();
		$('#resetBody').slideToggle();	
	}
	
	function onToggleCreate()
	{
		$('#loginBody').slideToggle();
		$('#newBody').slideToggle();	
	}

	function onToggleTerms()
	{
		$('#termsBody').slideToggle();
		$('#newBody').slideToggle();	
	}
	
	function isChecked(checkId)
	{
		var parentDesc = "#loginPage #" + checkId;
		var $check = $(".checkIcon", parentDesc);
		var checkV = $check.css('visibility');
		return (checkV == 'visible');
	}
	
	function onLoginClick()
	{		
		var email = $("#emailInpt", "#loginPage").val();
		var password = $("#passInpt", "#loginPage").val();
		var rememberMe = isChecked("rmbrCheck");
		loginHelper.invokeLogin(email, password, rememberMe);
	}
	
	function loginSuccessHandler(user)
	{		
		ContentPage.init();
	}

	function loginErrorHandler(user, error)
	{
		alert("loginErrorHandler");
	}
	
	function onSignUpComplete()
	{
		var email = $("#newEmailInpt", "#loginPage").val();
		var password = $("#newPassInpt", "#loginPage").val();
		//console.log("SIGNING IN WITH: email: " + email + ", password: " + password);
		model.indexingNeeded = true;
		loginHelper.invokeLogin(email, password, false);
	}
	
	function onSignUpClick()
	{
		var email = $("#newEmailInpt", "#loginPage").val();
		var reEmail = $("#reEmailInpt", "#loginPage").val();
		var password = $("#newPassInpt", "#loginPage").val();
		var repassword = $("#rePassInpt", "#loginPage").val();
		var agreed = isChecked("termsCheck");
		
		if(email.length < 5 || password.length < 5)
		{
			alert("Please make sure that your user name or password is at least 5 characters long.");
			return;
		}
		
		if(email != reEmail)
		{
			alert("Please make sure that user name matches.");
			return;
		}	

		if(password.length > 5 && password != repassword)
		{
			alert("Please make sure that your password matches.");
			return;
		}				
		
		if(agreed)
		{
			AppUtil.showLoader(true);
			ParseUtil.signUp(email, password, onSignUpComplete, loginErrorHandler);
		}			
		else
		{
			alert("Agree to terms first! Make sure that password is at least 5 characters long.");
		}
	}
				
	loginHelper = 
	{
		init:function()
		{
			addListeners();
			$('#loginPage').show();
		},
		invokeLogin: function(email, pass, rememberMe)
		{
			AppUtil.showLoader(true);
			ParseUtil.login(email, pass, rememberMe, loginSuccessHandler, loginErrorHandler);
		}
	};
	return loginHelper;
});