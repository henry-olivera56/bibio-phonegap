define(['util/AppUtil',        
        'util/TextUtil',
        'enum/AppEnum'],
        
function(AppUtil, TextUtil, AppEnum)
{
       
       function shareViaOS(picInfos)
       {
       console.log("in shareViaOS");
       var picInfoSources = [];
       var n = (picInfos) ? picInfos.length : 0;
       for(var i = 0; i < n; i++)
       {
       picInfoSources[i] = picInfos[i].source_file;
       			console.log(picInfoSources[i]);
       }
       
       
       //      window.plugins.socialsharing.shareViaSMS('My cool message', null /* see the note below */, function(msg) {console.log('ok: ' + msg)}, function(msg) {alert('error: ' + msg)})
       
                  window.plugins.socialsharing.share(null, null, picInfoSources, null);
       }


    function shareOnFacebook(picInfos)
	{
        var picInfoSources = [];
		var n = (picInfos) ? picInfos.length : 0;
		console.log("1. shareOnFacebook, length: " + n);
		for(var i = 0; i < n; i++)
		{
            picInfoSources[i] = picInfos[i].source_file;
//			console.log(picInfoSources[i]);
		}
       
       window.plugins.socialsharing.shareViaFacebook('Shared with Bibliosmart', picInfoSources, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
       
	}
	function shareOnTwitter(picInfos)
	{
        var picInfoSources = [];
		var n = (picInfos) ? picInfos.length : 0;
        for(var i = 0; i < n; i++)
            {
            picInfoSources[i] = picInfos[i].source_file;
       //			console.log(picInfoSources[i]);
            }
        window.plugins.socialsharing.shareViaTwitter('Shared with Bibliosmart', picInfoSources /* img */, null)

       //		console.log("2. shareOnTwitter, length: " + n);
       
	}
     
    function onEmailSuccess ()
       {
       console.log("email Share Success");
       }
       
    function onEmailError()
       {
       console.log("email Share Error");
       }
       
    
	function shareViaEmail(picInfos)
	{
       var picInfoSources = [];
       var n = (picInfos) ? picInfos.length : 0;
       for(var i = 0; i < n; i++)
       {
       picInfoSources[i] = picInfos[i].source_file;
       //			console.log(picInfoSources[i]);
       }
        console.log("picInfoSources is " + picInfoSources);
       
        window.plugins.socialsharing.shareViaEmail(
                                                  'Sent via Bibliosmart',
                                                  'My Photos',
                                                  null, // TO: must be null or an array
                                                  null, // CC: must be null or an array
                                                  null, // BCC: must be null or an array
                                                  picInfoSources, // FILES: can be null, a string, or an array
                                                  onEmailSuccess, // called when sharing worked, but also when the user cancelled sharing via email (I've found no way to detect the difference)
                                                  onEmailError // called when sh*t hits the fan
                                                  );

       
    }
	function shareViaSms(picInfos)
	{
       var picInfoSources = [];
       var n = (picInfos) ? picInfos.length : 0;
       for(var i = 0; i < n; i++)
       {
       picInfoSources[i] = picInfos[i].source_file;
       //			console.log(picInfoSources[i]);
       }
 //      window.plugins.socialsharing.shareViaSMS('My cool message', null /* see the note below */, function(msg) {console.log('ok: ' + msg)}, function(msg) {alert('error: ' + msg)})
       window.plugins.socialsharing.share(null, null, picInfoSources, null)
       }
	
	var comp = {		
		invokeShare: function(type, picInfos)
		{
 			switch(type)
			{
                //Generic Share via OS
                case AppEnum.SHARE: shareViaOS(picInfos); break;
       
				case AppEnum.FACEBOOK: shareOnFacebook(picInfos); break;
				case AppEnum.TWITTER: shareOnTwitter(picInfos); break;
				case AppEnum.EMAIL: shareViaEmail(picInfos); break;
				case AppEnum.SMS: shareViaSms(picInfos); break;
			}
		}
	};
	
	return comp;
});