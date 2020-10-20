"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = 1;
var speed = 20;
var setDirection

function changeDirection(){
	direction *= -1;
}
function changeStop(){
	setDirection = direction
	direction = 0;
}
function changeBegin(){
	direction = setDirection;

}

function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}


	var vertices = [
		 0.15, 0.25,
		 0.2, 0.25,
		 0.2, 0.35,
		 0.15, 0.25,
		 0.2, 0.35,
		 0.15, 0.35,

		 0.2, 0.3,
		 0.25, 0.3,
		 0.25, 0.35,
		 0.2, 0.3,
		 0.25, 0.35,
		 0.2, 0.35,

		 -0.2, -0.3, 
		 0.2, -0.3, 
		 0.2, 0.25, 
		 -0.2, -0.3, 
		 0.2, 0.25,
		 -0.2, 0.25,

		 -0.2, -0.35,
		 0.2, -0.3,
		 -0.2, -0.3,
		 -0.2, -0.35,
		 0.2, -0.35,
		 0.2, -0.3,//饮料

		 -0.9, -0.35,
		 -0.5, -0.35,
		 -0.5, 0.1,
		 -0.9, -0.35,
		 -0.5, 0.1,
		 -0.9, 0.1,

		 -0.58, 0.1,
		 -0.52, 0.1,
		 -0.52, 0.35,
		 -0.58, 0.1,
		 -0.52, 0.35,
		 -0.58, 0.35,

		 -0.68, 0.1,
		 -0.62, 0.1,
		 -0.62, 0.25,
		 -0.68, 0.1,
		 -0.62, 0.25,
		 -0.68, 0.25,

		 -0.78, 0.1,
		 -0.72, 0.1,
		 -0.72, 0.45,
		 -0.78, 0.1,
		 -0.72, 0.45,
		 -0.78, 0.45,

		 -0.88, 0.1,
		 -0.82, 0.1,
		 -0.82, 0.25,
		 -0.88, 0.1,
		 -0.82, 0.25,
		 -0.88, 0.25,//薯条

		 0.5, 0.2,
		 0.7, -0.35,
		 0.9, 0.2,

		 0.5, 0.2,
		 0.9, 0.2,
		 0.8, 0.35,

		 0.5, 0.2,
		 0.8, 0.35,
		 0.6, 0.35,

	];

	var colors = [
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,

		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,


		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,

		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,//饮料

		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,

		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,

		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,

		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,

		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,

		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,

		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,


	];
	// Configure WebGL
	
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	// Load shaders and initialize attribute buffers


	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );

	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
    
	thetaLoc = gl.getUniformLocation( program, "theta" );

	document.getElementById( "speed" ).onchange = function( event ){
		speed = 100 - event.target.value;
	}

	renderSquare();
}

function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += direction * 0.1;
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLES, 0, 63 );

	// update and render
	setTimeout( function(){ requestAnimFrame( renderSquare ); }, speed );
}