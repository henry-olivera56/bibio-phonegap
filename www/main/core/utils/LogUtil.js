define({
	traceArgs: function ()
	{
		var n = (arguments) ? arguments.length : 0;
		var outputTxt = '';
		for(var i = 0; i < n; i++)
		{
			if(outputTxt.length > 0)
				outputTxt += ', ';
			outputTxt += ("arg " + i + ": " + arguments[i]);		
		}
		console.log(outputTxt);
	},

	t: function (value)
	{
		console.log(value);
	},
	
	a:function (value)
	{
		 alert(value);
	},
	
	i: function(obj)
	{
		console.log("Log > Inspect:");
		for (var property in obj) 
		{
		    var val = obj[property];
		    console.log(property + ': ' + val);
		}
	},

	i2: function(obj)
	{
		console.log("Log > DEEP INSPECT:");
		for (var property in obj) 
		{
			var val = obj[property];
			if(val != null && typeof val === 'object')
			{
				for (var property2 in val) 
				{
					var val2 = val[property2];
					console.log("____2nd____  " + property2 + ': ' + val2);
				}
			}
			console.log(property + ': ' + val);
		}
	},
	
	a: function (ary)
	{
		var n = ary.length;
		for(var i = 0; i < n; i++)
		{
			var item = ary[i];
			console.log(item.create_date);
		}	
	}
});