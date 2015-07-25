// ===========================
// MouseAtk © 2015 -
// ===========================

window.onload = function() {
	var mouse = {
		x: 0,
		y: 0
	}

	//audio
	var pop = new Audio('audio/pop.mp3')

	//Grabbing Canvas Element
	var canvas = document.getElementById('canvas')
		, ctx = canvas.getContext('2d')
		, food = []
		, mass = 30
		, top = 30
		, xInc = 0
		, yInc = 0
		, start = Date.now();


    	var w = $(window).width();
    	var h = $(window).height();

    	$(canvas).attr("width", (w - 10) + "px");
    	$(canvas).attr("height", (h - 10) + "px"); 

	$(window).bind("resize", function(){
    	var w = $(window).width();
    	var h = $(window).height();

    	$(canvas).attr("width", (w - 10) + "px");
    	$(canvas).attr("height", (h - 10) + "px"); 
	});

	var blob = {
		x: $(window).width()/2,
		y: $(window).height()/2,
		w: mass,
		h: mass
	}


	//MouseMove Listener
	canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - 10;
		mouse.y = e.pageY - 68;
	});

	function rect(o, color) {
		ctx.fillStyle = color;
		ctx.fillRect(o.x, o.y, o.w, o.h)
	}	

	function clear() {
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function toDegrees(angle) {
  		return angle/180*Math.PI;
	}


	function mathShit() {
		xInc = mouse.x - blob.x;
		yInc = mouse.y - blob.y;


	}

	function correct() {
		blob.x += (xInc / 100);
		blob.y += (yInc / 100);
	}

	function random(min, max) {
    	return Math.random() * (max - min) + min;
	}

	rect(blob, 'black');

	var check = setInterval(function() {
		clear()
		mathShit();
		correct();
		for(var j = 0; j < food.length; j++) {
			var temp = food[j];
			var current = j;

			//conditional to check if the player's blob is touching any food / supers / laxatives
			if(blob.x - 5 < temp.x && blob.x + blob.w > temp.x && blob.y - 5 < temp.y && blob.y + blob.w > temp.y) {
				

				if(temp.red === 'blue' && blob.super) {
				} else {
					food.splice(current, 1)
				}
				//if the block is a food
				if(temp.red === 'blue') {
					if(!blob.super) {
						blob.super = true;
						var superNum = 5;
						$('#super-wrap').show()
						$('#super').text(superNum + '.0s');
						var superCool = setInterval(function() {
							superNum -= 0.1
							if((Math.round(superNum * 10) / 10).toString().length !== 1) {
								console.log(superNum.toString())
								$('#super').text(Math.round(superNum * 10) / 10 + 's')
							} else {
								$('#super').text(Math.round(superNum) + '.0s')
							}
						}, 100)
						setTimeout(function() {
							blob.super = false;
							clearInterval(superCool)
							$('#super-wrap').hide()
						}, 5000)
					}
				//if the block is a laxative
				} else if(temp.red === true) {
					if(blob.super === true) {
						pop.play()
						mass += 5;
						if(mass > top) {
							top = mass;
						}	
					} else {
						//Lose more mass from laxatives the more mass you have
						if(mass > 700) {
							mass -= Math.round(top * (1/3) * (4/10));
						} else if (mass > 300){
							mass -= Math.round(top * (1/3) * (1/10));
						} else {
							mass -= 10;
						}
					}
				//if the block is just a regular food
				} else {
					pop.play();
					console.log('pop?')
					mass += 1;
					if(mass > top) {
						top = mass;
					}
				}

				//if your mass drops below 45% of, the game is over
				if(mass < (top * (2/3))) {
					clear();
					var end = Date.now() - start;
					$('#canvas').remove();
					$('#mass').remove();
					$('#score').remove();
					$('.wrap').show();
					$('#final').text('Greatest mass: ' + top);
					$('#time').text(Math.round(end/100) / 10 + 's')
					clearInterval(game);
					clearInterval(check);
				}

				//if the mass is less than 160, your size doesnt get any bigger
				if(mass < 160) {
					blob.w = mass;
					blob.h = mass;
				}
			} else {
				if(food[j].red === true) {
					rect(food[j], 'red')
				} else if(food[j].red === 'blue') {
					rect(food[j], 'blue')
				} else {
					rect(food[j], 'gray')
				}
			}
		if(!blob.super) {
			rect(blob, 'black');
		} else {
			rect(blob, 'purple')
		}
		};
		$('#mass').text('mass: ' + mass);
		$('#score').text('high score: ' + top);
	}, 1000/60)

	var game = setInterval(function() {
		//random generate particles
		var x = random(10, $(window).width() - 10);
		var y = random(10, $(window).height() - 10);
		if(x > blob.x && x + 10 < blob.x + mass && y > blob.y && y + 10 < blob.y + mass) {

		} else {
		var red = false;
		var num = Math.random();
		if(num < 0.4) {
			if(num < 0.005) {
				var red = 'blue';
			} else {
				var red = true;
			}
		};

		//randomly generate bad ones that are red, if you eat a red one, game over
		if(red === true) {
			rect({x: x, y: y, w: 10, h: 10}, 'red');
		} else if(red === 'blue') {
			rect({x: x, y: y, w: 10, h: 10}, 'blue');
		} else {
			rect({x: x, y: y, w: 10, h: 10}, 'gray');
		}
		food.push({x: x, y: y, w: 10, h: 10, red: red})
		}
	}, 300)

}


