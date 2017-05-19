// JavaScript Document
$(function() {
	$('.analysis-nav a').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.section-right a').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	//svg绘制
	var svg = d3.select("#svg-main"),
		width = +svg.attr("width"),
		height = +svg.attr("height"),
		reminder = d3.select("#reminder");

	var data, nodes, node, types;

	//加载数据
	$.ajax({
		type: "GET",
		url: "js/flare.json",
		success: function(msg) {
			if($.type(msg) == 'object') {
				msg = msg;
			} else {
				msg = $.parseJSON(msg);
			}
			data = msg.data;
			types = msg.types;
			for(var i = 0, len = data.length; i < len; i++) {
				data[i]['r'] = Math.sqrt(data[i]['value']) / 1.5 * 0.4 + 2;
				var riseRatio = parseFloat(data[i]['riseRatio']);
				if(riseRatio < -50) {
					data[i]['color'] = '#ffcd38';
				}
				if(riseRatio >= -50) {
					data[i]['color'] = '#ffe869';
				}
				if(riseRatio >= 0) {
					data[i]['color'] = '#d7fbe8';
				}
				if(riseRatio >= 50) {
					data[i]['color'] = '#9df3c4';
				}
				if(riseRatio >= 100) {
					data[i]['color'] = '#62d2a2';
				}
				if(riseRatio >= 200) {
					data[i]['color'] = '#1fab89';
				}
			};
			nodes = data;
			initFn(nodes);

		},
		error: function(XMLHttpRequest, textStatus) {
			alert("错误信息: " + textStatus);
		}
	});
	var simulation,
		initFn = function(nodes) {
			if(node) {
				node.remove();
			};
			simulation = d3.forceSimulation(nodes)
				.velocityDecay(0.2)
				.force("x", d3.forceX().strength(0.015))
				.force("y", d3.forceY().strength(0.010))
				.force("collide", d3.forceCollide().radius(function(d) {
					return d.r + 0.5;
				}).iterations(2))
				.on("tick", ticked);
			for(var i = 0, len = nodes.length; i < len; i++) {
				var riseRatio = parseFloat(nodes[i]['riseRatio']);
				nodes[i].y = riseRatio * -4;
			}

			node = svg.selectAll(".node")
				.data(data)
				.enter().append("circle")
				.attr("id", function(d) {
					return d['id'];
				})
				.attr("cx", function(d) {
					return d.x + 700;
				})
				.attr("cy", function(d) {
					return d.y + 480;
				})
				.attr("r", function(d) {
					return d.r;
				})
				.style("fill", function(d) {
					return d.color;
				})
				.on("mouseover", function(d) {
					reminder.attr('transform', 'translate(' + (parseInt(this.getAttribute('cx')) + parseInt(this.getAttribute('r')) - 10) + ' ' + (parseInt(this.getAttribute('cy')) - 80) + ')').attr('class', 'active');
					document.getElementById('reminder-1').innerHTML = types[d['class']];
					document.getElementById('reminder-2').innerHTML = d['id'];
					document.getElementById('reminder-3').innerHTML = d['value'] + " 户";
					document.getElementById('reminder-4').innerHTML = d['riseRatio'];
				})
				.on("mouseout", function(d) {
					reminder.attr('class', '');
				});

			document.getElementById('svg-main').appendChild(document.getElementById('reminder'));

			function ticked() {
				node.attr("cx", function(d) {
						return d.x + 700;
					})
					.attr("cy", function(d) {
						return d.y + 480;
					});
			};
		};
	var simulationP;
	$('#involving-enterprises').click(function() {
		if(simulation) {
			simulation.stop();
		};
		if(simulationP) {
			simulationP.stop();
		};
		if(simulationC_5) {
			simulationC_5.stop();
		};
		line_s.style("display", "none");
		name_s.style("display", "none");
		bg_3.style("display", "none");
		$('.section-main').addClass('active');

		simulationP = d3.forceSimulation(nodes)
			.velocityDecay(0.2)
			.force("x", d3.forceX().strength(0.015))
			.force("y", d3.forceY().strength(0.010))
			.force("collide", d3.forceCollide().radius(function(d) {
				return d.r + 0.5;
			}).iterations(2))
			.on("tick", ticked);
		for(var i = 0, len = nodes.length; i < len; i++) {
			var riseRatio = parseFloat(nodes[i]['riseRatio']);
			nodes[i].y = riseRatio * -4;
		}

		node.attr("cx", function(d) {
				return d.x + 700;
			})
			.attr("cy", function(d) {
				return d.y + 480;
			});

		function ticked() {
			node.attr("cx", function(d) {
					return d.x + 700;
				})
				.attr("cy", function(d) {
					return d.y + 480;
				});
		};

	});

	var simulationC_5,
		line_s = svg.selectAll('.line-1'),
		name_s = d3.select('#Name').selectAll('g');

	line_s.style("display", "none");
	name_s.style("display", "none");

	$('#industry-categories').click(function() {
		if(simulation) {
			simulation.stop();
		};
		if(simulationP) {
			simulationP.stop();
		};
		if(simulationC_5) {
			simulationC_5.stop();
		};
		line_s.style("display", "none");
		name_s.style("display", "none");
		bg_3.style("display", "none");
		$('.section-main').removeClass('active');
		$('#svg-main').attr('class', 'active');
		setTimeout(function() {
			$('#svg-main').attr('class', '');
		}, 200);
		var nodesC1 = [],
			nodesC2 = [],
			nodesC3 = [],
			nodesC4 = [],
			nodesC5 = [],
			nodesC1_i = [],
			nodesC2_i = [],
			nodesC3_i = [],
			nodesC4_i = [],
			nodesC5_i = [];
		for(var i = 0, len = nodes.length; i < len; i++) {
			if(nodes[i]['class'] == "agriculture") {
				nodesC1.push(nodes[i]);
				nodesC1_i.push(i);
			};
			if(nodes[i]['class'] == "animalHusbandry") {
				nodesC2.push(nodes[i]);
				nodesC2_i.push(i);
			};
			if(nodes[i]['class'] == "forestry") {
				nodesC3.push(nodes[i]);
				nodesC3_i.push(i);
			};
			if(nodes[i]['class'] == "fishery") {
				nodesC4.push(nodes[i]);
				nodesC4_i.push(i);
			};
			if(nodes[i]['class'] == "serviceIndustry") {
				nodesC5.push(nodes[i]);
				nodesC5_i.push(i);
			};

		}

		var simulationC_1 = d3.forceSimulation(nodesC1)
			.velocityDecay(0.6)
			.force("x", d3.forceX().strength(0.08))
			.force("y", d3.forceY().strength(0.04))
			.force("collide", d3.forceCollide().radius(function(d) {
				return d.r + 0.5;
			}).iterations(1));

		var simulationC_2 = d3.forceSimulation(nodesC2)
			.velocityDecay(0.6)
			.force("x", d3.forceX().strength(0.08))
			.force("y", d3.forceY().strength(0.04))
			.force("collide", d3.forceCollide().radius(function(d) {
				return d.r + 0.5;
			}).iterations(2));

		var simulationC_3 = d3.forceSimulation(nodesC3)
			.velocityDecay(0.6)
			.force("x", d3.forceX().strength(0.08))
			.force("y", d3.forceY().strength(0.04))
			.force("collide", d3.forceCollide().radius(function(d) {
				return d.r + 0.5;
			}).iterations(2));

		var simulationC_4 = d3.forceSimulation(nodesC4)
			.velocityDecay(0.6)
			.force("x", d3.forceX().strength(0.08))
			.force("y", d3.forceY().strength(0.04))
			.force("collide", d3.forceCollide().radius(function(d) {
				return d.r + 0.5;
			}).iterations(2));
		simulationC_5 = d3.forceSimulation(nodesC5)
			.velocityDecay(0.6)
			.force("x", d3.forceX().strength(0.08))
			.force("y", d3.forceY().strength(0.04))
			.force("collide", d3.forceCollide().radius(function(d) {
				return d.r + 0.5;
			}).iterations(2))
			.on("tick", tickedC);

		node.attr("cx", function(d) {
				if(d['class'] == "agriculture") {
					return d.x + 233;
				};
				if(d['class'] == "animalHusbandry") {
					return d.x + 233 * 2;
				};
				if(d['class'] == "forestry") {
					return d.x + 233 * 3;
				};
				if(d['class'] == "fishery") {
					return d.x + 233 * 4;
				};
				if(d['class'] == "serviceIndustry") {
					return d.x + 233 * 5;
				};
			})
			.attr("cy", function(d) {
				return d.y + 400;
			});

		line_s.attr("transform", function(d, i) {
				return 'translate(' + 233 * (1.5 + i) + ' 100)';
			})
			.style("display", "block");

		name_s.attr("transform", function(d, i) {
				return 'translate(' + 233 * (1 + i) + ' 100)';
			})
			.style("display", "block");
		

		function tickedC() {
			node.attr("cx", function(d) {
					if(d['class'] == "agriculture") {
						return d.x + 233;
					};
					if(d['class'] == "animalHusbandry") {
						return d.x + 466;
					};
					if(d['class'] == "forestry") {
						return d.x + 699;
					};
					if(d['class'] == "fishery") {
						return d.x + 932;
					};
					if(d['class'] == "serviceIndustry") {
						return d.x + 1165;
					};
				})
				.attr("cy", function(d) {
					return d.y + 400;
				});
		};
	});

	//随机分为14份
	var bg_3 = d3.select('#bg-3');
	bg_3.style("display", "none");

	$('#industry-changes').click(function() {
		if(simulation) {
			simulation.stop();
		};
		if(simulationP) {
			simulationP.stop();
		};
		if(simulationC_5) {
			simulationC_5.stop();
		};
		line_s.style("display", "none");
		name_s.style("display", "none");
		bg_3.style("display", "block");
		$('.section-main').removeClass('active');
		$('#svg-main').attr('class', 'active');
		setTimeout(function() {
			$('#svg-main').attr('class', '');
		}, 200);
		node.attr("cx", function(d) {

				return 200 + Math.ceil(Math.random() * 16 - 1) * 70;
			})
			.attr("cy", function(d) {
				var riseRatio = parseFloat(d['riseRatio']);
				return 400 - 1.6 * riseRatio;
			});
	});

});