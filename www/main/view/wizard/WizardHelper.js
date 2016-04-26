define(['util/AppUtil', 
        'phonegap', 
        'util/TextUtil',
        'util/IchUtil',
        'text!wizard/WizardFolderItem.html',
        'text!wizard/WizardKeywordItem.html',
        'util/LayoutUtil',
        'util/ScrollUtil',
        'cache',
        'enum/AppEnum',
        'model'],
        
function(AppUtil, phonegap, TextUtil, IchUtil, WizardFolderItemHTML, WizardKeywordItemHTML, LayoutUtil, ScrollUtil, cache, AppEnum, model)
{
	var picTotal = undefined;
	var stepOneMaxPx = 100;
	var maxPx = 296;
	var progressBar = undefined;
	var stepPageTxtDiv = undefined;
	var folders = {};
	var keywordItems = {};
	var stepHeight = undefined;
	var entityTxt = undefined;
	
	function setStepThree()
	{
		var prevDiv = $("#wizardPage #wizBody #wizTwo");
		prevDiv.hide();
		var stepDiv = $("#wizardPage #wizBody #wizThree");
		stepDiv.show();
		stepPageTxtDiv.html("<b>Step 3.</b> Please choose the categories for your keywords by touching the circles below. You can skip this step and come back to it later, if you want:");
		var entititesDiv = $(".col5Header > div", stepDiv);
		entititesDiv.html(entityTxt);
		stepDiv.height(stepHeight);
		var scroll = ScrollUtil.setVScroll("#wizardPage #wizBody #wizThree .scrollWrapper");
		var count = 0;
		for(var keywordName in keywordItems)
		{
			var keyObj = {keyword: keywordName};
			IchUtil.appendIchTemplate('noname', WizardKeywordItemHTML, $(".stepItems", stepDiv), keyObj);
			count++;
		}		
		$(".scrollWrapper", stepDiv).height(stepHeight - 140);
		var items = $(".stepItems", stepDiv);
		ScrollUtil.updateVScroll(items, scroll, 0, count*35, 10, function(){});
		updateProgress(85);
	}
	
	function setStepTwo()
	{
		var prevDiv = $("#wizardPage #wizBody #wizOne");
		prevDiv.hide();
		var stepDiv = $("#wizardPage #wizBody #wizTwo");
		stepDiv.show();
		stepPageTxtDiv.html("<b>Step 2.</b> We put all of your photos into four categories for easy browsing: &quot;Events&quot;, &quot;Places&quot;, &quot;People&quot;, and &quot;Everything else&quot;. You can rename &quot;Everything else&quot; below...");
		updateProgress(50);
	}
	
	function setStepOne()
	{		
		var parentDiv = $("#wizardPage #wizBody #wizOne");
		var wizMsg = $("#wizardPage #wizMsg");
		wizMsg.hide();
		parentDiv.show();
		if(stepPageTxtDiv)
			stepPageTxtDiv.css("visibility", 'visible');
		parentDiv.height(stepHeight);
		var scroll = ScrollUtil.setVScroll("#wizardPage #wizBody #wizOne .scrollWrapper");
		var count = 0;
		for(var folderName in folders)
		{
			var itemObj = {fName: folderName};
			IchUtil.appendIchTemplate('noname', WizardFolderItemHTML, $(".stepItems", parentDiv), itemObj);
			count++;
		}		
		$(".scrollWrapper", parentDiv).height(stepHeight - 120);
		var items = $(".stepItems", parentDiv);
		ScrollUtil.updateVScroll(items, scroll, 0, count*35, 10, function(){});
	}
	
	function setFolderObject()
	{
		var allFiles = phonegap.pictureFiles;
		var n = (allFiles) ? allFiles.length : 0;
		for(var i = 0; i < n; i ++)
		{
			file = allFiles[i];
			var fileDirName = TextUtil.getWizardFileDirName(file.path);
			var folderObj = folders[fileDirName];
			if(folderObj == undefined)
			{
				folderObj = {files: []};
				folders[fileDirName] = folderObj;
			}				
			folderObj.files.push(file);
		}
	}

	function buildKeywordObject()
	{
		var allFiles = phonegap.pictureFiles;
		var n = (allFiles) ? allFiles.length : 0;
		for(var i = 0; i < n; i ++)
		{
			var file = allFiles[i];
			if(file)
			{
				var keywords = file.getUntypedKeywords();
				var m = keywords.length;
				for(var j = 0; j < m; j++)
				{
					var keyword = keywords[j];
					var kObj = keywordItems[keyword];
					if(kObj == undefined)
					{
						kObj = {files: []};
						keywordItems[keyword] = kObj;
					}	
					kObj.files.push(file);
				}	
			}	
		}
	}
	
	function handleStepOne()
	{
		var parentDiv = $("#wizardPage #wizBody #wizOne");
		var wizItems = $(".wizFolderItem", parentDiv);
		var l = wizItems.length;
		
		for(var i = 0; i < l; i++)
		{
			var item = wizItems[i];
			var fName = $(".folderTxt", item).attr('fName');
			var include = $(".includeCheck", item).hasClass('checked');
			var isKeyword = $(".keywordCheck", item).hasClass('checked');
			parseStepOneData(fName, include, isKeyword);
		}	
	}
	
	function parseStepOneData(fName, include, isKeyword)
	{
		var files = folders[fName].files;
		if(include == false)
			phonegap.removeFiles(files);
		else if(isKeyword)
			phonegap.addKeywordToFiles(files, TextUtil.getWizardKeywordFromDirName(fName));
	}
	
	function handleStepTwo()
	{
		var parentDiv = $("#wizardPage #wizBody #wizTwo");
		var selectedItem = $(".wizTwoItem.checked", parentDiv);
		entityTxt = selectedItem.attr("val");
		if(entityTxt == "TXT")
			entityTxt = $("#typeInpt", "#wizardPage #wizBody #wizTwo").val();
		cache.addKeyValue(AppEnum.ENTITY_NAME, entityTxt);
	}
	
	function updateProgress(progVal)
	{		
		var progressWidth = (progVal * maxPx) / 100;
		progressBar.width(progressWidth);
		progressBar.html(progVal + "%");
	}
	
	function handleStepThree()
	{
		var items = $("#wizardPage #wizBody #wizThree .scrollWrapper .stepItems .wizKeywordItem");
		var n = items.length;
		for(var i = 0; i < n; i++)
		{
			var wizKeywordItem = $(items[i]);
			var keyword = wizKeywordItem.attr("fname");
			var checkRadio = $(".keywordTypeItem.checked", wizKeywordItem);
			var type = checkRadio.attr("val");
			var kObj = keywordItems[keyword];
			phonegap.addTypedKeywordToFiles(keyword, type, kObj.files);
		}	
	}
	
	helper = 
	{
		dirScanComplete : function(total)
		{
			picTotal = total;
			progressBar = $("#progressDiv #progressBar", "#wizardPage");
			stepPageTxtDiv = $("#wizardPage #wizBody #stepTxtDiv");
			stepHeight = LayoutUtil.appHeight - 200 - 150; //100 for top, 100 for bottom, 150 for padding
		},
		fileScanComplete : function(remaining)
		{
			var delta = picTotal - remaining;
			console.log("delta: " + delta + ", picTotal = " + picTotal + ", rem: " + remaining);
						
			var progressWidth = (delta * stepOneMaxPx) / picTotal;
			progressBar.width(progressWidth);
			var plb = (progressWidth * 100 / maxPx);
			progressBar.html(plb.toFixed(0) + "%");
		},
		scanComplete : function()
		{
			AppUtil.showLoader(false);
			setFolderObject();
			setStepOne();
		},
		onStepOneNext : function()
		{
			handleStepOne();
			setStepTwo();
		},
		onStepTwoNext : function()
		{
			handleStepTwo();
			buildKeywordObject();
			setStepThree();
		},
		onStepThreeNext : function()
		{
			AppUtil.showLoader(true);
			updateProgress(95);
			setTimeout(function()
			{
				handleStepThree();
				model.index();
			}, 100);			
		}
	};
	return helper;
});