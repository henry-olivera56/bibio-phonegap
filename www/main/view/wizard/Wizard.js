define(["text!wizard/Wizard.html", 
        "css!wizard/Wizard",
        'wizard/WizardHelper',
        'util/IchUtil',
        'util/AppUtil',
        'cls',
        'phonegap'],
        
function(WizardHTML, WizardCSS, WizardHelper, IchUtil, AppUtil, cls, phonegap)
{			
	var tCount = 5;
	
	function addListeners()
	{
		$(document).on("wizardEvent", onPhonegapEvent); 
		
		AppUtil.addTouchEvent('#wizardPage #s1', onStepOne);
		AppUtil.addTouchEvent('#wizardPage #s2', onStepTwo);
		AppUtil.addTouchEvent('#wizardPage #s3', onStepThree);
		AppUtil.addTouchEvent('#wizardPage #wizBody #wizContent .stepPage .wizFolderItem .checkCan', onCheckTap);
		AppUtil.addTouchEvent('#wizardPage #wizBody #wizContent .stepPage .wizTwoItem', onRadioTap);
		AppUtil.addTouchEvent('#wizardPage #wizBody #wizContent #wizThree .keywordTypeItem', onRadioThreeTap);
		AppUtil.addTouchEvent('#wizardPage #wizBody #wizContent #wizOne .nextBtn', WizardHelper.onStepOneNext);
		AppUtil.addTouchEvent('#wizardPage #wizBody #wizContent #wizTwo .nextBtn', WizardHelper.onStepTwoNext);
		AppUtil.addTouchEvent('#wizardPage #wizBody #wizContent #wizThree .nextBtn', WizardHelper.onStepThreeNext);
	}
	
	function onCheckTap()
	{
		var $this = $(this);
		var hasClass = $this.hasClass("checked");
		if(hasClass)
			$this.removeClass('checked');
		else
			$this.addClass('checked');
	}

	function onRadioThreeTap()
	{
		var $this = $(this);
		var parentNode = $(this.parentNode);
		$(".keywordTypeItem", parentNode).removeClass('checked');
		$this.addClass('checked');
	}

	function onRadioTap()
	{
		var $this = $(this);
		$("#wizardPage #wizBody #wizContent .stepPage .wizTwoItem").removeClass('checked');
		$this.addClass('checked');
	}
	
	function onPhonegapEvent(e, data)
	{
		var type = data.type;
		switch(type)
		{
			case  "dirScanComplete": WizardHelper.dirScanComplete(data.total); break;
			case  "fileScanComplete": WizardHelper.fileScanComplete(data.remaining); break;
			case  "scanComplete": WizardHelper.scanComplete(); break;
		}
	}
	
	function onStepOne()
	{
		$.event.trigger("wizardEvent", {type: "dirScanComplete", total: tCount});
	}
	function onStepTwo()
	{
		$.event.trigger("wizardEvent", {type: "scanComplete"});
	}
	function onStepThree()
	{
		
	}
	
	function setTestValue()
	{
		var n = 17;
		for(var i = 0; i < n; i++)
		{
			var file = new cls.Pic("id", "Name", 'file:///storage/emulated/o/Pictures/User_testomg_imgs/20110210321.jpg', undefined);
			if(i % 2 == 0)
				file = new cls.Pic("id", "Name", 'file:///storage/emulated/o/Pictures/vacation'+ i +'/mioplop.jpg', undefined);
			if(i % 3 == 0)
				file = new cls.Pic("id", "Name", 'file:///storage/emulated/o/Pictures/vacation/Laska/100lat/what_now/dep_deep_deeep_Deeeeep/mioplop.jpg', undefined);
			phonegap.pictureFiles.push(file);
		}	
	}
		
	var wiz = 
	{
		init:function()
		{
			IchUtil.applyIchTemplate('noname', WizardHTML, $('#wizardPage'));	
			addListeners();
			//setTestValue();
		},
		showPage:function()
		{
			$('#wizardPage').show();
			//WizardHelper.dirScanComplete(tCount);
		}
	};
	return wiz;
});