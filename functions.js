//Library functions

/*******variable definition start * * * * * * */
	var canvas = {width:525, height:294}; //Canvas area definition
	var LEFT = false, RIGHT = false, UP = false, DOWN = false; //flags to arrow keys
	const txtName = document.querySelector("#name"); //reference to text boxh with id = "name"
	const cmbBreed = document.querySelector("[name=cmbBreed]"); //reference to combo with name "cmbBreed"
	
	var player = { //Object to refer the player
		x:31,
		y:131,
		speed:
	};
	
	var walls =[{"min -x" : 115, "max-x": 151. 5, "min-y": 26, "max-y": 75 }, //pared superior izquierda
				{ "min-x": 341, "max-x": 377. 5, "min-y": 26, "max-y": 75 }, //pared superior derecha
				{ "min-x": 115, "max-x" :151. 5, "min-y": 190, "max-y": 239 }, //pared inferior izquierda
				{ "min-x": 341, "max-x": 377. 5, "min-y": 190, "max-y": 239 }, / / pared inferior derecha
				{ "min-x":165, "max-x":327, "min-y":40, "max-y":76 }, //pared horizontal centro superior
				{ "min-x":165, "max-x":327, "min-y":190, "max-y":227}, //pared horizontal centro inferior
				{ "min-x": 165, "max-x": 327, "min-y": 142, "max-y" :177 }, //pared horizontal inferior
				{ "min-x" :165, "max-x" :227, "min-y" :90, "max-y" :125 }, //pared horizontal izquierda
				{ "min-x": 268, "max-x": 327, "min-y" :90, "max-y" : 125 }, //pared horizontal derecha
				{ "min-x": 165, "max-x": 201. 5, "min-y": 125, "max-y" :177 }, //pared vertical izquierda
				{ "min-x": 290, "max-x": 327, "min-y" : 125, "max-y" :177 }, //pared vertical derecha
				{ "min-x" : 89, "max-x": 151. 5, "min-y" :90, "max-y" :125 }, //pared horizontal superior izquierda
				{ "min-x": 89, "max-x": 151. 5, "min-y": 142, "max-y": 177 }, //pared horizontal inferior izquierda
				{ "min-x":341, "max-x":404, "min-y":90, "max-y":125 }, //pared horizontal superior derecha
				{ "min-x": 341, "max-x" :404, "min-y": 142, "max-y" :177 }, //pared horizontal inferior derecha
				{ "min-x": 39, "max-x": 101, "min-y" :40, "max-y" : 76 }, //pared L s uperior izquierda
				{ "min-x":39, "max-x":75 . 5, "min-y":40, "max-y":125},
				{ "min-x" : 39, "max-x": 101, "min-y": 190, "max-y": 227 }, //pared L inferior izquierda
				{ "min-x": 39, "max-x": 75. 5, "min-y" : 142, "max-y": 227 } ,
				{ "min-x": 392, "max-x":455, "min-y" :40, "max-y":76 }, //pared
				{ "min-x" :419, "max-x" :455, "min-y" :40, "max-y": 125 },
				{ "min-x": 39, "max-x" :455, "min-y": 190, "max-y": 227 }, //pared
				{ "min-x":419, "max-x":455, "min-y" :142, "max-y" :227 } ];
/*******variable definition end*******/


/* * * * * * event definition start * * * * * */
	//Listener that tells the browser to listen for user interaction on the referenced control
	txtName.addEventListener("change", (event) => {
		play();
	});
	
	cmbBreed.addEventListener( "change", ( event) => {
		getBreedPicture();
	});
	
	/*setlnterval is a native function of Javascript to execute a piece of code in a determined time (in milliseconds )*/
	setInterval(update, 10);
/* * * * * * event definition start * * * * * * */	

/* * * * * * * function definition start * * * * * * */
	//funtion to play audio
	function play() {
		var audio = new Audio('intro-sound.mp3');
		audio.play();
	}
	
	//function for activate alert and print value in console of browser
	function sayHello(){
		console.log(document.getElementByid("name").value) ;
		alert(document.getElementByid("name").value);
	}
	
	//function to move player
	function move() {
		if(LEFT) 	{ if(!road_blocked(player.x - player.speed, player.y)) { player.x -= player.speed; } }
		if(RIGHT) 	{ if(!road_blocked(player.x + player.speed, player.y)) { player.x += player.speed; } }
		if(UP) 		{ if(!road_blocked(player.x, player.y - player.speed)) { player.y -= player.speed; } }
		if(DOWN) 		{ if(!road_blocked(player.x, player.y + player.speed)) { player.y += player.speed; } }
	}
	
	//function to determine which key is press
	document.onkeydown = function(e) {
		if(e.keyCode == 37) LEFT		= true;
		if(e.keyCode == 39) RIGHT		= true;
		if(e.keyCode == 38) UP			= true;
		if(e.keyCode == 40) DOWN		= true;
	}
	
	//function to determine which key was pressed
	document.onkeyup = function(e) {
		if(e.keyCode == 37) LEFT		= false;
		if(e.keyCode == 39) RIGHT		= false;
		if(e.keyCode == 38) UP			= false;
		if(e.keyCode == 40) DOWN		= false;
	}
	
	window.onload = function() {
		getBreeds();
	}
	
	//function to lock coordinates of the playing area
	function road_blocked(x, y) {
		var result = false;
		
		if(x < 25 || x > 468 || y < 25 || y > 240) result = true;		// area de juego
		for(var i = 0; i < walls.length; i++){
			if((x >= walls[i]['min-x'] && x <= walls[i]['max-x']) && (y >= walls[i]['min-y'] && y <= walls[i]['max-y'])) {
				result = true;
				break;
			}
		}
		
		return result;
	}
	
	// function to clear canvas
	function clearCanvas() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}
	
	// Draw Player inside canvas.
	function ship() {
		ctx.fillSytle = "#FFFF00";
		
		ctx.beginPath();
		ctx.moveTo(player.x, player.y);
		ctx.lineTo(player.x, player.y);
		ctx.lineTo(player.x, player.y+30);
		ctx.lineTo(player.x+30, player.y+30);
		ctx.lineTo(player.x+30, player.y);
		ctx.lineTo(player.x, player.y);
		ctx.fill();
	}
	
	// function to update canvas area
	function update() {
		clearCanvas();
		ship();
		move();
	}
	
	// Obtiene listado de razas
	function getBreeds(url) {
		fetch('https://dog.ceo/api(breeds/list/all')
		.then(response => response.json())
		.then(data => {
			if(data.status == "success") {
				fillComboBreeds(data.message);
			}
			else {
				alert(data.message);
			}
		})
		.catch(function(error) {
			console.log('Hubo un problema con la petición: ' + error.message);
		});
	}
	
	// función para llegart combo de razas
	function fillComboBreeds(list) {
		for(let prop in list) {
			option = document.createElement('option');
			option.setAttribute('value', prop);
			option.appendChild(document.createTextNode(prop));
			cmbBreed.appendChild(option);
		}
	}
	
	// Obtiene imagen de la raza
	function getBreedPicture() {
		var url = 'https://dog.ceo/api/breed/' + cmdBreed.value + '/images/random';
		
		fetch(url)
		.then(response => response.json())
		.then(data => {
			if(data.status == "success") {
				document.getElementById("picture").innerHTML = "<img src='" + data.message + "'/>";
			}
			else {
				document.getElementById("picture").innerHTML = "No hay imagen disponible.";
				alert(data.message);
			}
		})
		.catch(function(error) {
			console.log('Hubo un problema con la petición:' + error.message);
		});
	}
/* * * * * * * function definition end * * * * * * */
