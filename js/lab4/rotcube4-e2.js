"use strict";
const {vec4}=glMatrix;

var canvas;
var gl;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];
var pos= [0, 0, 0];

var thetaLoc;

window.onload = function initCube() {
    canvas = document.getElementById("rtcb-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    
    var vertices = [
		-1.0, -1.0, 
		 0.0,  1.0, 
		 1.0, -1.0, 
	];


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    canvas.addEventListener( "mousedown", function( event ){
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		var rect = canvas.getBoundingClientRect();
		var cx = event.clientX - rect.left;
		var cy = event.clientY - rect.top; // offset
		var t = glMatrix.vec3.fromValues( 2 * cx / canvas.width - 1, 2 * ( canvas.height - cy ) / canvas.height - 1 );
	    thetaLoc = gl.getUniformLocation(program,"theta");
	   gl.uniform3fv(thetaLoc,new Float32Array(t));
    } );
    


   

    gl.enable(gl.DEPTH_TEST);

    // load shaders and initialize attribute buffer
    var program = initShaders(gl, "rtvshader", "rtfshader");
    gl.useProgram(program);



    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    render();
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT );
    

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    requestAnimFrame(render);
}