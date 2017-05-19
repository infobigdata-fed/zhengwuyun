$(function() {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		direction: 'vertical',
		slidesPerView: 1,
		paginationClickable: true,
		mousewheelControl: true,
		onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
			if(swiper.activeIndex == 1 || swiper.activeIndex == 3) {
				$('body').removeClass('header-dark').addClass('header-light');
			} else {
				$('body').addClass('header-dark').removeClass('header-light');
			}
		}
	});

	//swiper.slideTo(4, 1000, true);

	var animationEvent = (function whichTransitionEvent() {
		var t;
		var el = document.createElement('fakeelement');
		var animationend = {
			'animation': 'animationend',
			'OAnimation': 'oAnimationEnd',
			'MozAnimation': 'animationend',
			'WebkitAnimation': 'webkitAnimationEnd'
		}
		for(t in animationend) {
			if(el.style[t] !== undefined) {
				return animationend[t];
			}
		}
	})();

	if(animationEvent) {
		$('.nav-a-hr i').on(animationEvent, function() {
			var _sectionNav = ["nav-a-1", "nav-a-2", "nav-a-3"];
			var _thisP = $(this).parent().parent().parent().parent();

			_thisP.attr('class', 'active');
			_thisP.nextAll().each(function(i) {
				$(this).attr('class', _sectionNav[i]);
			});
			_thisP.prevAll().each(function(i) {
				$(this).attr('class', _sectionNav[i]);
			});
			$('.section-1-xq>div').eq(_thisP.index()).addClass('active').siblings().removeClass('active');
			if(_thisP.nextAll().size() == 0) {
				setTimeout(function() {
					$('.nav-a-hr i').css('animation', "myfirst-0 1s 0s linear 2 forwards");

					var _thisP = $('.section-1-nav>div').eq(0);
					_thisP.attr('class', 'active');
					_thisP.nextAll().each(function(i) {
						$(this).attr('class', _sectionNav[i]);
					});
					_thisP.prevAll().each(function(i) {
						$(this).attr('class', _sectionNav[i]);
					});
					$('.section-1-xq>div').eq(_thisP.index()).addClass('active').siblings().removeClass('active');
				}, 1000);
			}
		});
	};

	$('.section-1-nav>div').on("mouseenter", function() {
		var _sectionNav = ["nav-a-1", "nav-a-2", "nav-a-3"];
		var _thisP = $(this);

		_thisP.attr('class', 'active');
		_thisP.nextAll().each(function(i) {
			$(this).attr('class', _sectionNav[i]);
		});
		_thisP.prevAll().each(function(i) {
			$(this).attr('class', _sectionNav[i]);
		});
		$('.section-1-xq>div').eq(_thisP.index()).addClass('active').siblings().removeClass('active');
	});
	//第三屏iframe去掉header
	var wFrames = window.frames;
	for(var framesI = 0; framesI < wFrames.length; framesI++) {
		if(wFrames[i].name == "swiper-slide-3-iframe") {
			wFrames[i].onload = function() {
				_document = wFrames[i].document;
				_document.querySelector(".header-wrap").style.display = "none";
			}
		}
	}
	//第四屏
	var rollnewFn = function() {
		var _sc = $('.section-4'),
			_scT = _sc.offset().top,
			_stB = _scT + _sc.height();
		$('.section-4-content').find('.content-xq').each(function() {
			var _thisT = $(this).offset().top,
				_thisB = _thisT + $(this).height();
			if(_thisT < _scT || _thisB > _stB) {
				$(this).addClass('hide')
			} else {
				$(this).removeClass('hide')
			}
		});
	};
	rollnewFn();

	//新闻向上滑动加载更多
	$('#rollnew-a').move(function() {
		$(this).css({
			'bottom': '-=' + this.pageYc
		});
		//$('.section-4-content').css('margin-top', '+=' + this.pageYc);//如果新闻一直加载不完
		var _sc = $('.section-4'),
			_scT = _sc.offset().top,
			_stB = _scT + _sc.height();
		if($('.section-4-content').offset().top + $('.section-4-content').height() - this.pageYc >= _stB) {
			$('.section-4-content').css('margin-top', '+=' + this.pageYc);
		}
		rollnewFn();
	});
	$(window).mouseup(function() {
		$('#rollnew-a').animate({
			bottom: 10
		}, 1000);

	});
});