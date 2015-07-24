// ===========================
// MouseAtk © 2015 -
// ===========================

window.onload = function() {

	var canvas = document.getElementById('canvas')
		, ctx = canvas.getContext('2d');

	function rect(o) {
		ctx.fillStyle = 'black';
		ctx.fillRect(o.x, o.y, o.w, o.h)
	}	

	function clear() {
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	var blob = {
		x: 10,
		y: 10,
		w: 10,
		h: 10
	}

	rect(blob);
	blob = trigFuck(blob);

	canvasEvent(canvas);

	setInterval(function() {
		clear()
		blob = trigFuck(blob);
		rect(blob);
	}, 120/60)

}


