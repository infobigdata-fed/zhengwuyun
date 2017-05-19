$(function() {
	var zr; // 全局可用zrender对象
	var shape = [
		'zrender',
		'zrender/shape/Rose',
		'zrender/shape/Trochoid',
		'zrender/shape/Circle',
		'zrender/shape/Sector',
		'zrender/shape/Ring',
		'zrender/shape/Ellipse',
		'zrender/shape/Rectangle',
		'zrender/shape/Text',
		'zrender/shape/Heart',
		'zrender/shape/Droplet',
		'zrender/shape/Line',
		'zrender/shape/Image',
		'zrender/shape/Star',
		'zrender/shape/Isogon',
		'zrender/shape/BezierCurve',
		'zrender/shape/Polyline',
		'zrender/shape/Path',
		'zrender/shape/Polygon'
	];
	//两城函数
	var twocityFn = function() {
		$('#chengshi-1').html(chengshi_1.name);
		$('#chengshi-1-gdp text').html('GDP：' + chengshi_1.gdp + ' 亿元');
		$('#chengshi-1-gdp circle').attr('r', parseInt(chengshi_1.gdp / 1000));
		$('#chengshi-1-renkou text').html('人口：' + chengshi_1.renkou + ' 万人');
		$('#chengshi-1-renkou circle').attr('r', parseInt(chengshi_1.renkou / 100));
		$('#chengshi-1-mianji text').html('面积：' + chengshi_1.mianji + ' 平方公里');
		$('#chengshi-1-mianji circle').attr('r', parseInt(chengshi_1.mianji / 1000));
		$('#chengshi-1-liuru text').html('资金流入总量占比：' + chengshi_1.liurubi + '%');
		$('#chengshi-1-liuru circle').eq(1).attr('stroke-dasharray', chengshi_1.liurubi / 100 * 64 + ' 64');
		$('#chengshi-1-liuchu text').html('资金流出总量占比：' + chengshi_1.liuchubi + '%');
		$('#chengshi-1-liuchu circle').eq(1).attr('stroke-dasharray', chengshi_1.liuchubi / 100 * 64 + ' 64');
		$('#BG-2').attr('d', 'M0,0h90v-' + (chengshi_1.liuruH) + 'a3,3,0,0,0,-3,-3h-84a3,3,0,0,0,-3,3Z');
		$('#liuru-1').attr('y', '-' + chengshi_1.liuruH);
		$('#liuru-1-m').html('¥ ' + chengshi_1.liuru);
		$('#BG').attr('d', 'M0,0h90v' + (chengshi_1.liuchuH) + 'a3,3,0,0,1,-3,3h-84a3,3,0,0,1,-3,-3Z');
		$('#liuchu-1-m').html('¥ ' + chengshi_1.liuchu);

		$('#City-2 g').each(function(i) {
			if(liuru_1[i] != undefined) {
				$(this).attr("transform", "translate(80,-" + liuru_1[i]['value'] + ")");
				$(this).find('text').html(liuru_1[i]['name']);
			} else {
				$(this).css('display', 'none');
			}
		});
		$('#City g').each(function(i) {
			if(liuchu_1[i] != undefined) {
				$(this).attr("transform", "translate(80," + liuchu_1[i]['value'] + ")");
				$(this).find('text').html(liuchu_1[i]['name']);
			} else {
				$(this).css('display', 'none');
			}
		});
		////

		if(chengshi_2.liuru * xianshibi > 150) {
			chengshi_2.liuruH = chengshi_2.liuru * xianshibi;
		} else {
			chengshi_2.liuruH = 150
		};
		if(chengshi_2.liuchu * xianshibi > 150) {
			chengshi_2.liuchuH = chengshi_2.liuchu * xianshibi;
		} else {
			chengshi_2.liuchuH = 150
		};
		$('#chengshi-2').html(chengshi_2.name);
		$('#chengshi-2-gdp text').html('GDP：' + chengshi_2.gdp + ' 亿元');
		$('#chengshi-2-gdp circle').attr('r', parseInt(chengshi_2.gdp / 1000));
		$('#chengshi-2-renkou text').html('人口：' + chengshi_2.renkou + ' 万人');
		$('#chengshi-2-renkou circle').attr('r', parseInt(chengshi_2.renkou / 100));
		$('#chengshi-2-mianji text').html('面积：' + chengshi_2.mianji + ' 平方公里');
		$('#chengshi-2-mianji circle').attr('r', parseInt(chengshi_2.mianji / 1000));
		$('#chengshi-2-liuru text').html('资金流入总量占比：' + chengshi_2.liurubi + '%');
		$('#chengshi-2-liuru circle').eq(1).attr('stroke-dasharray', chengshi_2.liurubi / 100 * 64 + ' 64');
		$('#chengshi-2-liuchu text').html('资金流出总量占比：' + chengshi_2.liuchubi + '%');
		$('#chengshi-2-liuchu circle').eq(1).attr('stroke-dasharray', chengshi_2.liuchubi / 100 * 64 + ' 64');

		$('#BG-3').attr('d', 'M0,0h90v-' + (chengshi_2.liuchuH) + 'a3,3,0,0,0,-3,-3h-84a3,3,0,0,0,-3,3Z');
		$('#liuchu-2').attr('y', '-' + (chengshi_2.liuchuH));
		$('#liuchu-2-m').html('¥ ' + chengshi_2.liuchu);
		$('#BG-4').attr('d', 'M0,0h90v' + (chengshi_2.liuruH) + 'a3,3,0,0,1,-3,3h-84a3,3,0,0,1,-3,-3Z');
		$('#liuchu-2-m').html('¥ ' + chengshi_2.liuru);

		$('#City-3 g').each(function(i) {
			if(liuchu_2[i] != undefined) {
				$(this).attr("transform", "translate(80,-" + liuchu_2[i]['value'] + ")");
				$(this).find('text').html(liuchu_2[i]['name']);
			} else {
				$(this).css('display', 'none');
			}
		});
		$('#City-4 g').each(function(i) {
			if(liuru_2[i] != undefined) {
				$(this).attr("transform", "translate(80," + liuru_2[i]['value'] + ")");
				$(this).find('text').html(liuru_2[i]['name']);
			} else {
				$(this).css('display', 'none');
			}
		});

		var createSvg = function(svgD) {
			return document.createElementNS("http://www.w3.org/2000/svg", svgD);
		};
		var line_1_o, line_1_t, line_2_o, line_2_t;

		line_1_o = 640 - chengshi_1.liuruH + line_1_v * 0.5;
		line_1_t = 510 - chengshi_2.liuchuH * 0.5 + line_1_v * 0.5;

		$('#Line-19-s').attr({
			'd': 'M564,' + line_1_o + 'C744,' + line_1_o + ',744,' + line_1_t + ',924,' + line_1_t,
			'stroke-width': line_1_v
		});
		for(var i = 4; i < line_1_v - 4;) {
			var _path = $(createSvg('path'));
			_path.attr({
				'class': 'cls-19',
				'd': 'M564,' + line_1_o + 'C744,' + line_1_o + ',744,' + line_1_t + ',924,' + line_1_t,
				'transform': 'translate(0 ' + (i - line_1_v * 0.5) + ')'
			});
			$('#Line-19-x').append(_path);
			i += 4;
		};
		line_2_o = 652 + chengshi_1.liuchuH - line_1_v * 0.5;
		line_2_t = 730 - chengshi_2.liuruH * 0.5 - line_1_v * 0.5;
		$('#Line-20-s').attr({
			'd': 'M564,' + line_2_o + 'C744,' + line_2_o + ',744,' + line_2_t + ',924,' + line_2_t,
			'stroke-width': line_2_v
		});
		for(var i = 4; i < line_2_v - 4;) {
			var _path = $(createSvg('path'));
			_path.attr({
				'class': 'cls-19',
				'd': 'M564,' + line_2_o + 'C744,' + line_2_o + ',744,' + line_2_t + ',924,' + line_2_t,
				'transform': 'translate(0 ' + (i - line_2_v * 0.5) + ')'
			});
			$('#Line-20-x').append(_path);
			i += 4;
		};
	};
	//三城及以上函数
	var nodeslinksFn = function(_nodes, _links, _nodesLength) {
		nodes = _nodes.slice(0, _nodesLength);
		var __links = [];
		for(var i = 0, len = _links.length; i < len; i++) {
			for(var j = 0, jlen = nodes.length; j < jlen; j++) {
				if(_links[i]["source"] == nodes[j]["name"]) {
					for(var jj = 0, jjlen = nodes.length; jj < jlen; jj++) {
						if(_links[i]["target"] == nodes[jj]["name"]) {
							__links.push(_links[i]);
						}
					}
				}
			}
		};
		links = __links;
	};

	require(shape, function(zrender) {
		zr = zrender.init(document.getElementById('main'));
		/*
		 *  zr has been init like this, just use it!
		 *
		 *  var zrender = require('zrender');
		 *  var zr = zrender.init(document.getElementById('main'));
		 */
		zr.clear();

		var CircleShape = require('zrender/shape/Circle');
		var SectorShape = require('zrender/shape/Sector');
		var RingShape = require('zrender/shape/Ring');
		var EllipseShape = require('zrender/shape/Ellipse');
		var HeartShape = require('zrender/shape/Heart');
		var DropletShape = require('zrender/shape/Droplet');
		var PolygonShape = require('zrender/shape/Polygon');
		var RectangleShape = require('zrender/shape/Rectangle');
		var PolylineShape = require('zrender/shape/Polyline');
		var LineShape = require('zrender/shape/Line');
		var BezierCurveShape = require('zrender/shape/BezierCurve');
		var TextShape = require('zrender/shape/Text');
		var ImageShape = require('zrender/shape/Image');
		var PathShape = require('zrender/shape/Path');
		var TrochoidShape = require('zrender/shape/Trochoid');
		var RoseShape = require('zrender/shape/Rose');
		var StarShape = require('zrender/shape/Star');
		var IsogonShape = require('zrender/shape/Isogon');
		var Group = require('zrender/Group');
		var color = require('zrender/tool/color');

		var colorIdx = 0;
		var width = Math.ceil(zr.getWidth());
		var height = Math.ceil(zr.getHeight());
		var highlightStyleNone = {
			strokeColor: 'transparent',
			opacity: 0,
		};
		//容器
		var Group = require('zrender/Group');
		var Circle = require('zrender/shape/Circle');

		zrRender = function() {
			var g = new Group({
				position: [width / 2, height / 2],
				id: 'group',
				z: 1,
			});
			zr.addGroup(g);
			/*x*/
			var r = 250;
			var _color = [
				["#e8342f", "#ff5c57"],
				["#f08336", "#ff9c56"],
				["#38b25d", "#4fdc7a"],
				["#2a71b9", "#4d9dee"],
				["#5a6980", "#7c8ba3"]
			];
			for(var i = 0, len = nodes.length; i < len; i++) {
				if(i < 5) {
					nodes[i]["colorTo"] = _color[i][0];
					nodes[i]["colorOn"] = _color[i][1];
				} else {
					nodes[i]["colorTo"] = _color[4][0];
					nodes[i]["colorOn"] = _color[4][1];
				}
			}
			for(var i = 0, len = links.length; i < len; i++) {
				links[i]["color"] = "#b3fbff";
				links[i]["hoverColor"] = "#b3fbff";
				links[i]["rHoverColor"] = "#b3fbff";
			}

			var rect_curve = [];
			var thickness = 20,
				len = nodes.length,
				ogniDeg = Math.PI * 2 / len;

			for(var i = 0; i < len; i++) {
				var _deg = Math.PI / 2 + ogniDeg * i,
					_r = r - thickness * 0.5,
					_x = Math.ceil(_r * Math.cos(_deg)),
					_y = -Math.ceil(_r * Math.sin(_deg));
				nodes[i]["x"] = _x;
				nodes[i]["y"] = _y;
				nodes[i]["angle"] = _deg;
				nodes[i]["w"] = 4;
				nodes[i]["tw"] = 4;

				rect_curve[g._children.length] = new RectangleShape({
					name: nodes[i]["name"],
					_index: g._children.length,
					value: nodes[i]["valueTo"],
					rotation: [-ogniDeg * i + Math.PI, -_x, _y],
					z: 10,
					style: {
						width: nodes[i]["valueTo"],
						height: thickness,
						x: -_x,
						y: _y - thickness * 0.5,
						brushType: 'fill',
						color: nodes[i]["colorTo"],
						radius: [0, 5, 5, 0],
					},
					highlightStyle: highlightStyleNone,
					onmouseover: function(e) {
						var _this = rect_curve[e.target._index];
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							var _curve = rect_curve[i];
							if(_curve["source"] == _this["name"]) {
								//_curve.style.strokeColor = _curve.rHoverColor;
								_curve.style.opacity = 0.6;
							}
						}
						zr.render();
					},
					onmouseout: function(e) {
						var _this = rect_curve[e.target._index];
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							var _curve = rect_curve[i];
							if(_curve["source"] == _this["name"]) {
								//_curve.style.strokeColor = _curve.color;
								_curve.style.opacity = 0.2;
							}
						}
						zr.render();
					},
				});
				g.addChild(rect_curve[g._children.length]);

				rect_curve[g._children.length] = new RectangleShape({
					name: nodes[i]["name"],
					_index: g._children.length,
					value: nodes[i]["valueOn"],
					rotation: [-ogniDeg * i + Math.PI, -_x, _y],
					z: 10,
					style: {
						width: nodes[i]["valueOn"],
						height: thickness,
						x: -_x - nodes[i]["valueOn"],
						y: _y - thickness * 0.5,
						brushType: 'fill',
						color: nodes[i]["colorOn"],
						radius: [5, 0, 0, 5],
					},
					highlightStyle: highlightStyleNone,
					onmouseover: function(e) {
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							if(rect_curve[i]["target"] == rect_curve[e.target._index]["name"]) {
								//rect_curve[i].style.strokeColor = rect_curve[i].rHoverColor;
								rect_curve[i].style.opacity = 0.6;
							}
						}
						zr.render();
					},
					onmouseout: function(e) {
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							if(rect_curve[i]["target"] == rect_curve[e.target._index]["name"]) {
								//rect_curve[i].style.strokeColor = rect_curve[i].color;
								rect_curve[i].style.opacity = 0.2;
							}
						}
						zr.render();
					},
				});
				g.addChild(rect_curve[g._children.length]);

				console.log(ogniDeg * i * 180 / Math.PI);
				var _rotationDeg = -ogniDeg * i,
					__valueTo = "_valueTo",
					__valueOn = "_valueOn";
				if(ogniDeg * i * 180 / Math.PI > 135 && ogniDeg * i * 180 / Math.PI < 225) {
					_rotationDeg = -ogniDeg * i + Math.PI;
					__valueTo = "_valueOn";
					__valueOn = "_valueTo";
				};
				var relativeW = 0,
					relativeW2 = 0,
					relativeW3 = 0,
					_textAlign = "start";
				if(ogniDeg * i * 180 / Math.PI > 0 && ogniDeg * i * 180 / Math.PI < 180) {
					relativeW = -35;
					relativeW2 = -10;
					relativeW3 = 10;
					_textAlign = "start";
				};
				if(ogniDeg * i * 180 / Math.PI > 180 && ogniDeg * i * 180 / Math.PI < 360) {
					relativeW = 35;
					relativeW2 = 10;
					relativeW3 = -10;
					_textAlign = "end";
				};

				rect_curve[g._children.length] = new TextShape({
					name: nodes[i]["name"],
					_index: g._children.length,
					angle: ogniDeg * i,
					style: {
						x: -Math.ceil((_r + 40) * Math.cos(_deg)) + relativeW * Math.cos(ogniDeg * i),
						y: -Math.ceil((_r + 40) * Math.sin(_deg)) + relativeW * Math.sin(ogniDeg * i),
						brushType: 'fill',
						color: nodes[i]["colorTo"],
						text: nodes[i]["name"],
						textFont: 'normal 18px "microsoft yahei"',
						textAlign: _textAlign,
					},
					z: 100,
					highlightStyle: highlightStyleNone,
				});
				if(ogniDeg * i * 180 / Math.PI == 0) {
					rect_curve[g._children.length].position = [-18, -40];
				};
				if(ogniDeg * i * 180 / Math.PI == 180) {
					rect_curve[g._children.length].position = [-18, 0];
				};
				g.addChild(rect_curve[g._children.length]);

				rect_curve[g._children.length] = new TextShape({
					name: nodes[i]["name"],
					_index: g._children.length,
					angle: ogniDeg * i,
					style: {
						x: -Math.ceil((_r + 40) * Math.cos(_deg)) + relativeW2 * Math.cos(ogniDeg * i),
						y: -Math.ceil((_r + 40) * Math.sin(_deg)) + relativeW * Math.sin(ogniDeg * i) + 20,
						brushType: 'fill',
						color: "#9aaeb9",
						text: '   ' + "GDP：" + nodes[i]["gdp"] + "亿元" + '   ',
						textFont: 'normal 14px "microsoft yahei"',
						textAlign: _textAlign,
					},
					z: 100,
					highlightStyle: highlightStyleNone,
				});
				if(ogniDeg * i * 180 / Math.PI == 0) {
					rect_curve[g._children.length].position = [-30, -36];
				};
				if(ogniDeg * i * 180 / Math.PI == 180) {
					rect_curve[g._children.length].position = [-30, 6];
				};
				g.addChild(rect_curve[g._children.length]);

				rect_curve[g._children.length] = new CircleShape({
					style: {
						x: -Math.ceil((_r + 40) * Math.cos(_deg)) + relativeW2 * Math.cos(ogniDeg * i),
						y: -Math.ceil((_r + 40) * Math.sin(_deg)) + relativeW * Math.sin(ogniDeg * i) + 20,
						r: 8,
						brushType: 'fill',
						color: nodes[i]["colorTo"],
					},
					z: 100,
					highlightStyle: highlightStyleNone,
				});
				if(ogniDeg * i * 180 / Math.PI == 0) {
					rect_curve[g._children.length].position = [-30, -36];
				};
				if(ogniDeg * i * 180 / Math.PI == 180) {
					rect_curve[g._children.length].position = [-30, 6];
				};
				g.addChild(rect_curve[g._children.length]);

				rect_curve[g._children.length] = new TextShape({
					name: nodes[i]["name"],
					_index: g._children.length,
					angle: ogniDeg * i,
					style: {
						x: -Math.ceil((_r + 40) * Math.cos(_deg)) + relativeW3 * Math.cos(ogniDeg * i),
						y: -Math.ceil((_r + 40) * Math.sin(_deg)) + relativeW * Math.sin(ogniDeg * i) + 40,
						brushType: 'fill',
						color: "#9aaeb9",
						text: "   " + "人口：" + nodes[i]["population"] + "万人" + "   ",
						textFont: 'normal 14px "microsoft yahei"',
						textAlign: _textAlign,
					},
					z: 100,
					highlightStyle: highlightStyleNone,
				});
				if(ogniDeg * i * 180 / Math.PI == 0) {
					rect_curve[g._children.length].position = [-30, -36];
				};
				if(ogniDeg * i * 180 / Math.PI == 180) {
					rect_curve[g._children.length].position = [-30, 6];
				};
				g.addChild(rect_curve[g._children.length]);

				rect_curve[g._children.length] = new CircleShape({
					style: {
						x: -Math.ceil((_r + 40) * Math.cos(_deg)) + relativeW3 * Math.cos(ogniDeg * i),
						y: -Math.ceil((_r + 40) * Math.sin(_deg)) + relativeW * Math.sin(ogniDeg * i) + 40,
						r: 6,
						brushType: 'fill',
						color: nodes[i]["colorOn"],
					},
					z: 100,
					highlightStyle: highlightStyleNone,
				});
				if(ogniDeg * i * 180 / Math.PI == 0) {
					rect_curve[g._children.length].position = [-30, -36];
				};
				if(ogniDeg * i * 180 / Math.PI == 180) {
					rect_curve[g._children.length].position = [-30, 6];
				};
				g.addChild(rect_curve[g._children.length]);

				rect_curve[g._children.length] = new TextShape({
					name: nodes[i]["name"],
					_index: g._children.length,
					angle: ogniDeg * i,
					rotation: [_rotationDeg, -Math.ceil((_r + 20) * Math.cos(_deg)), -Math.ceil((_r + 20) * Math.sin(_deg))],
					style: {
						x: -Math.ceil((_r + 20) * Math.cos(_deg)),
						y: -Math.ceil((_r + 20) * Math.sin(_deg)),
						brushType: 'fill',
						color: "#fff",
						text: '￥' + nodes[i][__valueTo],
						textFont: 'normal 12px verdana',
						textAlign: 'end'
					},
					z: 100,
					highlightStyle: highlightStyleNone,
					onmouseover: function(e) {
						var _this = rect_curve[e.target._index];
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							var _curve = rect_curve[i];
							var _angle = e.target.angle;
							if(_angle * 180 / Math.PI > 135 && _angle * 180 / Math.PI < 225) {
								if(_curve["target"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.rHoverColor;
									_curve.style.opacity = 0.6;
								}
							} else {
								if(_curve["source"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.rHoverColor;
									_curve.style.opacity = 0.6;
								}
							}
						}
						zr.render();
					},
					onmouseout: function(e) {
						var _this = rect_curve[e.target._index];
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							var _curve = rect_curve[i];
							var _angle = e.target.angle;
							if(_angle * 180 / Math.PI > 135 && _angle * 180 / Math.PI < 225) {
								if(_curve["target"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.color;
									_curve.style.opacity = 0.2;
								}
							} else {
								if(_curve["source"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.color;
									_curve.style.opacity = 0.2;
								}
							}
						}
						zr.render();
					},
				});
				g.addChild(rect_curve[g._children.length]);

				rect_curve[g._children.length] = new TextShape({
					name: nodes[i]["name"],
					_index: g._children.length,
					angle: ogniDeg * i,
					rotation: [_rotationDeg, -Math.ceil((_r + 20) * Math.cos(_deg)), -Math.ceil((_r + 20) * Math.sin(_deg))],
					style: {
						x: -Math.ceil((_r + 20) * Math.cos(_deg)),
						y: -Math.ceil((_r + 20) * Math.sin(_deg)),
						brushType: 'fill',
						color: "#fff",
						text: ' ￥' + nodes[i][__valueOn],
						textFont: 'normal 12px verdana',
						textAlign: 'start'
					},
					z: 100,
					highlightStyle: highlightStyleNone,
					onmouseover: function(e) {
						var _this = rect_curve[e.target._index];
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							var _curve = rect_curve[i];

							var _angle = e.target.angle;
							if(_angle * 180 / Math.PI > 135 && _angle * 180 / Math.PI < 225) {
								if(_curve["source"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.color;
									_curve.style.opacity = 0.6;
								}
							} else {
								if(_curve["target"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.rHoverColor;
									_curve.style.opacity = 0.6;
								}
							}

						}
						zr.render();
					},
					onmouseout: function(e) {
						var _this = rect_curve[e.target._index];
						for(var i = 0, len = rect_curve.length; i < len; i++) {
							var _curve = rect_curve[i];

							var _angle = e.target.angle;
							if(_angle * 180 / Math.PI > 135 && _angle * 180 / Math.PI < 225) {
								if(_curve["source"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.color;
									_curve.style.opacity = 0.2;
								}
							} else {
								if(_curve["target"] == _this["name"]) {
									//_curve.style.strokeColor = _curve.color;
									_curve.style.opacity = 0.2;
								}
							}
						}
						zr.render();
					},
				});
				g.addChild(rect_curve[g._children.length]);
			};
			/*x*/
			/*x*/
			//此处准备画曲线
			var curve = [],
				q = 0.7;
			for(var i = 0, len = links.length; i < len; i++) {
				var _curve = links[i];
				for(var j = 0, _len = nodes.length; j < _len; j++) {
					if(links[i]["source"] == nodes[j]["name"]) {
						var _link = links[i],
							_node = nodes[j],
							w = _node["w"] + _link["value"] * 0.5;
						nodes[j]["w"] += _link["value"];
						_curve._source = {
							"x": -_node["x"] - w * Math.sin(_node["angle"]),
							"y": _node["y"] + w * Math.cos(_node["angle"]),
							"angle": _node["angle"],
							"x1": -_node["x"] * (1 - q) - w * Math.cos(_node["angle"]),
							"y1": _node["y"] * (1 - q) + w * Math.sin(_node["angle"])
						}
					};
					if(links[i]["target"] == nodes[j]["name"]) {
						var _link = links[i],
							_node = nodes[j],
							tw = _node["tw"] + _link["value"] * 0.5;
						nodes[j]["tw"] += _link["value"];
						_curve._target = {
							"x": -_node["x"] + tw * Math.sin(_node["angle"]),
							"y": _node["y"] - tw * Math.cos(_node["angle"]),
							"angle": nodes[j]["angle"],
							"x1": -nodes[j]["x"] * (1 - q) + tw * Math.cos(nodes[j]["angle"]),
							"y1": nodes[j]["y"] * (1 - q) - tw * Math.sin(nodes[j]["angle"])
						}
					}
				};
				curve.push(_curve);

				rect_curve[g._children.length] = new BezierCurveShape({
					_index: g._children.length,
					source: _curve["source"],
					target: _curve["target"],
					type: 'curve',
					"value-limit": _curve["value-limit"],
					"valueToB": _curve["valueToB"],
					"valueOnB": _curve["valueOnB"],
					style: {
						xStart: _curve["_source"]["x"],
						yStart: _curve["_source"]["y"],
						cpX1: _curve["_source"]["x1"],
						cpY1: _curve["_source"]["y1"],
						cpX2: _curve["_target"]["x1"],
						cpY2: _curve["_target"]["y1"],
						xEnd: _curve["_target"]["x"],
						yEnd: _curve["_target"]["y"],
						strokeColor: _curve["color"],
						lineWidth: _curve["value"],
						opacity: 0.2,
					},
					color: _curve["color"],
					rHoverColor: _curve["rHoverColor"],
					hoverColor: _curve["hoverColor"],
					highlightStyle: highlightStyleNone,
					onmouseover: function(e) {
						var _this = rect_curve[e.target._index];
						//_this.style.strokeColor = _this.hoverColor;
						_this.style.opacity = 0.6;
						zr.render();
						$('#tk-box').css({
							'left': e.event.clientX,
							'top': e.event.clientY,
							'display': 'block'
						});
						$('#tk-h-liuchu,#tk-liuchu').html(_this.source);
						$('#tk-h-liuru,#tk-liuru').html(_this.target);
						$('#tk-jinge').html(_this["value-limit"]);
						$('#tk-liurubi').html(_this["valueOnB"]);
						$('#tk-liuchubi').html(_this["valueToB"]);
					},
					onmouseout: function(e) {
						var _this = rect_curve[e.target._index];
						//_this.style.strokeColor = _this.color;
						_this.style.opacity = 0.2;
						zr.render();
						$('#tk-box').css({
							'left': 0,
							'top': 0,
							'display': 'none'
						});
					}
				});
				g.addChild(rect_curve[g._children.length]);
			};
			/*x*/

			// 绘画
			zr.render();
		};
		//zrRender();
	});

	//setTimeout(function() {
	//	zrRender();
	//}, 30);
	/* */
	/* */
	//两城数据
	var xianshibi = 0.24; //显示比
	var chengshi_1 = {
		'name': '武汉',
		'gdp': 11912.68,
		'renkou': 1060.77,
		'mianji': 8494.41,
		'liuru': 1521.42,
		'liurubi': 61.23,
		'liuchu': 963.30,
		'liuchubi': 58.63,
	};
	var liuru_1 = [{
		'name': '南京',
		'value': '220'
	}, {
		'name': '长沙',
		'value': '108'
	}, {
		'name': '合肥',
		'value': '138'
	}, {
		'name': '南昌',
		'value': '178'
	}, {
		'name': '其他',
		'value': '78'
	}];
	var liuchu_1 = [{
		'name': '南京',
		'value': '78'
	}, {
		'name': '长沙',
		'value': '190'
	}, {
		'name': '合肥',
		'value': '118'
	}, {
		'name': '南昌',
		'value': '138'
	}, {
		'name': '其他',
		'value': '160'
	}];
	var chengshi_2 = {
		'name': '长沙',
		'gdp': 9323.72,
		'renkou': 743.18,
		'mianji': 11819,
		'liuru': 558.92,
		'liurubi': 53.57,
		'liuchu': 337.88,
		'liuchubi': 41.57,
	};
	var liuchu_2 = [{
		'name': '南京',
		'value': '58'
	}, {
		'name': '武汉',
		'value': '78'
	}, {
		'name': '其他',
		'value': '28'
	}];
	var liuru_2 = [{
		'name': '南京',
		'value': '68'
	}, {
		'name': '长沙',
		'value': '140'
	}, {
		'name': '合肥',
		'value': '120'
	}, {
		'name': '南昌',
		'value': '90'
	}, {
		'name': '其他',
		'value': '48'
	}];
	var line_1_v = 60,
		line_2_v = 30; //线的宽度

	if(chengshi_1.liuru * xianshibi > 150) {
		chengshi_1.liuruH = chengshi_1.liuru * xianshibi;
	} else {
		chengshi_1.liuruH = 150
	};
	if(chengshi_1.liuchu * xianshibi > 150) {
		chengshi_1.liuchuH = chengshi_1.liuchu * xianshibi;
	} else {
		chengshi_1.liuchuH = 150
	};
	//三城及以上数据
	var _nodes, _links;
	_nodes = [{
		"name": "武汉",
		"id": "1",
		"_valueTo": 936.30,
		"_valueOn": 1521.14,
		"gdp": 11912.68,
		"population": 1060.77,
		"valueTo": 88,
		"valueOn": 140,
	}, {
		"name": "长沙",
		"id": "2",
		"_valueTo": 337.88,
		"_valueOn": 558.92,
		"gdp": 9323.72,
		"population": 743.18,
		"valueTo": 32,
		"valueOn": 53,
	}, {
		"name": "合肥",
		"id": "3",
		"_valueTo": 562.19,
		"_valueOn": 437.48,
		"gdp": 6274.32,
		"population": 786.90,
		"valueTo": 65,
		"valueOn": 44,
	}, {
		"name": "南昌",
		"id": "4",
		"_valueTo": 823.54,
		"_valueOn": 1307.53,
		"gdp": 10503.02,
		"population": 827.03,
		"valueTo": 120,
		"valueOn": 80,
	}, {
		"name": "杭州",
		"id": "5",
		"_valueTo": 177.42,
		"_valueOn": 130.97,
		"gdp": 4000.01,
		"population": 530.29,
		"valueTo": 18,
		"valueOn": 21,
	}, {
		"name": "南京",
		"id": "6",
		"_valueTo": 1078.53,
		"_valueOn": 979.78,
		"gdp": 11050.49,
		"population": 901.81,
		"valueTo": 100,
		"valueOn": 90,
	}];
	_links = [{
			"id": "1",
			"name": null,
			"source": "武汉",
			"target": "长沙",
			"value": 6,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "2",
			"name": null,
			"source": "武汉",
			"target": "合肥",
			"value": 8,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "3",
			"name": null,
			"source": "武汉",
			"target": "南昌",
			"value": 10,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "4",
			"name": null,
			"source": "武汉",
			"target": "杭州",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "4",
			"name": null,
			"source": "武汉",
			"target": "南京",
			"value": 6,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "5",
			"name": null,
			"source": "长沙",
			"target": "合肥",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "6",
			"name": null,
			"source": "长沙",
			"target": "南昌",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "7",
			"name": null,
			"source": "长沙",
			"target": "杭州",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "8",
			"name": null,
			"source": "长沙",
			"target": "南京",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "9",
			"name": null,
			"source": "长沙",
			"target": "武汉",
			"value": 12,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "10",
			"name": null,
			"source": "合肥",
			"target": "南昌",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "11",
			"name": null,
			"source": "合肥",
			"target": "杭州",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "12",
			"name": null,
			"source": "合肥",
			"target": "南京",
			"value": 4,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "13",
			"name": null,
			"source": "合肥",
			"target": "武汉",
			"value": 8,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "14",
			"name": null,
			"source": "合肥",
			"target": "长沙",
			"value": 4,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "15",
			"name": null,
			"source": "南昌",
			"target": "杭州",
			"value": 4,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "16",
			"name": null,
			"source": "南昌",
			"target": "杭州",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "17",
			"name": null,
			"source": "南昌",
			"target": "南京",
			"value": 24,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "18",
			"name": null,
			"source": "南昌",
			"target": "武汉",
			"value": 36,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "19",
			"name": null,
			"source": "南昌",
			"target": "长沙",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "20",
			"name": null,
			"source": "南昌",
			"target": "合肥",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "21",
			"name": null,
			"source": "杭州",
			"target": "南京",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "22",
			"name": null,
			"source": "杭州",
			"target": "武汉",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "25",
			"name": null,
			"source": "杭州",
			"target": "长沙",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "26",
			"name": null,
			"source": "杭州",
			"target": "合肥",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "27",
			"name": null,
			"source": "杭州",
			"target": "南昌",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "28",
			"name": null,
			"source": "南京",
			"target": "武汉",
			"value": 20,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "29",
			"name": null,
			"source": "南京",
			"target": "长沙",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "30",
			"name": null,
			"source": "南京",
			"target": "合肥",
			"value": 13,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "31",
			"name": null,
			"source": "南京",
			"target": "南昌",
			"value": 16,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
		{
			"id": "32",
			"name": null,
			"source": "南京",
			"target": "杭州",
			"value": 2,
			"value-limit": 60,
			"valueToB": 20,
			"valueOnB": 30
		},
	];
	var nodes = _nodes,
		links = _links;

	//两城函数调用
	var _data = [{
		"liuchu": 32667,
		"gdp": 1000,
		"import": [{
			"name": "江岸区",
			"value": 8971
		}],
		"liurubi": "21.55",
		"liuchubi": "78.45",
		"name": "武昌区",
		"liuru": 8971,
		"renkou": 1000,
		"mianji": 1000,
		"export": [{
			"name": "江岸区",
			"value": 32667
		}]
	}, {
		"liuchu": 8971,
		"gdp": 1000,
		"import": [{
			"name": "武昌区",
			"value": 32667
		}],
		"liurubi": "78.45",
		"liuchubi": "21.55",
		"name": "江岸区",
		"liuru": 32667,
		"renkou": 1000,
		"mianji": 1000,
		"export": [{
			"name": "武昌区",
			"value": 8971
		}]
	}] = JSON.parse($('#data').val());

	chengshi_1 = _data[1];
	chengshi_2 = _data[1];

	twocityFn();

	//两城鼠标移入移出
	$('#Line-19-s,#Import,#Export-2').mouseover(function() {
		$('#Line-19-x').attr('class', 'active');
	}).mouseout(function() {
		$('#Line-19-x').attr('class', '');
	});
	$('#Line-20-s,#Export,#Import-2').mouseover(function() {
		$('#Line-20-x').attr('class', 'active');
	}).mouseout(function() {
		$('#Line-20-x').attr('class', '');
	});

	$('#Line-19-s').mouseover(function(e) {
		$('#tk-box').css({
			'left': e.clientX,
			'top': e.clientY,
			'display': 'block'
		});
		$('#tk-h-liuchu,#tk-liuchu').html("长沙");
		$('#tk-h-liuru,#tk-liuru').html("武汉");
		$('#tk-jinge').html(70);
		$('#tk-liurubi').html(20);
		$('#tk-liuchubi').html(10);
	}).mouseout(function(e) {
		$('#tk-box').css({
			'left': 0,
			'top': 0,
			'display': 'none'
		});
	});
	$('#Line-20-s').mouseover(function(e) {
		$('#tk-box').css({
			'left': e.clientX,
			'top': e.clientY,
			'display': 'block'
		});
		$('#tk-h-liuchu,#tk-liuchu').html("武汉");
		$('#tk-h-liuru,#tk-liuru').html("长沙");
		$('#tk-jinge').html(70);
		$('#tk-liurubi').html(20);
		$('#tk-liuchubi').html(10);
	}).mouseout(function(e) {
		$('#tk-box').css({
			'left': 0,
			'top': 0,
			'display': 'none'
		});
	});

	//
	$('.year-div div').click(function() {
		$('.year-div div').removeClass('active');
		$(this).addClass('active');
	});
	var playPauseT;
	$('.play-pause').click(function() {
		$(this).toggleClass('on');
		clearInterval(playPauseT);
		if($(this).is('.on')) {
			playPauseT = setInterval(function() {
				if(!$('.year-div div.active').next().is('a')) {
					$('.year-div div.active').next().click();
				} else {
					$('.year-div div').eq(0).click();
				}
			}, 1000);
		}
	});

	$('.display-indicators').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

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

	$('.screening-condition-1 .ption-div-p').click(function() {
		$(this).next('.ption-div-d').slideDown().siblings('.ption-div-d').slideUp();
	});

	$('.add-1').click(function() {
		$(this).siblings('.nav-add-div').slideToggle();
	});

	var scBl = true;
	$('.screening-condition').blur(function() {
		var _this = $(this);
		_this.find('.nav-add-div').slideUp();
		//		setTimeout(function() {
		//			if(scBl) {
		//				_this.find('.nav-add-div').slideUp();
		//			}
		//		}, 30);
	});

	//	$(document).on('focus', '.city .mCustomScrollBox', function() {
	//		scBl = false;
	//		var _thisP = $(this).parents('.screening-condition');
	//		setTimeout(function() {
	//			_thisP.focus();
	//			scBl = true;
	//		}, 30);
	//	});

	$('.region p').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.city-div').eq($(this).index()).css('display', 'block').siblings().css('display', 'none')
	});

	/*没有传数据*/
	$('.nav-add-div-3 .factors-1').click(function() {
		var _class = $(this).attr('class');
		if(!$('.factors-content li').hasClass(_class)) {
			$('.factors-content ul').append('<li class="rise factors-1"> <span>GDP</span> <span>亿元</span> <span>15%</span> <a></a> </li>');
		}
	});
	$('.nav-add-div-3 .factors-2').click(function() {
		var _class = $(this).attr('class');
		if(!$('.factors-content li').hasClass(_class)) {
			$('.factors-content ul').append('<li class="fall factors-2"> <span>人口</span> <span>万人</span> <span>8%</span> <a></a> </li>');
		}
	});
	$('.nav-add-div-3 .factors-3').click(function() {
		var _class = $(this).attr('class');
		if(!$('.factors-content li').hasClass(_class)) {
			$('.factors-content ul').append('<li class="flat factors-3"> <span>从业人数</span> <span>万人</span> <span>34%</span> <a></a> </li>');
		}
	});
	$('.nav-add-div-3 .factors-4').click(function() {
		var _class = $(this).attr('class');
		if(!$('.factors-content li').hasClass(_class)) {
			$('.factors-content ul').append('<li class="flat factors-4"> <span>平均工资</span> <span>万人</span> <span>28%</span> <a></a> </li>');
		}
	});
	$(document).on('click', '.factors-content li a', function() {
		$(this).parent().remove();
	});
	/**/
	$(document).on('click', '.checked-city a', function() {
		$(this).toggleClass('active');
	});
	$(document).on('click', '.checked-city a i', function() {
		$(this).parent().remove();
		checkedCityRender();
	});

	$('.ption-all').click(function() {
		$('.checked-city a').addClass('active');
	});
	$('.ption-all-not').click(function() {
		$('.checked-city a').removeClass('active');
	});

	$('.ption-all-not').click(function() {
		$('.checked-city a').removeClass('active');
	});

	$('.delete-ption').click(function() {
		$('.checked-city .active').remove();
		checkedCityRender();
	});

	$('.delete-all').click(function() {
		$('.checked-city a').remove();
		checkedCityRender();
	});

	$('.city-div p').click(function() {
		var _pBl = true,
			_text = $(this).text();
		$('.checked-city a').each(function() {
			if($(this).text() == _text) {
				_pBl = false;
				return false;
			}
		});
		var _pClass = "";
		switch(_text) {
			case '武汉':
				_pClass = 'a-wuhan';
				break;
			case '长沙':
				_pClass = 'a-changsha';
				break;
			case '合肥':
				_pClass = 'a-hefei';
				break;
			case '南昌':
				_pClass = 'a-nanchang';
				break;
			default:
				break;
		};
		if(_pBl) {
			$('.checked-city').append('<a class="' + _pClass + '">' + _text + '<i></i></a>');
			checkedCityRender();
		};
	});

	$('.hide-1').click(function() {
		$(this).toggleClass('active');
		$('.main-wrap,.content-right').toggleClass('active');
	});

	$('.preserve').click(function() {
		$('.tanchuang').css('display', 'block');
	});
	$('.tanchuang-close').click(function() {
		$('.tanchuang').css('display', 'none');
	});

	var checkedCityRender = function() {
		if($('.checked-city a').size() <= 2) {
			$('#main').css('display', 'none');
			$('#main-2').css('display', 'block');
			twocityFn();
		} else {
			$('#main').css('display', 'block');
			$('#main-2').css('display', 'none');
			if($('.checked-city a').size() <= 6) {
				_size = $('.checked-city a').size();
			} else {
				_size = 6;
			}
			nodeslinksFn(_nodes, _links, _size);
			zr.clear();
			zrRender();
		}
	}
});