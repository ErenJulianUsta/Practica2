@import url(https://fonts.googleapis.com/css?family=Open+Sans:600);

body {
	font-family: 'Open Sans', sans-serif;
	font-weight: 600;
	font-size: 40px;
}

.text {
	position: static;
	width: 450px;
	left: 50%;
	margin-left: center;
	height: 40px;
	top: 50%;
}

p {
	display: inline-block;
	vertical-align: top;
	margin: 0;
}

label {
	font-size: 20px;
}

button {
	font-size: 20px;
	width: 100px;
	height: 40px;
}

.word {
	position: absolute;
	width: 220px;
	opacity: 0;
}

.letter {
	display: inline-block;
	position: relative;
	float: left;
	transformation: translateZ(25px);
	transform-origin: 50% 50% 25px;
}

.letter.out {
	transform: rotateX(90deg);
	transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.letter.behind {
	transform: rotateX(-90deg);
}

.letter.in {
	transform: rotateX(0deg);
	transition: transform 0.38s cubic-bezier(0.175, 0.0885, 0.32, 1.275);
}

.wisteria {
	color: #8e44ad;
}

.belize {
	color: #2980b9;
}

.pomegrante {
	color: #c0392b;
}

input[type=text], selesct {
	width: 80%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}
I