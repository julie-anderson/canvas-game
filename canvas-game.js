window.onload = function init() {
	var game = new GF();
	game.start();
};

//GAME FRAMEWORK
var GF = function(){
	var canvas, ctx, w, h;
	var inputStates = {};
	var thing = {
		x:10, 
		y:10,
		speed:1
	};

	function clearCanvas() {
		ctx.clearRect(0, 0, w, h);
	};

	function drawSomething(x, y) {
		ctx.save();

		ctx.translate(x, y);
		ctx.strokeRect(0, 0, 100, 100);
		ctx.fillRect(10, 10, 80, 80);

		ctx.restore();
	};

	var mainLoop = function(time){
		clearCanvas();
		drawSomething(thing.x, thing.y);
		updatePosition();
		requestAnimationFrame(mainLoop);
	};

	function updatePosition(){
		thing.speedX = thing.speedY = 0;
		if (inputStates.left) {
			ctx.fillText("left", 160, 20);
			thing.speedX = -thing.speed;
		}
		if (inputStates.up) {
			ctx.fillText("up", 160, 50);
			thing.speedY = -thing.speed;
		}
		if (inputStates.right) {
			ctx.fillText("right", 160, 80);
			thing.speedX = thing.speed;
		}
		if (inputStates.down) {
			ctx.fillText("down", 160, 120);
			thing.speedY = thing.speed;
		}
		if (inputStates.space) {
			ctx.fillText("space bar", 140, 150);
		}
		if (inputStates.mousePos) {
			ctx.fillText("x = " + inputStates.mousePos.x + " y = " +
								   inputStates.mousePos.y, 5,150);
		}
		if (inputStates.mousedown) {
			ctx.fillText("mousedown b" + inputStates.mouseButton, 5, 180);
			thing.speed = 5;
		}
		else {
			thing.speed = 1;
		}
		thing.x += thing.speedX;
		thing.y += thing.speedY;
		
	};

	function getMousePos(evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	};

	var start = function(){
		canvas = document.querySelector("#myCanvas");
		w = canvas.width;
		h = canvas.height;
		ctx = canvas.getContext('2d');

		window.addEventListener('keydown', function(event){
			if (event.keyCode === 37) {
				inputStates.left = true;
			}
			else if (event.keyCode === 38) {
				inputStates.up = true;
			}
			else if(event.keyCode === 39) {
				inputStates.right = true;
			}
			else if (event.keyCode === 40) {
				inputStates.down = true;
			}
			else if (event.keyCode === 32) {
				inputStates.space = true;
			}
		}, false);

		window.addEventListener('keyup', function(event){
			if (event.keyCode === 37) {
				inputStates.left = false;
			}
			else if (event.keyCode === 38) {
				inputStates.up = false;
			}
			else if(event.keyCode === 39) {
				inputStates.right = false;
			}
			else if (event.keyCode === 40) {
				inputStates.down = false;
			}
			else if (event.keyCode === 32) {
				inputStates.space = false;
			}
		}, false);

		canvas.addEventListener('mousemove', function(evt){
			inputStates.mousePos = getMousePos(evt);
		}, false);

		canvas.addEventListener('mousedown', function(evt){
			inputStates.mousedown = true;
			inputStates.mouseButton = evt.button;
		}, false);

		canvas.addEventListener('mouseup', function(evt){
			inputStates.mousedown = false;
		}, false);

		requestAnimationFrame(mainLoop);
	};
	return {
		start: start
	};
};