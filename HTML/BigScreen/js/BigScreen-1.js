// JavaScript Document
$(function() {
	var nav_1_a = 0,
		nav_1_a_p = nav_1_a,
		nav_2_a = 0,
		nav_2_a_p = nav_2_a,
		clickB = true;
	$('.nav-1 a').click(function() {
		if(clickB) {
			$(this).addClass('active').siblings().removeClass('active');
			nav_1_a = $(this).index();
			$('.nav-2').addClass('hide').eq(nav_1_a).removeClass('hide');
		}
	});

	$('.nav-2 a').click(function() {
		if(clickB) {
			$('.nav-2 a').removeClass('active');
			nav_2_a = $(this).index();
			$('.nav-2').eq(0).find('a').eq(nav_2_a).addClass('active');
			$('.nav-2').eq(1).find('a').eq(nav_2_a).addClass('active');
		}
	});

	$('.nav-1 a,.nav-2 a').click(function() {
		if(clickB) {
			clickB = false;
			if((nav_1_a_p != nav_1_a) || (nav_2_a_p != nav_2_a)) {
				nav_1_a_p = nav_1_a;
				nav_2_a_p = nav_2_a;
				//console.log('nav_1_a:' + nav_1_a, 'nav_2_a:' + nav_2_a);
				switchoverFn(nav_1_a, nav_2_a);
			}
		}
	});

	var nav_1_t = function() {
		if($('.header-wrap').css('display') == 'none') {
			$('.drag-1').css('visibility', 'hidden');
			setTimeout(function() {
				$('.nav-1 a').not('.active').click();
				setTimeout(function() {
					$('.nav-2 a').not('.active').eq(Math.round(Math.random() * 3)).click();
					nav_1_t();
				}, 5000)
			}, 5000);
		}
	}
	setTimeout(nav_1_t, 1000);

	$('.nav-3 a').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	function switchoverFn(inGo, nameI) {
		var rcd = $('.right-content-d').eq(1);
		if(inGo == 0) {
			rcd.find('.ingo').html('流入');
		} else {
			rcd.find('.ingo').html('流出');
		};
		var nameAll = ['武汉', '长沙', '合肥', '南昌'];
		rcd.find('.name-1 em').html(nameAll[nameI]);
		nameAll.splice(nameI, 1);
		rcd.find('.source-1 em').each(function(i) {
			$(this).html(nameAll[i]);
		});
		rotateFn();

		var indexAll = [0, 1, 2, 3];
		indexAll.splice(nameI, 1);
		iv = 0;
		if(inGo == 0) {
			ligatureVal = [{
					geometry: indexAll[0],
					material: nameI,
					val: 1
				},
				{
					geometry: indexAll[1],
					material: nameI,
					val: 3
				},
				{
					geometry: indexAll[2],
					material: nameI,
					val: 6
				}
			];
			MeshColor = 0xff0000;
			flashSpot1.material.color.set(MeshColor);
			flashSpot2.material.color.set(MeshColor);
			circle_1.material.color.set(MeshColor);
			circle_2.material.color.set(MeshColor);
			circle_3.material.color.set(MeshColor);
			circle_4.material.color.set(MeshColor);
		} else {
			ligatureVal = [{
					geometry: nameI,
					material: indexAll[0],
					val: 1
				},
				{
					geometry: nameI,
					material: indexAll[1],
					val: 3
				},
				{
					geometry: nameI,
					material: indexAll[2],
					val: 6
				}
			];
			MeshColor = 0x00ff72;
			flashSpot1.material.color.set(MeshColor);
			flashSpot2.material.color.set(MeshColor);
			circle_1.material.color.set(MeshColor);
			circle_2.material.color.set(MeshColor);
			circle_3.material.color.set(MeshColor);
			circle_4.material.color.set(MeshColor);
		};
		flashPoint = point[nameI];
		flashSpot1.position.set(flashPoint[0], flashPoint[1], 2);
		flashSpot2.position.set(flashPoint[0], flashPoint[1], 2);
	};

	function rotateFn() {
		$('.right-content-d').eq(0).removeClass('transform-front-view').addClass('transform-top-view');
		$('.right-content-d').eq(1).removeClass('transform-bottom-view').addClass('transform-front-view');
		setTimeout(function() {
			$('.right-content-d').eq(0).addClass('transform-bottom-view').removeClass('transform-top-view transition-1').appendTo('.right-content');
			setTimeout(function() {
				$('.right-content-d').addClass('transition-1');
				clickB = true;
			}, 30);
		}, 1030);
	};

	//隐藏鼠标引导标
	setTimeout(function() {
		$('.drag-1').css('visibility', 'hidden');
	}, 4000);
});