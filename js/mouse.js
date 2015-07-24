window.trigFuck = function(element) {
	if(mouse.x > element.x) {
		element.x += 1;
	} else {
		element.x -= 1;
	}


	if(mouse.y > element.y) {
		element.y += 4;
	} else {
		element.y -= 4;
	}

	console.log(element.y + ' ' + mouse.y)
	return element;
}

window.mouse = {};

window.canvasEvent = function(elem) {
	elem.addEventListener('mousemove', mousemove);
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
	console.log(mouse)
}

window.onload = grunt;

function grunt() {

	// ===========================
	// Adding Coords to Global Obj
	// ===========================

	//trig shit *welp*


	// ===========================
	// Event Listener
	// ===========================


	console.log(window.mouse)



}
