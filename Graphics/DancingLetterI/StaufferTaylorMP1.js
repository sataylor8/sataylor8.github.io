var gl; //global variable for the WebGL context
var horizAspect = 480.0/640.0;
var currentlyPressedKeys = {};

function onresize(){
	var canvas = document.getElementById("glcanvas");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	gl.viewportWidth = canvas.clientWidth;
	gl.viewportHeight = canvas.clientHeight;
	gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
	perspectiveMatrix = makePerspective(45, canvas.clientWidth/canvas.clientHeight, 0.1, 100.0);
	setMatrixUniforms();
}

window.mobilecheck = function() {
  var check = false;
  (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}


function start(){
	var canvas = document.getElementById("glcanvas");
	currentlyPressedKeys[70]=false;
	currentlyPressedKeys[87]=false;

	gl = initWebGL(canvas); //initialize the GL context

	window.onresize = onresize.bind();

	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	gl.viewportWidth = canvas.clientWidth;
	gl.viewportHeight = canvas.clientHeight
	gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

	if(gl){
		gl.clearColor(0.0, 0.0, 0.0, 0.5); //set clear color to black, fully opaque
		gl.enable(gl.DEPTH_TEST);	//enable depth testing
		gl.depthFunc(gl.LEQUAL);	//Near things obscure far things
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);	//clear tho color as well as the depth buffer.
		initShaders();
		initBuffers();
		document.onkeydown = handleKey;
		document.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0]
		if(parseInt(touchobj.clientY) <= window.innerHeight/2) 
		{
				currentlyPressedKeys[68] = !currentlyPressedKeys[68];
		}
		else currentlyPressedKeys[70] = !currentlyPressedKeys[70];
		e.preventDefault()
		}, false)

		drawScene();
	}

	if(window.mobilecheck() == true)
	{
		var instruction = document.getElementById('instructions1');
		instruction.innerHTML = "Tap the top half of the screen to Toggle Dancing";
		instruction = document.getElementById('instructions2');
		instruction.innerHTML = "Tap the bottom half of the screen to Fill Color";
		instruction = document.getElementById('instructions3');
		instruction.innerHTML = "";
	}
}

function handleKey(event){
	if(currentlyPressedKeys[event.keyCode]== true)
		currentlyPressedKeys[event.keyCode] = false;
	
	else currentlyPressedKeys[event.keyCode] = true;
	//console.log(event.keyCode);
}

function initWebGL(canvas){
	gl = null;

	try{
		//try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e){}

	//if we don't have a GL context, give up now
	if(!gl){
		alert("Unable to initialize WebGL. Your browser may not support it.");
		gl = null;
	}

	return gl;
}

function initShaders(){
	var fragmentShader = getShader(gl, "shader-fs");
	var vertextShader = getShader(gl, "shader-vs");

	//create the shader program

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertextShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	//If creating the shader program failed, alert

	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("Unable to initialize the sahder program.");
	}

	gl.useProgram(shaderProgram);

	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);

	vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
  	gl.enableVertexAttribArray(vertexColorAttribute);
}

function getShader(gl, id){
	var shaderScript, theSource, currentChild, shader;

	shaderScript = document.getElementById(id);

	if(!shaderScript){
		return null;
	}

	theSource = "";
	currentChild = shaderScript.firstChild;

	while(currentChild){
		if(currentChild.nodeType == currentChild.TEXT_NODE){
			theSource += currentChild.textContent;
		}

		currentChild = currentChild.nextSibling;
	}

	if(shaderScript.type == "x-shader/x-fragment"){
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex"){
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		//unknown shader type
		return null;
	}

	gl.shaderSource(shader, theSource);

	//compile the shader program
	gl.compileShader(shader);

	//See if it compiled successfully
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function drawScene(){
	var time = Math.PI;
	if(currentlyPressedKeys[68]==true) time = (((new Date).getTime())%720)*(Math.PI/180.0); //make dance if key pressed
	var timeUniform = gl.getUniformLocation(shaderProgram, "time");
  	gl.uniform1f(timeUniform, time);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.bindBuffer(gl.ARRAY_BUFFER, VerticesColorBuffer);
	gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);


	if(currentlyPressedKeys[70]==false){ //draw fill if key pressed
		gl.bindBuffer(gl.ARRAY_BUFFER, TriangleStripOne);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

		gl.bindBuffer(gl.ARRAY_BUFFER, TriangleStripTwo);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

		gl.bindBuffer(gl.ARRAY_BUFFER, TriangleFanOne);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

		gl.bindBuffer(gl.ARRAY_BUFFER, LineColorBuffer);
		gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
		
		gl.lineWidth(1.5);
		gl.bindBuffer(gl.ARRAY_BUFFER, LineLoopBuffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.LINE_LOOP, 0, 12);
	}

	if(currentlyPressedKeys[87] == false){//draw wireframe if key pressed
		gl.lineWidth(1);
		gl.bindBuffer(gl.ARRAY_BUFFER, LineColorBuffer);
		gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, LineStrip);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.LINE_STRIP, 0, 24); 
	};
	requestAnimFrame(drawScene);
}


function initBuffers(){
	var canvas = document.getElementById("glcanvas");
	perspectiveMatrix = makePerspective(45, canvas.clientWidth/canvas.clientHeight, 0.1, 100.0);
	loadIdentity();
	mvTranslate([-0.0, 0.0, -6.0]);
	setMatrixUniforms();

	//Triangle vertices

	TriangleStripOne = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, TriangleStripOne);
	var vertices = [
		-0.6,	0.6,	0.0,
		-0.6,	1.0,	0.0,
		-0.2,	0.6,	0.0,
		0.6,	1.0,	0.0,
		0.2,	0.6,	0.0,
		0.6,	0.6,	0.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	

	TriangleStripTwo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, TriangleStripTwo);
	vertices = [
		-0.2,	0.6,	0.0,
		0.2,	0.6,	0.0,
		-0.2,	-0.6,	0.0,
		0.2,	-0.6,	0.0,
		0.6,	-1.0,	0.0,
		0.6,	-0.6,	0.0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	

	TriangleFanOne = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, TriangleFanOne);
	vertices = [
		-0.2,	-0.6,	0.0,
		-0.6,	-0.6,	0.0,
		-0.6,	-1.0,	0.0,
		0.6,	-1.0,	0.0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	//outline vertices
	LineLoopBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, LineLoopBuffer);
	vertices = [
		-0.6, 	1.0,	0.0,
		0.6,	1.0,	0.0,
		0.6,	0.6,	0.0,
		0.2,	0.6,	0.0,
		0.2,	-0.6,	0.0,
		0.6,	-0.6,	0.0,
		0.6,	-1.0,	0.0,
		-0.6,	-1.0,	0.0,
		-0.6,	-0.6,	0.0,
		-0.2,	-0.6,	0.0,
		-0.2,	0.6,	0.0,
		-0.6,	0.6,	0.0,
		];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	//colors
  	var colors = [
  			1.0,	0.5,	0.0,	1.0,
  			1.0,	0.5,	0.0,	1.0,
  			1.0,	0.5,	0.0,	1.0,
  			1.0,	0.5,	0.0,	1.0,
  			1.0,	0.5,	0.0,	1.0,
  			1.0,	0.5,	0.0,	1.0
  			];
  
  	VerticesColorBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, VerticesColorBuffer);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  	colors = [
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0,
  			0.0,	0.0,	1.0,	1.0
  		];
  	LineColorBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, LineColorBuffer);
 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  	//wireframe vertices
  	LineStrip = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, LineStrip);
	vertices = [
  			-0.2,	0.6,	0.0,
  			-0.6, 	0.6,	0.0,
  			-0.6,	1.0,	0.0,
  			-0.2,	0.6,	0.0,
  			0.6,	1.0,	0.0,
  			-0.6,	1.0,	0.0,
  			-0.2,	0.6,	0.0,
  			0.2,	0.6,	0.0,
  			0.6,	0.6,	0.0,
  			0.6,	1.0,	0.0,
  			0.2,	0.6,	0.0,
  			0.2,	-0.6,	0.0,
  			-0.2,	-0.6,	0.0,
  			-0.2,	0.6,	0.0,
  			0.2,	0.6,	0.0,
  			-0.2,	-0.6,	0.0,
  			-0.6,	-0.6,	0.0,
  			-0.6,	-1.0,	0.0,
  			-0.2,	-0.6,	0.0,
  			0.6,	-1.0,	0.0,
  			0.6,	-0.6,	0.0,
  			0.2,	-0.6,	0.0,
  			0.6,	-1.0,	0.0,
  			-0.6,	-1.0,	0.0
  		];
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

var mvMatrixStack = [];

function mvPushMatrix(m) {
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix() {
  if (!mvMatrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }
  
  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function mvRotate(angle, v) {
  var inRadians = angle * Math.PI / 180.0;
  
  var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}




