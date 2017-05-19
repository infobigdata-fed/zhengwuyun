//svg路径转换为THREE.js立体图
//svg2_5D(路径, 厚度)
function svg2_5D(Shape, thickness) {
	var arrI = Shape.split(/\s+/),
		arr = [],
		arr_last = [];
	if(arrI[arrI.length - 1] == "") {
		arrI.pop();
	};
	if(arrI[0] == "") {
		arrI.shift();
	};
	for(var i = 0, len = arrI.length; i < len; i++) {
		arr.push(arrI[i].split(','));
	};
	arr_last = arr[0];
	arr.push(arr_last);
	var squareShape = new THREE.Shape();
	for(var i = 0, len = arr.length; i < len; i++) {
		if(i == 0) {
			squareShape.moveTo(arr[i][0] - 0, arr[i][1] - 0);
		} else {
			squareShape.lineTo(arr[i][0] - 0, arr[i][1] - 0);
		}
	}
	var extrudeSettings = {
		amount: thickness || 8,
		//是否有倒角
		bevelEnabled: false,
		bevelSegments: 0,
		steps: 2,
		bevelSize: 1,
		bevelThickness: 1
	};

	var geometry = new THREE.ExtrudeGeometry(squareShape, extrudeSettings);

	reMapUv(geometry);

	return geometry;

}
//THREE.Shape()生成的形状会打破默认uv计算方式，需要重新计算才能正确应用贴图。
function reMapUv(geometry) {
	geometry.computeBoundingBox();

	var max = geometry.boundingBox.max,
		min = geometry.boundingBox.min;
	var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
	var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
	var faces = geometry.faces;

	geometry.faceVertexUvs[0] = [];

	for(var i = 0; i < faces.length; i++) {

		var v1 = geometry.vertices[faces[i].a],
			v2 = geometry.vertices[faces[i].b],
			v3 = geometry.vertices[faces[i].c];

		geometry.faceVertexUvs[0].push([
			new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
			new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
			new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
		]);
	}
	geometry.uvsNeedUpdate = true;
}