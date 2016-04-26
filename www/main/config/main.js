require.config({
	baseUrl: "",
	paths: {
	    "jquery"		: "external/jquery-2.0.3.min",	
		"mEvents"		: "external/jquery.mobile-events.min",	
		"Parse"			: "external/parse-1.2.13",	
		"iScroll5"		: "external/iscroll",	
		"ich"			: "external/ICanHaz",	
		"text"			: "external/text",
		"css"			: "external/css",
		"exif"			: "external/exif",
		"appCSS"		: "assets/css",					
		"app"			: "main/config/application",
		"cls"			: "main/config/cls",
		"model"			: "main/model/Model",
		"m"				: "main/model",
		"util"			: "main/core/utils",
		"enum"			: "main/core/enums",
		"phonegap"		: "main/core/phonegap/phonegap",
		"photodb"		: "main/core/phonegap/photo-db",
		"scanDroid"		: "main/core/phonegap/scan-droid",  // scan-droid, scan-ios
		"scanIOS"		: "main/core/phonegap/scan-ios",    // scan-droid, scan-ios
		"exif"			: "main/core/phonegap/exif-reader",
		"log"			: "main/core/utils/LogUtil",
		"adptr"			: "main/core/adaptors",
		"cache"			: "main/core/adaptors/CacheAdaptor-db",  // CacheAdaptor-cookies, CacheAdaptor-db
		"login"			: "main/view/login_page",
		"fs"			: "main/view/full_screen",
		"sync"			: "main/view/sync",
		"wizard"		: "main/view/wizard",
		"typeselection"	: "main/view/type_selection",
		"share"			: "main/view/share_popup",
		"test"			: "main/view/test",
		"content"		: "main/view/content_page",
		"header"		: "main/view/content_page/header",
		"mainPane"		: "main/view/content_page/main_pane",
		"fav"			: "main/view/content_page/fav",
		"bin"			: "main/view/content_page/bin",
		"tile"			: "main/view/content_page/tile",
		"setting"		: "main/view/content_page/setting"
	},
	shim:  {
		"app"   			: ["jquery", "Parse"],	
		"mEvents"			: ["jquery"],
		"iScroll5" 			: {exports: "IScroll"},
		"ich" 				: {exports: "ich"},
		"Parse" 			: {exports: "Parse"},
		"main/model/Class"	: {exports: "Class"}
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});

require(['text','css','css!appCSS/normalize','css!appCSS/global','css!appCSS/scrollbar', 'css!appCSS/font-awesome',
         'app','phonegap', 'iScroll5', 'mEvents'],
function (txt,css,norm,glbl, scrollbarCSS, fa, app, phonegap, iScroll5, mEvents)
{	
	$(document).ready(onReady);
	function onReady()
	{
		//START APP
        alert("App START!");
		$.support.cors = true;		
		phonegap.initialize();
		app.initializeApplication();
	}
});