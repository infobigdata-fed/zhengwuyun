// JavaScript Document
document.createElement("header"); //iyt
document.createElement("footer"); //ijj
document.createElement("nav"); //idh
document.createElement("section"); //ik
document.createElement("wrap"); //ibg
document.createElement("content"); //inr
$(function() {
	//节点加载完事件
	$.fn.myinit = function(Fn) {
		Fn.apply(this);
		return this;
	};
	//判断IE,判断火狐
	ie = !-[1, ]; //IE8-
	FF = !!navigator.userAgent.match(/firefox/i);
	PC = !navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	Mobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	//var ev=ev||event;ev.preventDefault();window.event.returnValue=false; return false;
	//input的val改变事件$('.text').input(function() {this})可以on绑定;
	$('.canFocus').attr({
		"tabindex": "0",
		"hidefocus": "true"
	});

	$.fn.input = function(Fn) {
		if(ie) {
			$(this).on('propertychange', function() {
				Fn.apply(this);
			})
		} else {
			$(this).on('input', function() {
				Fn.apply(this);
			})
		}
	};
	//滚轮滚动事件$(document).mousewheel(function() {this.Down})可以on绑定;
	$.fn.mousewheel = function(Fn) {
		if(FF) {
			$(this).on('DOMMouseScroll', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.detail > 0);
				Fn.apply(this);
			})
		} else {
			$(this).on('mousewheel', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.wheelDelta < 0);
				Fn.apply(this);
			})
		}
	};
	//拖拽事件$('.move').move(function() { $(this).css({ 'left': '+=' + this.pageXc, 'top': '+=' + this.pageYc }); });
	$.fn.move = function(Fn) {
		$(this).on('mousedown', function(ev) {
			this.pageXc = this.pageYc = 0;
			var _this = this,
				pvrPageX = ev.pageX,
				pvrPageY = ev.pageY;
			$(document).on('mousemove.thisMove', function(ev) {
				ev.preventDefault();
				_this.pageXc = ev.pageX - pvrPageX;
				_this.pageYc = ev.pageY - pvrPageY;
				Fn.apply(_this);
				pvrPageX = ev.pageX;
				pvrPageY = ev.pageY;
			});
			$(document).on('mouseup.thisMove', function(ev) {
				$(this).off('mousemove.thisMove mouseup.thisMove');
			});
			//$(this).on('dragend', function(ev) {
			//	setTimeout(function() {
			//		$(document).mouseup();
			//	}, 10);
			//});
		});
	};
	//模拟input滑块事件$('#range .mea').move(rangeFn);
	rangeFn = function() {
		var _thisParent = $(this).parent();
		var _thisParentLeftMin = 0;
		var _thisParentLeftMax = _thisParent.width();
		var _thisStep = (_thisParentLeftMax - _thisParentLeftMin) * _thisParent.attr('step') / (_thisParent.attr('max') - _thisParent.attr('min'));
		var _thisLeft = parseFloat($(this).css('left')) + this.pageXc;
		if(_thisLeft >= _thisParentLeftMin && _thisLeft <= _thisParentLeftMax) {
			$(this).css({
				'left': _thisLeft,
			});

			$(this).attr('value', Math.round(_thisLeft / _thisStep) * _thisParent.attr('step'));
		};
	};
	//空格验证 $('.kgyz').on('focus',focusNull);
	focusNull = function() {
		$(this).next().css('display', 'none');
		$(this).blur(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			};
		});
	};
	//初始状态,空格验证 textLoad('.kgyz');
	textLoad = function(obj) {
		$(obj).each(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			} else {
				$(this).next().css('display', 'none');
			};
		});
	};

	//模拟滚动条调用
	if(PC && $('.MScroll').size() > 0) {
		(function() {
			$(".MScroll").not('.MScrollyx').mCustomScrollbar({
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				horizontalScroll: false
			});
			$(".MScrollyx").mCustomScrollbar({
				axis: "yx",
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				theme: "light-thick",
				callbacks: {
					whileScrolling: function() {
						if($(this).find('.fixedTop').size() > 0) {
							var containerLT = $(this).find('.mCSBContainer');
							var top = parseFloat(containerLT.css('top')) * -1;
							$(this).find('.fixedTop').css('top', top);
						}
						if($(this).find('.fixedLeft').size() > 0) {
							var containerLT = $(this).find('.mCSBContainer');
							var left = parseFloat(containerLT.css('left')) * -1;
							$(this).find('.fixedLeft').css('left', left);
						}
					}
				}
			});
		})();
	};
	//模拟下拉框
	(function() {
		$(document).on('click', '.Mchecked', function() {
			$(this).toggleClass('McheckedOn');
			$(this).siblings().slideToggle();
		});
		$(document).on('click', '.Moption', function() {
			$(this).parents('.MoptionBox').slideUp().siblings('p').html($(this).html()).removeClass('McheckedOn');
			$(this).parents('.MoptionBox').slideUp().siblings('input').val($(this).attr('value')).trigger("change");
		});
		$(document).on('mouseleave', '.Mselect', function() {
			$(this).children('.MoptionBox').slideUp().siblings().removeClass('McheckedOn');
		});
	})();

	//模拟原生提示语
	(function() {
		document.createElement("mtitle");
		$(document).on('mouseenter', '[mtitle]', function(ev) {
			var $this = $(this);
			var $ev = ev;
			var $mtitle;
			var _thisT = setTimeout(function() {
				$mtitle = $('<mtitle style="position: absolute;">' + $this.attr('mtitle') + '</mtitle>').appendTo('body');
				if(($this.offset().top + $this.outerHeight() + $mtitle.outerHeight()) <= ($(window).scrollTop() + $(window).height())) {
					$mtitle.css('top', $this.offset().top + $this.outerHeight());
				} else {
					$mtitle.css('top', $this.offset().top - $mtitle.outerHeight());
				};
				if(($this.offset().left + $mtitle.outerWidth()) <= ($(window).scrollLeft() + $(window).width())) {
					$mtitle.css('left', $this.offset().left);
				} else {
					$mtitle.css('left', $(window).scrollLeft() + $(window).width() - $mtitle.outerWidth());
				}
			}, 300);
			$(this).one('mouseleave', function() {
				clearInterval(_thisT);
				$mtitle.remove();
			})
		});
	})();
	//错误提示语-正则验证
	(function() {
		document.createElement("verror");
		$(document).on('blur', '[mpattern]', function() {
			var iPattern = $(this).attr('mpattern');
			var iVal = $(this).val();
			iPattern = new RegExp(iPattern);
			if(!iPattern.test(iVal)) {
				/*错误提示语*/
				$(this).attr('valid', 'true').nextAll('verror').eq(0).css('display', '');
			} else {
				$(this).attr('valid', 'false').nextAll('verror').eq(0).css('display', 'none');
			}
		});
	})();

	/*! layPage-v1.3.0 分页组件 License MIT  http://laypage.layui.com/ By 贤心 */
	! function() {
		"use strict";

		function a(d) {
			var e = "laypagecss";
			a.dir = "dir" in a ? a.dir : f.getpath + "/skin/laypage.css", new f(d), a.dir && !b[c](e) && f.use(a.dir, e)
		}
		a.v = "1.3";
		var b = document,
			c = "getElementById",
			d = "getElementsByTagName",
			e = 0,
			f = function(a) {
				var b = this,
					c = b.config = a || {};
				c.item = e++, b.render(!0)
			};
		f.on = function(a, b, c) {
			return a.attachEvent ? a.attachEvent("on" + b, function() {
				c.call(a, window.even)
			}) : a.addEventListener(b, c, !1), f
		}, f.getpath = function() {
			var a = document.scripts,
				b = a[a.length - 1].src;
			return b.substring(0, b.lastIndexOf("/") + 1)
		}(), f.use = function(c, e) {}, f.prototype.type = function() {
			var a = this.config;
			return "object" == typeof a.cont ? void 0 === a.cont.length ? 2 : 3 : void 0
		}, f.prototype.view = function() {
			var b = this,
				c = b.config,
				d = [],
				e = {};
			if(c.pages = 0 | c.pages, c.curr = 0 | c.curr || 1, c.groups = "groups" in c ? 0 | c.groups : 5, c.first = "first" in c ? c.first : "&#x9996;&#x9875;", c.last = "last" in c ? c.last : "&#x5C3E;&#x9875;", c.prev = "prev" in c ? c.prev : "&#x4E0A;&#x4E00;&#x9875;", c.next = "next" in c ? c.next : "&#x4E0B;&#x4E00;&#x9875;", c.pages <= 1) {
				return ""
			}
			for(c.groups > c.pages && (c.groups = c.pages), e.index = Math.ceil((c.curr + (c.groups > 1 && c.groups !== c.pages ? 1 : 0)) / (0 === c.groups ? 1 : c.groups)), c.curr > 1 && c.prev && d.push('<a href="javascript:;" class="laypage_prev" data-page="' + (c.curr - 1) + '">' + c.prev + "</a>"), e.index > 1 && c.first && 0 !== c.groups && d.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">' + c.first + "</a><span>&#x2026;</span>"), e.poor = Math.floor((c.groups - 1) / 2), e.start = e.index > 1 ? c.curr - e.poor : 1, e.end = e.index > 1 ? function() {
					var a = c.curr + (c.groups - e.poor - 1);
					return a > c.pages ? c.pages : a
				}() : c.groups, e.end - e.start < c.groups - 1 && (e.start = e.end - c.groups + 1); e.start <= e.end; e.start++) {
				e.start === c.curr ? d.push('<span class="laypage_curr" ' + (/^#/.test(c.skin) ? 'style="background-color:' + c.skin + '"' : "") + ">" + e.start + "</span>") : d.push('<a href="javascript:;" data-page="' + e.start + '">' + e.start + "</a>")
			}
			return c.pages > c.groups && e.end < c.pages && c.last && 0 !== c.groups && d.push('<span>&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="' + c.pages + '">' + c.last + "</a>"), e.flow = !c.prev && 0 === c.groups, (c.curr !== c.pages && c.next || e.flow) && d.push(function() {
				return e.flow && c.curr === c.pages ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + c.next + "</span>" : '<a href="javascript:;" class="laypage_next" data-page="' + (c.curr + 1) + '">' + c.next + "</a>"
			}()), '<div name="laypage' + a.v + '" class="laypage_main laypageskin_' + (c.skin ? function(a) {
				return /^#/.test(a) ? "molv" : a
			}(c.skin) : "default") + '" id="laypage_' + b.config.item + '">' + d.join("") + function() {
				return c.skip ? '<span class="laypage_total"><label>&#x5230;&#x7B2C;</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label><button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>' : ""
			}() + "</div>"
		}, f.prototype.jump = function(a) {
			if(a) {
				for(var b = this, c = b.config, e = a.children, g = a[d]("button")[0], h = a[d]("input")[0], i = 0, j = e.length; j > i; i += 1) {
					"a" === e[i].nodeName.toLowerCase() && f.on(e[i], "click", function() {
						var a = 0 | this.getAttribute("data-page");
						c.curr = a, b.render()
					})
				}
				g && f.on(g, "click", function() {
					var a = 0 | h.value.replace(/\s|\D/g, "");
					a && a <= c.pages && (c.curr = a, b.render())
				})
			}
		}, f.prototype.render = function(a) {
			var d = this,
				e = d.config,
				f = d.type(),
				g = d.view();
			2 === f ? e.cont.innerHTML = g : 3 === f ? e.cont.html(g) : b[c](e.cont).innerHTML = g, e.jump && e.jump(e, a), d.jump(b[c]("laypage_" + e.item)), e.hash && !a && (location.hash = "!" + e.hash + "=" + e.curr)
		}, "function" == typeof define ? define(function() {
			return a
		}) : "undefined" != typeof exports ? module.exports = a : window.laypage = a
	}();

	//分页PageFn('Mpage1','hrefPage');
	PageFn = function(opage, hrefPage) {
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				//通过url获取当前页，也可以同上（pages）方式获取
				var str = "/" + hrefPage + "=(\\d+)/";
				var reg = eval(str);
				var page = location.search.match(reg);
				return page ? page[1] : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					var search = location.search;
					var str = "/" + hrefPage + "=(\\d+)/";
					var reg = eval(str);
					var page = location.search.match(reg);
					if(page) {
						search = search.replace(reg, hrefPage + '=' + e.curr);
					} else if(!search) {
						search = search + '?' + hrefPage + '=' + e.curr;
					} else {
						search = search + '&' + hrefPage + '=' + e.curr;
					}
					location.href = search;
				}
			}
		});
		MPage.find('.laypage_skip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypage_skip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};
	PageFnAjax = function(opage, ObjFn) {
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				return MPage.attr('data-curr') ? MPage.attr('data-curr') : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					MPage.attr('data-curr', e.curr);
					ObjFn();
					MPage.find('.laypage_skip').attr({
						'max': thisPages,
						'type': 'text'
					});
				}
			}
		});
		MPage.find('.laypage_skip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypage_skip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};
});
//模板引擎
! function() {
	"use strict";
	var f, b = {
			open: "{{",
			close: "}}"
		},
		c = {
			exp: function(a) {
				return new RegExp(a, "g")
			},
			query: function(a, c, e) {
				var f = ["#([\\s\\S])+?", "([^{#}])*?"][a || 0];
				return d((c || "") + b.open + f + b.close + (e || ""))
			},
			escape: function(a) {
				return String(a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
			},
			error: function(a, b) {
				var c = "Laytpl Error：";
				return "object" == typeof console && console.error(c + a + "\n" + (b || "")), c + a
			}
		},
		d = c.exp,
		e = function(a) {
			this.tpl = a
		};
	e.pt = e.prototype, e.pt.parse = function(a, e) {
		var f = this,
			g = a,
			h = d("^" + b.open + "#", ""),
			i = d(b.close + "$", "");
		a = a.replace(/[\r\t\n]/g, " ").replace(d(b.open + "#"), b.open + "# ").replace(d(b.close + "}"), "} " + b.close).replace(/\\/g, "\\\\").replace(/(?="|')/g, "\\").replace(c.query(), function(a) {
			return a = a.replace(h, "").replace(i, ""), '";' + a.replace(/\\/g, "") + '; view+="'
		}).replace(c.query(1), function(a) {
			var c = '"+(';
			return a.replace(/\s/g, "") === b.open + b.close ? "" : (a = a.replace(d(b.open + "|" + b.close), ""), /^=/.test(a) && (a = a.replace(/^=/, ""), c = '"+_escape_('), c + a.replace(/\\/g, "") + ')+"')
		}), a = '"use strict";var view = "' + a + '";return view;';
		try {
			return f.cache = a = new Function("d, _escape_", a), a(e, c.escape)
		} catch(j) {
			return delete f.cache, c.error(j, g)
		}
	}, e.pt.render = function(a, b) {
		var e, d = this;
		return a ? (e = d.cache ? d.cache(a, c.escape) : d.parse(d.tpl, a), b ? (b(e), void 0) : e) : c.error("no data")
	}, f = function(a) {
		return "string" != typeof a ? c.error("Template not found") : new e(a)
	}, f.config = function(a) {
		a = a || {};
		for(var c in a) b[c] = a[c]
	}, f.v = "1.1", "function" == typeof define ? define(function() {
		return f
	}) : "undefined" != typeof exports ? module.exports = f : window.laytpl = f
}();

render = function(template, data, view) {
	laytpl(template).render(data, function(html) {
		/*var oDom = $('<div></div>').append($(html));
		oDom.find('[wl-text]').append('<!--bindText-->');
		view.innerHTML = oDom.html();*/
		view.innerHTML = html;
	});
};