define(['log', 
        'util/ParseUtil',
        'util/DateUtil'],
        
function(log, ParseUtil, DateUtil)
{    
	function logPost(type, payload)
	{
		var LogPost = Parse.Object.extend("LogPost");
		var logPost = new LogPost();
		 
		logPost.set("type", type);
		logPost.set("payload", payload);
		logPost.save();
	}
	
	var so = {
	    HOST_URL: "http://104.130.12.85:3000/",
	    SEARCH_URL: "search?query={1}&page={2}&per_page={3}&filter[]=user_token:{4}&filter[]=device_id:{5}&callback=jsonpHandler&_={6}",
	    INDEX_URL: "index",
	
	    search: function(keyword, page, pageSize, deviceID, userEmail, result, fault) {
	    	var url = this.HOST_URL + this.SEARCH_URL.replace("{1}",keyword).replace("{2}",page).replace("{3}",pageSize).replace("{4}",userEmail).replace("{5}",deviceID).replace("{6}",DateUtil.getTime());
	    	this.callJsonp(url, result, fault);
	    },
	    
	    postJson: function(payload, result)
	    {
	    	xmlhttp = new XMLHttpRequest();
		    var url = "http://104.130.12.85:3000/index";
		    xmlhttp.open("POST", url, true);
		    xmlhttp.setRequestHeader("Content-type", "application/json");
		    xmlhttp.onreadystatechange = function () 
		    {
		    	if (xmlhttp.readyState == 4) 
		    	{
		    		result(xmlhttp.responseText);
				}
		    };
		    
		    payload = JSON.stringify(payload);		
		    xmlhttp.send(payload);
//		    console.log("PAYLOAD:");
//		    console.log(payload);
		    logPost("Index", payload);
	    },
	    
		callJsonp: function (url, result, fault)
		{
			console.log("ServiceAdaptor::callJsonp > " + url);
			logPost("Search", url);
			// Assign handlers immediately after making the request,
			// and remember the jqXHR object for this request
			$.ajax( url, 
			{
				type: "GET",
	 			//contentType: "application/javascript",
				contentType: 'application/json',
				dataType: "jsonp",
				async: true,
	        	jsonpCallback: 'jsonpHandler',
	    		//jsonp: false,
	    		//cache: true,
	    		success: function (data) {
					console.log( "ServiceAdaptor::callJsonp > success"); 					
					result(data);     
		        },
	    		error: function (jqXHR, textStatus, error) {
		    		////console.log( "ServiceAdaptor::callJsonp > error: " + error);        
		    		fault(error);
		        }
			});
		}
	};
	return so;
});