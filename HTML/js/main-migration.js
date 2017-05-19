// JavaScript Document
$(function() {
	$('.checked-p').click(function() {
		$(this).toggleClass('active');
		$(this).siblings('.option-div').slideToggle();
	});

	$('.screening-condition').blur(function() {
		$(this).find('.checked-p').removeClass('active');
		$(this).find('.option-div').slideUp();
	});

	$('.option-div p').click(function() {
		var _thisP = $(this).parents('.screening-condition');
		_thisP.find('.checked-p').removeClass('active');
		_thisP.find('.option-div').slideUp();
		_thisP.find('.ption-div-d-1').slideUp();
		_thisP.find('.checked-input').val($(this).html());
		_thisP.find('.checked-p-1').html($(this).html());
	});

	$('.content-left-1 a').click(function() {
		$('.section-1').fadeOut();
		$('.section-2').fadeIn();
	});
	$('#Line').click(function() {
		$('.section-1').fadeIn();
		$('.section-2').fadeOut();
	});

	//武汉市工商投资流入流出分析-svg
	////武汉各区在图中坐标
	var wuhanMap = {
		"武昌区": [312, 320],
		"洪山区": [327, 404],
		"东湖生态旅游风景区": [423, 321],
		"东湖新经济开发区": [540, 426],
		"青山区": [492, 267],
		"武汉化学工业园": [521, 207],
		"江夏区": [313, 642],
		"汉阳区": [203, 333],
		"江汉区": [228, 262],
		"江岸区": [281, 232],
		"硚口区": [164, 262],
		"武汉经济开发区": [80, 444],
		"蔡甸区": [0, 341],
		"东西湖区": [95, 216],
		"黄陂区": [361, 0],
		"新洲区": [726, 88]
	}

	////svg创建元素类型 createSvg("svgDom");
	var $createSvg = function(svgD) {
		return $(document.createElementNS("http://www.w3.org/2000/svg", svgD));
	};
	var drawSvg = function(wuhanV) {
		var lineP = $('#Line');
		for(var i = 0, len = wuhanV["end"].length; i < len; i++) {
			var originX = wuhanMap[wuhanV["origin"]][0],
				originY = wuhanMap[wuhanV["origin"]][1],
				endX = wuhanMap[wuhanV["end"][i]["name"]][0],
				endY = wuhanMap[wuhanV["end"][i]["name"]][1],
				clockwise = (wuhanMap[wuhanV["end"][i]["name"]][0] > wuhanMap[wuhanV["origin"]][0]) ? 1 : 0;
			var _d = "M" + originX + ',' + originY + ' A360,360,0,0,' + clockwise + ',' + endX + ',' + endY;
			var line = $createSvg("path")
				.attr("stroke-width", wuhanV["end"][i]["stroke-width"])
				.attr("d", _d);
			lineP.append(line);
		}
	};

	/**根据数据wuhanV绘制连线**/
	var wuhanV = {
		"origin": "武昌区",
		"end": [{
				"name": "洪山区",
				"value": 30
			},
			{
				"name": "东湖生态旅游风景区",
				"value": 5
			},
			{
				"name": "东湖新经济开发区",
				"value": 20
			},
			{
				"name": "武汉化学工业园",
				"value": 10
			},
			{
				"name": "江夏区",
				"value": 10
			},
			{
				"name": "江汉区",
				"value": 20
			},
			{
				"name": "江岸区",
				"value": 10
			},
			{
				"name": "硚口区",
				"value": 10
			},
			{
				"name": "武汉经济开发区",
				"value": 10
			},
			{
				"name": "蔡甸区",
				"value": 5
			},
			{
				"name": "东西湖区",
				"value": 5
			},
			{
				"name": "汉阳区",
				"value": 10
			},
			{
				"name": "黄陂区",
				"value": 5
			},
			{
				"name": "新洲区",
				"value": 10
			},
		]
	}
	for(var i = 0, len = wuhanV["end"].length; i < len; i++) {
		wuhanV["end"][i]["stroke-width"] = wuhanV["end"][i]["value"] / 10 + 0.5;
	};

	drawSvg(wuhanV);
});