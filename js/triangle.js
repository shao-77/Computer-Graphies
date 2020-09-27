"use strict";

var gl;
var points;

window.onload = function init(){//指定canvas初始化网页进行初始化刷新时，要做哪些工作
	var canvas = document.getElementById( "triangle-canvas" );//获得canvasid
	gl = WebGLUtils.setupWebGL( canvas );//设置调用WebGLUtils库里的函数，设置当前canvas下的gl环境，用gl句柄保存
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		-1.0, -1.0, 
		 0.0,  1.0, 
		 1.0, -1.0, 
		 /*0.0, -1.0,
		 1.0, -1.0,
		 1.0,  1.0,
		 0.0, -1.0,
		 1.0,  1.0,
		 0.0,  1.0*/
		 /*-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5*/
	];//定义当前绘制的内容，这三个顶点定义在计算机的内存里，计算机的CPU可以用访问计算器的内存进行读写操作，显卡独立的运算核心GPU，读写的是自己的显存，不能直接读写计算机内存数据

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );//观察窗口可视区域，0，0起始坐标，canvas.width, canvas.height可视区域长度高度
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );//当前绘制区域的背景颜色

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );//读入顶点着色器和面片着色器，进行编译，形成二进制代码，当前程序运行在gl环境里
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();//创建一块缓存VBO，创建的缓存是当前的缓存
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );//绑定缓存，使用当前的缓存
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );//向缓存写数据，数组数据在vertices所指向的内存区域，类型是float 32，每个数据占4位

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );//6个浮点数，每组是2个
	gl.enableVertexAttribArray( vPosition );

	render();//绘制
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );//清空当前绘制区域，只保留背景颜色
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}