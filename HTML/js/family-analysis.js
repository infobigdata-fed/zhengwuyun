// JavaScript Document
$(function() {
	var data;

	var svg = d3.select("svg"),
		width = +$("svg").width(),
		height = +$("svg").height(),
		g = svg.append("g").attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

	var tree = d3.tree()
		.size([360, 270])
		.separation(function(a, b) {
			return(a.parent == b.parent ? 1 : 2) / a.depth;
		});
	d3.json("js/flare-2.json", function(error, msg) {
		if(error) throw error;
		data = msg;
		var arrO = [1, 2, 3, 4, 5, 6, 7];
		drawFn([1, 2, 3, 4, 5, 6, 7]);
	});

	drawFn = function(arrO) {
		var _data = JSON.parse(JSON.stringify(data));
		for(var i = _data.children.length - 1; i >= 0; i--) {
			var _bn = true;
			for(var j = 0, len = arrO.length; j < len; j++) {
				if(_data.children[i].type == arrO[j]) _bn = false;
			}
			if(_bn) {
				_data.children.splice(i, 1)
			}
		}

		g.remove();
		g = svg.append("g").attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
		var root = tree(d3.hierarchy(_data));
		var link = g.selectAll(".link")
			.data(root.descendants().slice(1))
			.enter().append("path")
			.attr("class", "link")
			.attr("d", function(d) {
				return "M" + project(d.x, d.y) +
					"C" + project(d.x, (d.y + d.parent.y) / 2) +
					" " + project(d.parent.x, (d.y + d.parent.y) / 2) +
					" " + project(d.parent.x, d.parent.y);
			})
			.style('stroke', function(d) {
				var _type = d.data.type ? d.data.type : d.parent.data.type;
				if(_type == 1) {
					return 'rgb(119, 138, 230)'
				}
				if(_type == 2) {
					return 'rgb(145, 220, 138)'
				}
				if(_type == 3) {
					return 'rgb(180, 107, 197)'
				}
				if(_type == 4) {
					return 'rgb(237, 166, 29)'
				}
				if(_type == 5) {
					return 'rgb(54, 190, 131)'
				}
				if(_type == 6) {
					return 'rgb(195, 212, 27)'
				}
				if(_type == 7) {
					return 'rgb(76, 209, 225)'
				}
				if(_type == -1) {
					return 'rgb(252, 57, 57)'
				}
				if(_type == -2) {
					return 'rgb(220, 220, 220)'
				}
				return 'rgb(252, 57, 57)';
			});

		var node = g.selectAll(".node")
			.data(root.descendants())
			.enter().append("g")
			.attr("class", function(d) {
				return "new-network-click";
			})
			.attr("transform", function(d) {
				return "translate(" + project(d.x, d.y) + ")";
			});

		node.append("circle")
			.attr("r", function(d) {
				return 10 - 1.5 * d.depth;
			})
			.attr('class', function(d) {
				if(d.data.type >= 0) {
					return 'new-network-node-twinkle'
				}
				return ''
			})
			.style('stroke', function(d) {
				var _type = (d.data.type != undefined) ? d.data.type : d.parent.data.type;
				if(_type == 0) {
					return 'rgb(36, 166, 218)'
				}
				if(_type == 1) {
					return 'rgb(119, 138, 230)'
				}
				if(_type == 2) {
					return 'rgb(145, 220, 138)'
				}
				if(_type == 3) {
					return 'rgb(180, 107, 197)'
				}
				if(_type == 4) {
					return 'rgb(237, 166, 29)'
				}
				if(_type == 5) {
					return 'rgb(54, 190, 131)'
				}
				if(_type == 6) {
					return 'rgb(195, 212, 27)'
				}
				if(_type == 7) {
					return 'rgb(76, 209, 225)'
				}
				if(_type == -1) {
					return 'rgb(252, 57, 57)'
				}
				if(_type == -2) {
					return 'rgb(220, 220, 220)'
				}
				return 'rgb(252, 57, 57)';
			})
			.style('fill', function(d) {
				var _type = (d.data.type != undefined) ? d.data.type : d.parent.data.type;
				if(_type == 0) {
					return 'rgb(36, 166, 218)'
				}
				if(_type == 1) {
					return 'rgb(119, 138, 230)'
				}
				if(_type == 2) {
					return 'rgb(145, 220, 138)'
				}
				if(_type == 3) {
					return 'rgb(180, 107, 197)'
				}
				if(_type == 4) {
					return 'rgb(237, 166, 29)'
				}
				if(_type == 5) {
					return 'rgb(54, 190, 131)'
				}
				if(_type == 6) {
					return 'rgb(195, 212, 27)'
				}
				if(_type == 7) {
					return 'rgb(76, 209, 225)'
				}
				if(_type == -1) {
					return 'rgb(252, 57, 57)'
				}
				if(_type == -2) {
					return 'rgb(220, 220, 220)'
				}
				return 'rgb(252, 57, 57)';
			});

		node.append("text")
			.attr("dy", ".31em")
			.attr("x", function(d) {
				return d.x < 180 === !d.children ? 12 : -12;
			})
			.style("text-anchor", function(d) {
				return d.x < 180 === !d.children ? "start" : "end";
			})
			.attr("transform", function(d) {
				return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
			})
			.text(function(d) {
				return d.data.name;
			});
	};

	function project(x, y) {
		var angle = (x - 90) / 180 * Math.PI,
			radius = y;
		return [radius * Math.cos(angle), radius * Math.sin(angle)];
	}
	/**/
	/**/

	loadsize();

	function loadsize() {
		var winW = document.documentElement.clientWidth;
		var winH = document.documentElement.clientHeight;
		var transformval = "scale(" + winH / 1080 + ")";
		$('.gxt_svg').css("transform", transformval);
		width = $("svg").width();
		height = $("svg").height();
		g.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
	}
	$(window).resize(function() {
		loadsize();
	});

	$('.new-network-swipe-arrow').click(function() {
		$('.new-network-data-section').toggleClass('divDataSection-transform')
	});
	$('.new-network-filter-item').click(function() {
		$(this).find('.new-network-filter-item-checkbox').toggleClass('unchecked').toggleClass('checked');
		var _arr = [];
		$('.new-network-filter-item').each(function(i) {
			if($(this).find('.new-network-filter-item-checkbox').is(".checked")) {
				_arr.push($(this).index() + 1);
			}
		});
		drawFn(_arr);
	});
	$('.new-network-right-summary-header').click(function() {
		$('.new-network-right-summary-header').not(this).siblings().hide();
		$(this).siblings().toggle();

	});
	$('.gxt_svg').move(function() {
		$('.gxt_svg').css({
			'left': '+=' + this.pageXc,
			'top': '+=' + this.pageYc
		});
	});
	var gxt_svgScale = 1;
	$('.gxt_svg').mousewheel(function() {
		if(this.Down) {
			gxt_svgScale += 0.05;
			$(this).css('transform', 'scale(' + gxt_svgScale + ')');
		} else {
			gxt_svgScale -= 0.05;
			$(this).css('transform', 'scale(' + gxt_svgScale + ')');
		}
	});

});