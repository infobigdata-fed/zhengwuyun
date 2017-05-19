/*过点
new THREE.Vector3(196, 226, -1),
new THREE.Vector3(50, 135, 120),
new THREE.Vector3(-92, 46, -1)
*/

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
		a = -0.005,
		k1 = 0,
		k2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	var z = a * (k - k1) * (k - k2) - 1;
	return z;
}
var xy1 = [196, 226],
	xy2 = [-92, 46];
var x, y, z, k;
xv = (xy2[0] - xy1[0]) / 10;
for(var i = 0; i <= 10; i++) {
	x = xy1[0] + xv * i;
	y = yFn(x, xy1, xy2);
	k = kFn(x, y, xy1);
	z = zFn(k, xy1, xy2);
	console.log('new THREE.Vector3(' + parseInt(x) + ',' + parseInt(y) + ',' + parseInt(z) + '),');
}


