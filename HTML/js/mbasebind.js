// JavaScript Document
$(function() {
	JSaddDOMLoad = function() {
		if(!ie) {
			var aID = [],
				DdB = true;
			$(window).on('DOMNodeInserted', function(ev) {
				aID.push(ev.originalEvent.target);
				if(DdB) {
					DdB = false;
					setTimeout(function() {
						var initDom = $(aID).filter('[init]').add($(aID).find('[init]'));
						$(aID).each(function() {
							if(this.nodeName == '#text' && $(this.parentNode).is('[init]')) initDom = initDom.add($(this.parentNode));
						});
						initDom.trigger('myinit');
						DNIFn(aID);
						aID = [];
						DdB = true;
					}, 0);
				};
			});

			function DNIFn(all) {
				var allDom = $(all);
				var inputRange = allDom.filter('input.range').add(allDom.find('input.range'));
				inputRange.trigger('myinit');
				var inputCheckbox = allDom.find('input[type="radio"],input[type="checkbox"]');
				inputCheckbox.trigger('myinit');
				var inputNumber = allDom.filter('input.number').add(allDom.find('input.number'));
				inputNumber.trigger('myinit');
				var Mselect = allDom.filter('select').add(allDom.find('select'));
				Mselect.trigger('myinit');
				if(PC) {
					var MScrollDom = allDom.filter('.MScroll').add(allDom.find('.MScroll'));
					MScrollDom.trigger('myinit');
				};
				var Mc1 = allDom.find('.Mc1');
				Mc1.trigger('myinit');
				var Mc2 = allDom.find('.Mc2');
				Mc2.trigger('myinit');
			};
		};
	};

	$(document).on('myinit', 'input.range', function() {
		var _tW = $(this).css('width'),
			_tI = $(this).attr('min') || 0,
			_tA = $(this).attr('max') || 10,
			_tS = $(this).attr('step') || 1,
			MiRg = "<div class='range' style='width:" + _tW + ";' min='" + _tI + "' max='" + _tA + "' step='" + _tS + "'> <div class='mea mea1'></div> <div class='mea mea2'></div></div>",
			meaDOM = $(MiRg).insertAfter($(this)).find('.mea');
		$(this).css('display', 'none'), meaDOM.move(rangeFn), meaDOM.move(function() {
			if($(this).is('.mea1')) {
				$(this).parent().prev().attr('value', $(this).attr('value'));
			} else {
				$(this).parent().prev().attr('bigValue', $(this).attr('value'));
			}
			$(this).parent().prev().trigger("change");
		});
	});
	$('input.range').trigger('myinit');
	document.createElement("iafter");
	$(document).on('myinit', 'input[type="radio"],input[type="checkbox"]', function(ev) {
		$(this).css('display', 'none').after('<iafter>');
	});
	$('input[type="radio"],input[type="checkbox"]').trigger('myinit');
	document.createElement("iaadd");
	document.createElement("iaminus");
	$(document).on('myinit', 'input.number', function() {
		$(this).after('<iafter><iaadd></iaadd><iaminus></iaminus></iafter>');
	});
	$('input.number').trigger('myinit');
	$(document).on('click', 'iaadd', function() {
		var inputP = $(this).parent().prev(),
			inputVal = parseFloat(inputP.val() || 0),
			inputStep = parseFloat(inputP.attr('step') || 1),
			inputMax = parseFloat(inputP.attr('max'));
		if(inputMax != NaN) {
			((inputVal + inputStep) <= inputMax) && inputP.val(inputVal + inputStep).trigger('change');
		} else {
			inputP.val(inputVal + inputStep).trigger('change');
		}
	});
	$(document).on('click', 'iaminus', function() {
		var inputP = $(this).parent().prev(),
			inputVal = parseFloat(inputP.val() || 1),
			inputStep = parseFloat(inputP.attr('step') || 1),
			inputMin = parseFloat(inputP.attr('min'));
		if(inputMin != NaN) {
			((inputVal - inputStep) >= inputMin) && inputP.val(inputVal - inputStep).trigger('change');
		} else {
			inputP.val(inputVal - inputStep).trigger('change');
		}
	});
	$(document).on('myinit', 'select', function() {
		$(this).css('display', 'none');
		var str1 = '',
			str2 = '',
			str3 = '',
			oSelectedT = $("option:selected", this).text(),
			aOption = $("option", this),
			selectW = $(this).css('width'),
			placeholder = $(this).attr('placeholder');
		if(placeholder) {
			str2 = '<p class="Mchecked"><i>' + placeholder + '</i></p>';
		} else {
			str2 = '<p class="Mchecked">' + oSelectedT + '</p>';
		};
		for(var i = 0, len = aOption.length; i < len; i++) {
			str3 += '<span class="Moption">' + aOption.eq(i).text() + '</span>'
		};
		str1 = '<div class="Mselect" style="width:' + selectW + ';">' + str2 + '<div class="MoptionBox MScroll">' + str3 + '</div></div>';
		$(this).next('.Mselect').remove();
		$(this).after(str1);
		if(PC) {
			var MScrollDom = $(this).next().find('.MScroll');
			MScrollDom.mCustomScrollbar({
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				horizontalScroll: false
			});
		};
	});
	$('select').trigger('myinit');
	$(document).on('click', '.Moption', function() {
		var opi = $(this).index(),
			oSelect = $(this).parents('.Mselect').prev();
		oSelect.val(oSelect.children().eq(opi).val());
		oSelect.trigger("change");
	});
	$(document).on('myinit', '.MScroll', function() {
		$(this).mCustomScrollbar({
			scrollButtons: {
				enable: false,
				scrollType: "continuous",
				scrollSpeed: 20,
				scrollAmount: 40
			},
			horizontalScroll: false
		});
	});
	var imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEACAIAAAD9XIvPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGM0FENkRDMzBFOUIxMUU3QTkyQkJGRjUxMTk2NTM2MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGM0FENkRDNDBFOUIxMUU3QTkyQkJGRjUxMTk2NTM2MSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYzQUQ2REMxMEU5QjExRTdBOTJCQkZGNTExOTY1MzYxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYzQUQ2REMyMEU5QjExRTdBOTJCQkZGNTExOTY1MzYxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+83/t8AAAARVJREFUeNrM0ZGzhFAUx/EzQRQtRVEURUtRFEVRFC3190RRFEVRFEVRFEVRFAXN7vS+b97BcOHBZ+bOnHvPved35RKRS0xYeMCGAxcefDwRIESEGAlSZHghN0TMO9QKlKhQo0GLDj0GjJgwY8GKDTsOfOStq10rq+6c9eSonXrt3OpNtd5c/r3EOEXuSK6TZDpZopNGOnmgSfiajKtJ2ZqcpUn+JiomLDxgw4ELDz6eCBAiQowEKTK8kF8GDe+IFNRLVKjRoEWHHgNGTJixYMWGHQfeuN44sGPDigUzJowY0KNDiwY1KpQo+OfzDrUcL2RIkSBGhBABnvDhwYUDGw9YML8YqRh0u/PPIuWfz1vfjPRHgAEAGAVaVdP3veoAAAAASUVORK5CYII=",
		colorImg = document.createElement("img");
	colorImg.src = imgSrc;

	$(document).on('myinit', '.Mcolor .Mc1', function() {
		this.width = 1, this.height = 256, ctx = this.getContext("2d"), ctx.drawImage(colorImg, 0, 0);
	});
	$('.Mcolor .Mc1').trigger('myinit');
	$(document).on('myinit', '.Mcolor .Mc2', function() {
		this.width = 256, this.height = 256;
	});
	$('.Mcolor .Mc2').trigger('myinit');
	$(document).on('click', '.Mcolor .Mc1', function(ev) {
		var cdH = $(this).height(),
			cH = this.height,
			cPageY = (ev.pageY - $(this).offset().top) / cdH * cH,
			ctx = this.getContext("2d"),
			iData = ctx.getImageData(0, cPageY, 1, cPageY + 1).data,
			oColor = 'rgba(' + iData[0] + ',' + iData[1] + ',' + iData[2] + ',1)',
			oColor2 = 'rgba(' + iData[0] + ',' + iData[1] + ',' + iData[2] + ',0)',
			c2 = $(this).siblings('.Mc2').get(0),
			ctx2 = c2.getContext("2d");
		ctx2.clearRect(0, 0, c2.width, c2.height);
		var g1 = ctx2.createLinearGradient(0, 0, c2.width, 0);
		g1.addColorStop(0, oColor), g1.addColorStop(1, oColor2), ctx2.fillStyle = g1, ctx2.fillRect(0, 0, c2.width, c2.height);
		var g2 = ctx2.createLinearGradient(0, 0, 0, c2.height);
		g2.addColorStop(0, "rgba(0,0,0,0)"), g2.addColorStop(1, "rgba(0,0,0,1)"), ctx2.fillStyle = g2, ctx2.fillRect(0, 0, c2.width, c2.height);
	});
	$(document).on('click', '.Mcolor .Mc2', function(ev) {
		var cdW = $(this).width(),
			cdH = $(this).height(),
			cPageX = (ev.pageX - $(this).offset().left) / cdW * this.width,
			cPageY = (ev.pageY - $(this).offset().top) / cdH * this.height,
			ctx2 = this.getContext("2d"),
			iData = ctx2.getImageData(cPageX, cPageY, cPageX + 1, cPageY + 1).data,
			a = iData[3] / 256,
			r = parseInt(256 * (1 - a) + iData[0] * a),
			g = parseInt(256 * (1 - a) + iData[1] * a),
			b = parseInt(256 * (1 - a) + iData[2] * a),
			oColor = "rgb(" + r + "," + g + "," + b + ")";
		if($(this).siblings('input').val() != oColor) $(this).siblings('input').val(oColor).trigger('change');
	});

	$(document).on('myinit', '[init],input.range,input[type="radio"],input[type="checkbox"],input.number,select,.MScroll,.Mc1,.Mc2', function(ev) {
		return false;
	});
	
	(function() {
		var myinitTrigger = document.createElement("script");
		myinitTrigger.type = "text/javascript";
		myinitTrigger.id = "myinitTrigger";
		myinitTrigger.innerHTML = "$(function() {\n $(document).on('myinit', '[init]', function() { $(this).append('<!---->')}); \n /*动态绑定开始执行*/ \n JSaddDOMLoad(); \n/*初始化事件,触发*/ \n $('[init]').trigger('myinit'); })";
		document.getElementsByTagName('body')[0].appendChild(myinitTrigger);
	})();
});