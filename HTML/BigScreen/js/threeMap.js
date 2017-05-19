var MeshColor = 0xff0000;
$(function() {
	var camera, scene, renderer, controls, directionalLight, plane, ligatureFn;
	//创建连线
	var closedSpline, extrudeSettings, shape, geometry, material;

	ligature = [];

	init();
	animate();

	function init() {
		//绘制对象(绘图区)
		renderer = new THREE.WebGLRenderer({
			//抗锯齿
			antialias: true,
			//设置透明第一步
			alpha: true
		});

		//绘制区清屏
		renderer.setClearColor(0x24262c);
		//设置透明第二步
		renderer.setClearAlpha(0.0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);

		//创建3D场景
		scene = new THREE.Scene();

		//绘制平面
		//平面尺寸
		var Png2Texture = new THREE.TextureLoader().load("./img/transparent.png");
		var planeGeometry = new THREE.PlaneGeometry(1600, 1600); //平面材质
		var planeMaterial = new THREE.MeshBasicMaterial({
			map: Png2Texture,
			color: 0xffffff,
			transparent: true
			//使用线框wireframe: true
		});
		//尺寸与材质合成平面
		plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.position.set(0, 100, 0);
		plane.rotation.set(0, 0, 0);
		scene.add(plane);

		//坐标轴
		//scene.add(new THREE.AxisHelper(400));

		//加载图片
		var Png1Texture = new THREE.TextureLoader().load("./img/mapAll.png");
		var bumpMapTexture = new THREE.TextureLoader().load("./img/bumpMap.png");
		var meshGeometry = new THREE.PlaneGeometry(1600, 1600);
		var meshMaterial = new THREE.MeshPhongMaterial({
			map: Png1Texture,
			color: 0xffffff,
			transparent: true,
			bumpMap: bumpMapTexture,
			bumpScale: 4
		});
		var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
		mesh.position.set(12, -5, 1);
		//将地图1插入场景
		plane.add(mesh);

		//插入地图2
		var points = mapAll;
		var mesh2 = new THREE.Mesh(svg2_5D(points, 40), new THREE.MeshPhongMaterial({
			color: 0x36405f,
			wireframe: false
		}));

		mesh2.rotation.set(Math.PI, 0, 0);
		mesh2.position.set(-800, 800, 0);
		mesh2.scale.set(1, 1, 1);

		var points2 = mapAll2;
		var mesh2_2 = new THREE.Mesh(svg2_5D(points2, 40), new THREE.MeshBasicMaterial({
			color: 0x36405f,
			wireframe: false
		}));

		mesh2_2.rotation.set(Math.PI, 0, 0);
		mesh2_2.position.set(-800, 800, 0);
		mesh2_2.scale.set(1, 1, 1);

		var points3 = mapAll3;
		var mesh2_3 = new THREE.Mesh(svg2_5D(points3, 40), new THREE.MeshBasicMaterial({
			color: 0x36405f,
			wireframe: false
		}));

		mesh2_3.rotation.set(Math.PI, 0, 0);
		mesh2_3.position.set(-800, 800, 0);
		mesh2_3.scale.set(1, 1, 1);

		var points4 = mapAll4;
		var mesh2_4 = new THREE.Mesh(svg2_5D(points4, 40), new THREE.MeshBasicMaterial({
			color: 0x36405f,
			wireframe: false
		}));

		mesh2_4.rotation.set(Math.PI, 0, 0);
		mesh2_4.position.set(-800, 800, 0);
		mesh2_4.scale.set(1, 1, 1);

		//将地图2插入场景
		plane.add(mesh2);
		plane.add(mesh2_2);
		plane.add(mesh2_3);
		plane.add(mesh2_4);

		/*//绘制文字
		function fontFn(Text) {
			var canvas = document.createElement('canvas');
			canvas.width = 256;
			canvas.height = 128;
			var ctx = canvas.getContext('2d');
			ctx.fillStyle = "#ffffff";
			ctx.font = "normal bold 128px microsoft yahei";
			ctx.fillText(Text, 0, 110);
			return canvas;
		}

		//绘制文字
		var sign3Geometry = new THREE.PlaneGeometry(256, 128);
		//加载canvas贴图
		var textQu = new THREE.Texture(fontFn('武汉'));
		//加载canvas贴图后处理为纹理(贴图);
		textQu.needsUpdate = true;

		var sign3Material = new THREE.MeshBasicMaterial({
			map: textQu,
			color: 0xffffff,
			transparent: true,
			side: THREE.DoubleSide,
		});
		var sign3 = new THREE.Mesh(sign3Geometry, sign3Material);
		sign3.position.set(0, 0, 6);
		sign3.scale.set(0.3,0.3,0.3);
		plane.add(sign3);*/

		//绘制圆
		var geometry = new THREE.CircleGeometry(12, 32);
		var material = new THREE.MeshBasicMaterial({
			color: 0xff0000
		});
		circle_1 = new THREE.Mesh(geometry, material);
		circle_1.position.set(198, 226, 2);
		plane.add(circle_1);
		circle_2 = new THREE.Mesh(geometry, material);
		circle_2.position.set(-90, 44, 2);
		plane.add(circle_2);
		circle_3 = new THREE.Mesh(geometry, material);
		circle_3.position.set(82, -178, 2);
		plane.add(circle_3);
		circle_4 = new THREE.Mesh(geometry, material);
		circle_4.position.set(-216, -262, 2);
		plane.add(circle_4);

		//创建影子
		var Png3Texture = new THREE.TextureLoader().load("./img/shadow.png");
		var shadowGeometry = new THREE.PlaneGeometry(1600, 1600); //平面材质
		var shadowMaterial = new THREE.MeshBasicMaterial({
			map: Png3Texture,
			color: 0xffffff,
			transparent: true
			//使用线框wireframe: true
		});
		//尺寸与材质合成平面
		shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
		shadow.position.set(0, 0, -200);
		shadow.rotation.set(0, 0, 0);
		plane.add(shadow);

		//创建圆环
		var circleRadius = 20;
		var trackShape = new THREE.Shape();
		trackShape.absarc(0, 0, circleRadius, 0, 2.1 * Math.PI, true);
		trackShape.lineTo(circleRadius + 1, 0);
		trackShape.absarc(0, 0, circleRadius + 1, 0, 0.3 * Math.PI, true);
		trackShape.absarc(0, 0, circleRadius + 2, 0.3 * Math.PI, 0, true);
		var rectGeom = new THREE.ShapeGeometry(trackShape);
		flashSpot1 = new THREE.Line(rectGeom, new THREE.LineBasicMaterial({
			color: MeshColor,
			linewidth: 1
		}));
		flashSpot1.position.set(196, 226, 2);
		flashSpot1.rotation.set(0, 0, 0);
		plane.add(flashSpot1);

		var circleRadius = 30;
		var trackShape = new THREE.Shape();
		trackShape.absarc(0, 0, circleRadius, 0, 2.1 * Math.PI, true);
		trackShape.lineTo(circleRadius + 1, 0);
		trackShape.absarc(0, 0, circleRadius + 1, 0, 0.3 * Math.PI, true);
		trackShape.absarc(0, 0, circleRadius + 2, 0.3 * Math.PI, 0, true);
		var rectGeom = new THREE.ShapeGeometry(trackShape);
		flashSpot2 = new THREE.Line(rectGeom, new THREE.LineBasicMaterial({
			color: MeshColor,
			linewidth: 1
		}));
		flashSpot2.position.set(196, 226, 2);
		flashSpot2.rotation.set(0, 0, 0);
		plane.add(flashSpot2);

		//透视相机
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
		camera.position.set(-22.7, -1550, 1265);
		camera.lookAt(scene.position);

		//创建环境光
		var ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
		scene.add(ambientLight);

		//创建平行光
		directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
		directionalLight.position.set(0, 0, 1);
		scene.add(directionalLight);

		//创建光源
		var spotLight = new THREE.SpotLight(0xffffff, 1.4);
		spotLight.position.set(0, 940, 400);
		scene.add(spotLight);

		//将绘制区加入页面
		document.body.appendChild(renderer.domElement);

		controls = new THREE.TrackballControls(camera, renderer.domElement);
		controls.minDistance = 200;
		controls.maxDistance = 4000;
	}

	window.addEventListener('resize', onWindowResize, false);

	function onWindowResize() {
		renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
	}

	/*连线*/
	ligatureFn = function(originI, endpointI, value, iv0, iv, index) {

		function yFn(x, xy1, xy2) {
			var x1 = xy1[0],
				y1 = xy1[1],
				x2 = xy2[0],
				y2 = xy2[1];
			var y = ((y1 - y2) / (x1 - x2)) * x + (x1 * y2 - x2 * y1) / (x1 - x2);
			return y;
		}

		function kFn(x, y, xy1) {
			var x1 = xy1[0],
				y1 = xy1[1];
			var k = Math.sqrt((y - y1) * (y - y1) + (x - x1) * (x - x1));
			return k;
		}

		function zFn(k, xy1, xy2) {
			var x1 = xy1[0],
				y1 = xy1[1],
				x2 = xy2[0],
				y2 = xy2[1],
				a = -0.004,
				k1 = 0,
				k2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			var x1 = k1,
				y1 = -1,
				x2 = k2,
				y2 = -1,
				x3 = (x1 + x2) / 3,
				y3 = 210;
			var a = -((x1 - x2) * (y3 - y1) - (x3 - x1) * (y1 - y2)) / ((x1 - x2) * (x2 - x3) * (x3 - x1)),
				b = (y1 - y2 - a * (x1 * x1 - x2 * x2)) / (x1 - x2),
				c = y1 - a * x1 * x1 - b * x1;
			var z = a * k * k + b * k + c;
			return z;
		}

		var xy1 = point[originI],
			xy2 = point[endpointI];
		var x, y, z, k;
		xv = (xy2[0] - xy1[0]) / 30;
		Vector3Arr = [];
		for(var i = iv0; i <= iv; i++) {
			x = xy1[0] + xv * i;
			y = yFn(x, xy1, xy2);
			k = kFn(x, y, xy1);
			z = zFn(k, xy1, xy2);
			Vector3Arr.push(new THREE.Vector3(x, y, z));
		}
		//创建连线

		closedSpline = new THREE.CatmullRomCurve3(Vector3Arr);
		closedSpline.type = 'catmullrom';
		//closedSpline.closed = true;//首尾相连
		extrudeSettings = {
			steps: 60, //路径切割段数
			bevelEnabled: false,
			extrudePath: closedSpline
		};
		var pts = [],
			count = 30;
		for(var i = 0; i < count; i++) { //包裹图形
			var l = value;
			var a = 2 * i / count * Math.PI;
			pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
		}
		shape = new THREE.Shape(pts);
		geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
		var _MeshColor = MeshColor;
		if(index >= 3) {
			_MeshColor = 0xffffff; //0xff9fb2
		}
		material = new THREE.MeshLambertMaterial({
			color: _MeshColor,
			wireframe: false,
		});
		ligature[index] = new THREE.Mesh(geometry, material);
		plane.add(ligature[index]);
	};

	var icount = 0,
		iv_2 = 0;
	//全局变量
	point = [
		[-92, 46],
		[-219, -261],
		[196, 226],
		[80, -176]
	];
	iv = 0;
	ligatureVal = [{
			geometry: 1,
			material: 0,
			val: 1
		},
		{
			geometry: 2,
			material: 0,
			val: 3
		},
		{
			geometry: 3,
			material: 0,
			val: 6
		}
	];
	flashPoint = point[0];
	flashSpot1.position.set(flashPoint[0], flashPoint[1], 2);
	flashSpot2.position.set(flashPoint[0], flashPoint[1], 2);

	var icount2 = 0,
		icount3 = 50,
		icount2add = 1,
		icount3add = 1;

	function animate() {
		icount++;
		if(icount == 3) {
			icount = 0;
			if(ligature[3]) {
				ligature[3].geometry.dispose();
				ligature[3].material.dispose();
				ligature[4].geometry.dispose();
				ligature[4].material.dispose();
				ligature[5].geometry.dispose();
				ligature[5].material.dispose();
				plane.remove(ligature[3]);
				plane.remove(ligature[4]);
				plane.remove(ligature[5]);
			};
			if(iv < 30) {
				iv++;
				if(ligature[0]) {
					ligature[0].geometry.dispose();
					ligature[0].material.dispose();
					ligature[1].geometry.dispose();
					ligature[1].material.dispose();
					ligature[2].geometry.dispose();
					ligature[2].material.dispose();
					plane.remove(ligature[0]);
					plane.remove(ligature[1]);
					plane.remove(ligature[2]);
				}
				ligatureFn(ligatureVal[0].geometry, ligatureVal[0].material, ligatureVal[0].val, 0, iv, 0);
				ligatureFn(ligatureVal[1].geometry, ligatureVal[1].material, ligatureVal[1].val, 0, iv, 1);
				ligatureFn(ligatureVal[2].geometry, ligatureVal[2].material, ligatureVal[2].val, 0, iv, 2);
			} else {
				iv_2++;
				ligatureFn(ligatureVal[0].geometry, ligatureVal[0].material, ligatureVal[0].val + 1, iv_2, iv_2 + 1, 3);
				ligatureFn(ligatureVal[1].geometry, ligatureVal[1].material, ligatureVal[1].val + 1, iv_2, iv_2 + 1, 4);
				ligatureFn(ligatureVal[2].geometry, ligatureVal[2].material, ligatureVal[2].val + 1, iv_2, iv_2 + 1, 5);
				if(iv_2 == 29) iv_2 = 0;
				plane.rotation.z += 0.005;
			}
		}

		var timer = Date.now() * 0.0001;
		//plane.rotation.z = -timer;
		flashSpot1.rotation.z = -timer * 10;
		flashSpot2.rotation.z = timer * 10;

		if(icount2 == 0) icount2add = 1;
		if(icount2 == 100) icount2add = -1;
		if(icount3 == 0) icount3add = 1;
		if(icount3 == 100) icount3add = -1;

		icount2 += icount2add;
		icount3 += icount3add;

		flashSpot1.scale.set(0.5 + icount2 * 0.01, 0.5 + icount2 * 0.01, 0.5 + icount2 * 0.01);
		flashSpot2.scale.set(0.5 + icount3 * 0.01, 0.5 + icount3 * 0.01, 0.5 + icount3 * 0.01);

		//更新投影阵列
		camera.updateProjectionMatrix();

		controls.update();
		renderer.render(scene, camera);

		requestAnimationFrame(animate);
	}

	$(window).move(function() {
		plane.rotation.z += this.pageXc * 0.001;
	});
});