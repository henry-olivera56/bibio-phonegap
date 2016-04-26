define(["text!sync/Sync.html", 
        "css!sync/Sync",
        'util/IchUtil',
        'util/AppUtil'],
        
function(SyncHTML, SyncCSS, IchUtil, AppUtil)
{			
	var isVisible = false;
	function addListeners()
	{
		$(document).on("syncRequest", toggleView);		
		AppUtil.addTouchEvent('#syncPage #syncScreen .link', toggleView);
		AppUtil.addTouchEvent('#syncPage #syncScreen .divBtn', invokeSync);
	}
	
	function invokeSync()
	{
		//AppUtil.showLoader(true);
	}
	
	function toggleView()
	{
		if(isVisible)
			$('#syncPage').fadeOut(200);
		else
			$('#syncPage').fadeIn(200);
		isVisible = !isVisible;
	}
	
	var syncPage = 
	{
		init:function()
		{
			IchUtil.applyIchTemplate('noname', SyncHTML, $('#syncPage'));	
			addListeners();
		}
	};
	return syncPage;
});