"use strict";

var canvas;
var gl;

var points = [];
var colors = [];


var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;
var a;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];
var squaretheta = [0, 0, 0];

var pos = [0, 0, 0];
var sf = [1.0, 1.0, 1.0];

var thetaLoc;
var posLoc;
var sfLoc;

var vBuffer;
var cBuffer;
var t;
var N=6;
var b = 0.1;
var k = [];
var t = [];
var yy = [];
var p = 0;

var trianglecolors = [
	0.0, 0.0, 0.0, 1.0, // 
	1.0, 0.0, 0.0, 1.0, // 
	1.0, 1.0, 0.0, 1.0, // 

];

var trianglep = [
	-0.1, -0.1, 0.0, 1.0,
	0.0, 0.1, 0.0, 1.0,
	0.1, -0.1, 0.0, 1.0
];

var squarelep = [
	-0.1, -0.1, 0.0, 1.0,
	0.1, -0.1, 0.0, 1.0,
	0.1, 0.1, 0.0, 1.0,
	-0.1, -0.1, 0.0, 1.0,
	0.1, 0.1, 0.0, 1.0,
	-0.1, 0.1, 0.0, 1.0
];

var squarecolors = [
	1.0, 0.0, 0.0, 1.0, // 
	1.0, 0.0, 0.0, 1.0, // 
	1.0, 0.0, 0.0, 1.0, // 
	1.0, 0.0, 0.0, 1.0, // 
	1.0, 0.0, 0.0, 1.0, // 
	1.0, 0.0, 0.0, 1.0, // 

];

var circlep = [];
var circlecolors = [];



var vertices = [
	glMatrix.vec4.fromValues(-0.1, -0.1, 0.1, 1.0),
	glMatrix.vec4.fromValues(-0.1, 0.1, 0.1, 1.0),
	glMatrix.vec4.fromValues(0.1, 0.1, 0.1, 1.0),
	glMatrix.vec4.fromValues(0.1, -0.1, 0.1, 1.0),
	glMatrix.vec4.fromValues(-0.1, -0.1, -0.1, 1.0),
	glMatrix.vec4.fromValues(-0.1, 0.1, -0.1, 1.0),
	glMatrix.vec4.fromValues(0.1, 0.1, -0.1, 1.0),
	glMatrix.vec4.fromValues(0.1, -0.1, -0.1, 1.0),
];

var vertexColors = [
	glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 0.5),
	glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 0.5),
	glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 0.5),
	glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 0.5),
	glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 0.5),
	glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 0.5),
	glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 0.5),
	glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 0.5)
];

var faces = [
	1, 0, 3, 1, 3, 2, //正
	2, 3, 7, 2, 7, 6, //右
	3, 0, 4, 3, 4, 7, //底
	6, 5, 1, 6, 1, 2, //顶
	4, 5, 6, 4, 6, 7, //背
	5, 4, 0, 5, 0, 1  //左
];

function initSquare() {
	canvas = document.getElementById("dot-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.5, 0.5, 0.5, 1.0);

	document.getElementById("shape").onclick = function (event) {
		a = event.target.value;
		console.log(a);
	}

	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	vBuffer = gl.createBuffer(); //position
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	cBuffer = gl.createBuffer(); // color
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);

	posLoc = gl.getUniformLocation(program, "pos");
	thetaLoc = gl.getUniformLocation(program, "theta");
	sfLoc = gl.getUniformLocation(program, "sf");
	gl.uniform3fv(posLoc, pos);
	
	canvas.addEventListener("mousedown", function (event) {
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		var rect = canvas.getBoundingClientRect();
		var cx = event.clientX - rect.left;
		var cy = event.clientY - rect.top; // offset
		var x = 2 * cx / canvas.width - 1;
		var y = 2 * (canvas.height - cy) / canvas.height - 1;
		
		t.push(x,y) // glMatrix.vec3.fromValues(2 * cx / canvas.width - 1, 2 * (canvas.height - cy) / canvas.height - 1, 0.0);
		console.log(x,y);if (a == "triange") {
			k.push(0);
		}

		if (a == "square") {
			k.push(1);
		}
		if (a == "cube") {
			k.push(2);
			for (var i = 0; i < faces.length; i++) {
				points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2],1.0);
				colors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
			}
			
		
			
		}
		if (a == "circle") {
			k.push(3);
			document.getElementById("circleNum").onchange = function () {
				N= document.getElementById("circleNum").value;
				console.log(N);
			 }
			yy.push(parseInt(N));
			
		
		}
	});
	render();

}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	var p = 0;
	if(p>=k.length/2)p = 0;
	for (var i = 0; i < k.length; i++) {
		if (k[i] == 0) {
			//gl.clear( gl.COLOR_BUFFER_BIT );
			gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglep), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglecolors), gl.STATIC_DRAW);
			//gl.uniform3fv(sfLoc, sf);
			sf[0] = sf[1] = sf[2] += b;
			if (sf[0] < 0.5) b *= -1;
			else if (sf[0] > 2.0) b *= -1;
			gl.uniform3fv(sfLoc, sf);
			gl.uniform3fv(posLoc, [t[2*i],t[2*i+1],0.0]);
			 gl.uniform3fv(thetaLoc,[0.0,0.0,0.0]);
			console.log(t[2*i],t[2*i+1]);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
	
		}

		if (k[i] ==1) {
			//gl.clear(gl.COLOR_BUFFER_BIT);
			gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squarelep), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squarecolors), gl.STATIC_DRAW);

			
			squaretheta[2] += 0.1;
	
	        gl.uniform3fv(thetaLoc, squaretheta);
			gl.uniform3fv(posLoc, [t[2*i],t[2*i+1],0.0]);
			gl.uniform3fv(sfLoc, [1.0,1.0,1.0]);
			
			
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		}

		if (k[i] == 2) {
			//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			//theta[axis] += 0.1;
			gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
			theta[0] += 0.1;
			//theta[1] += 0.1;
	
	        gl.uniform3fv(thetaLoc, theta);
			gl.uniform3fv(posLoc, [t[2*i],t[2*i+1],0.0]);
			gl.uniform3fv(sfLoc, [1.0,1.0,1.0]);
			gl.drawArrays(gl.TRIANGLES, 0, 36);
	
		}
		//var r = Math.random();
		var g = Math.random();
		if (k[i] == 3) {

			circlep=[];
			var r = 0.1;
			circlep.push(0.0, 0.0, 0.0, 1.0);
			circlecolors.push(g, 0.0, 0.0, 1.0);
		   
			for (var j = 0; j <= yy[p]; j++) {
				var ts = j * 2 * Math.PI /yy[p];
				var x = r * Math.sin(ts);
				var y = r * Math.cos(ts);
				circlep.push(x, y, 0.0, 1.0);
				circlecolors.push(g, 0.0, 0.0, 1.0);
			}
			gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circlep), gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circlecolors), gl.STATIC_DRAW);
			gl.uniform3fv(thetaLoc, [0.0,0.0,0.0]);
			gl.uniform3fv(sfLoc, [1.0,1.0,1.0]);
		
			gl.uniform3fv(posLoc, [t[2*i]+Math.random(),t[2*i+1]+Math.random(),0.0]);
			gl.drawArrays(gl.TRIANGLE_FAN, 0, yy[p]+2);
       	    p++;
		}
	}
	window.requestAnimFrame(render);
}

