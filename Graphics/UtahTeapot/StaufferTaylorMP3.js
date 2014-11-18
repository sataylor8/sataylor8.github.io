var gl; //global variable for the WebGL context
var currentlyPressedKeys = {};
var NormalLineArr = [];
var Ymax = 0;
var MinZ2 = 0;
var TeaPotVertArr = [];
var TeaPotIndArr = [];
var NormalVectArr = [];
var NormalxyzArr = [];
var TextureCoordArr = [];
var data = [];
var perspectiveMatrix;
var currentlyPressedKeys = {};
var zRot = 0;
var BumpsLoaded = false;
var TextureLoaded = false;
var EnviroLoaded = false;
var RenderState =0; //0 no light, 1 lighting, 2 texture mapping, 3 bump mapping, 4 enviro, 5 normals

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
	currentlyPressedKeys[37]=false;
	currentlyPressedKeys[38]=false;
	currentlyPressedKeys[39]=false;
	currentlyPressedKeys[40]=false;
	currentlyPressedKeys[50]=false;
	currentlyPressedKeys[49]=false;
	currentlyPressedKeys[48]=false;
	currentlyPressedKeys[73]=false;
	var canvas = document.getElementById("glcanvas");

	gl = initWebGL(canvas); //initialize the GL context

	window.onresize=onresize.bind();

	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	gl.viewportWidth = canvas.clientWidth;
	gl.viewportHeight = canvas.clientHeight
	gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

	if(gl){
		gl.clearColor(0.0, 1.0, 1.0, 0.25); //set clear color to black, fully opaque
		gl.enable(gl.DEPTH_TEST);	//enable depth testing
		gl.depthFunc(gl.LEQUAL);	//Near things obscure far things
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);	//clear tho color as well as the depth buffer.
		initTextures();
    loadCubeMap()
		initShaders();
		initBuffers();
		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;
    document.addEventListener('touchstart', function(e){
    RenderState++
    if(RenderState ==6) RenderState =0;
    e.preventDefault()
   }, false)

		drawScene();
	}

  if(window.mobilecheck()==true){
    var instructions = document.getElementById('instructions');
    instructions.innerHTML = "Tap the screen to Change Rendering Model";
  }
}

function loadCubeMap() {//Load cube texture
    Cubetexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, Cubetexture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    var faces = [["Left.png", gl.TEXTURE_CUBE_MAP_POSITIVE_X],
                 ["Right.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_X],
                 ["Bot.png", gl.TEXTURE_CUBE_MAP_POSITIVE_Y],
                 ["Top.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_Y],
                 ["Back.png", gl.TEXTURE_CUBE_MAP_POSITIVE_Z],
                 ["Front.png", gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]];
    for (var i = 0; i < faces.length; i++) {
        var face = faces[i][1];
        var image = new Image();
        image.onload = function(Cubetexture, face, image) {
            return function() {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, Cubetexture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.texImage2D(face, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        } (Cubetexture, face, image);
        image.src = faces[i][0];
    }
    EnviroLoaded = true;
}

function initTextures() {//load bump texture and mapping textuer
  TeaPotTexture = gl.createTexture();
  TeaPotImage = new Image();
  TeaPotImage.onload = function() { handleTextureLoaded(TeaPotImage, TeaPotTexture, 0); }
  TeaPotImage.src = "RockWallText.jpg";

  TeaPotBump = gl.createTexture();
  BumpImage = new Image();
  BumpImage.onload = function() { handleTextureLoaded(BumpImage, TeaPotBump, 1); }
  BumpImage.src = "BrickWall.jpg";
}

function handleTextureLoaded(image, texture, num) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
  if(num == 0) TextureLoaded = true;
  if(num ==1) BumpsLoaded = true;
  initBuffers();
}

function handleKeyDown(event){
	//up - 38 	down - 40	left - 37 	right - 39
	//1 - 49
	if(currentlyPressedKeys[event.keyCode] == false)
			currentlyPressedKeys[event.keyCode] = true;

  if(event.keyCode==49) RenderState++;
  if(RenderState==6) RenderState=0;

//0 no light, 1 lighting, 2 texture mapping, 3 bump mapping, 4 enviro, 5 normals
  var State = document.getElementById("State");
  switch(RenderState)
    {
    case 0:
      State.innerHTML = "Current Model: No Lighting";
      break;
    case 1:
      State.innerHTML = "Current Model: Ambient + Directional Lighting";
      break;
    case 2:
      State.innerHTML = "Current Model: Texture Mapping + Ambient + Directional";
      break;
    case 3:
      State.innerHTML = "Current Model: Bump Mapping + Ambient + Directional";
      break;
    case 4:
      State.innerHTML = "Current Model: Environment Mapping";
      break;
    case 5:
      State.innerHTML = "Current Model: Normal Vectors";
      break;
    default:
      State.innerHTML = "Current Model: No Lighting";
    }
}

function handleKeyUp(event){
	if(currentlyPressedKeys[event.keyCode] == true)
			currentlyPressedKeys[event.keyCode] = false;
	//console.log(event.keyCode);
}

function initWebGL(canvas){
	gl = null;


	try{
		//try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e){}

	// var canvas = document.getElementById("glcanvas");
	
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

  vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  gl.enableVertexAttribArray(vertexNormalAttribute);

  textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
  gl.enableVertexAttribArray(textureCoordAttribute);

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

	//begin drawing setup/drawing
 	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

 	var RotationMatrix = Matrix.I(4);
	var TranslateMatrix = Matrix.I(4);
	var ScaleMatrix = Matrix.I(4);

 	if(currentlyPressedKeys[48]==true){
 		LeftRight =0;
 		UpDown=0;
 		zRot =0;
 	}
  zRot+=.01;

  if(zRot==360) zRot=0;
  var Temp = $M([
    [Math.cos(zRot), 0, -Math.sin(zRot), 0],
    [0,              1, 0,               0],
    [Math.sin(zRot), 0, Math.cos(zRot),  0],
    [0,              0, 0,               1]]);

  RotationMatrix = Temp.multiply(RotationMatrix);

 	mvPushMatrix();
  mvRotate(15, [1,0,0]);

	//draw background
	var rotUniform = gl.getUniformLocation(shaderProgram, "uRotationMatrix");
 	gl.uniformMatrix4fv(rotUniform, false, new Float32Array(RotationMatrix.flatten()));

 	var translateUniform = gl.getUniformLocation(shaderProgram, "uTranslateMatrix");
 	gl.uniformMatrix4fv(translateUniform, false, new Float32Array(TranslateMatrix.flatten()));

	var scaleUniform = gl.getUniformLocation(shaderProgram, "uScaleMatrix");
 	gl.uniformMatrix4fv(scaleUniform, false, new Float32Array(ScaleMatrix.flatten())); 	

 	//Draw Teapot if assets loaded
 	if(BumpsLoaded==true && TextureLoaded == true && EnviroLoaded == true){
      

      gl.bindBuffer(gl.ARRAY_BUFFER, VerticesColorBuffer);
      gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  
      gl.bindBuffer(gl.ARRAY_BUFFER, TeaPotVertBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TeaPotIndBuffer);
      
  
      gl.bindBuffer(gl.ARRAY_BUFFER, NormalBuffer);
      gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  
      gl.bindBuffer(gl.ARRAY_BUFFER, TextureBuffer);
      gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, TeaPotTexture);
      gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler0"), 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, TeaPotBump);
      gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler1"), 1);

      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, Cubetexture);
      gl.uniform1i(gl.getUniformLocation(shaderProgram, "CubeSampler"), 2);
  
      setMatrixUniforms();
      gl.drawElements(gl.TRIANGLES, TeaPotIndArr.length, gl.UNSIGNED_SHORT, 0);
  
      RotationMatrix = Matrix.I(4);
      gl.uniformMatrix4fv(rotUniform, false, new Float32Array(RotationMatrix.flatten()));

      //draw table
      gl.bindBuffer(gl.ARRAY_BUFFER, TableColorBuffer);
      gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, TableVertBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
      
      var holder = RenderState;
      RenderState = 0;

      setMatrixUniforms();
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      RenderState = holder;
      
  }
    mvPopMatrix();
    requestAnimFrame(drawScene);


}


function initBuffers(){
	var canvas = document.getElementById("glcanvas");
	perspectiveMatrix = makePerspective(45, canvas.clientWidth/canvas.clientHeight, 0.1, 100.0);
	loadIdentity();
	mvTranslate([0.0, -1.5, -8.0]);
	setMatrixUniforms();

  if(BumpsLoaded==true && TextureLoaded == true && EnviroLoaded ==true){
    //Parse objet File
	  var req = new XMLHttpRequest();
    req.open('GET', "TeaPot.txt", false);
    req.overrideMimeType('text/plain');
    req.send(null);

    var vertX = "";
    var vertY = "";
    var vertZ = "";
    var index1 = "";
    var index2 = "";
    var index3 = "";

        for(var i = 0; i<req.responseText.length; i++){
        	if(req.responseText[i] == "v"){
        		i += 2;
        		while(req.responseText[i] != " "){
        			vertX += req.responseText[i];
        			i++;
        		}
        		i++;
        		while(req.responseText[i] != " "){
        			vertY += req.responseText[i];
        			i++;
        		}
        		i++;
        		while(req.responseText[i] != '\n'){
        			vertZ += req.responseText[i];
        			i++;
        		}
        		TeaPotVertArr.push(parseFloat(vertX));
        		TeaPotVertArr.push(parseFloat(vertY));
        		TeaPotVertArr.push(parseFloat(vertZ));

        		if(vertY > Ymax) Ymax = vertY;

  				vertX = "";
  				vertY = "";
  				vertZ = "";
        	}
        }

        for(var i = 0; i<req.responseText.length; i++){
        	if(req.responseText[i] == "f"){
        		i += 3;
        		while(req.responseText[i] != " "){
        			index1 += req.responseText[i];
        			i++;
        		}
        		i++;
        		while(req.responseText[i] != " "){
        			index2 += req.responseText[i];
        			i++;
        		}
        		i++;
        		while(req.responseText[i] != '\n'){
        			index3 += req.responseText[i];
        			i++;
        		}
  				TeaPotIndArr.push(parseInt(index1)-1);
  				TeaPotIndArr.push(parseInt(index2)-1);
  				TeaPotIndArr.push(parseInt(index3)-1);

  				index1 = "";
  				index2 = "";
  				index3 = "";
        	}
        }

  TeaPotVertBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, TeaPotVertBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(TeaPotVertArr), gl.STATIC_DRAW);

	TeaPotIndBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TeaPotIndBuffer);
  	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(TeaPotIndArr), gl.STATIC_DRAW);

  	for(var i=0; i<TeaPotVertArr.length; i+=3){
      //Set texture coords for each vertex
  		var X = TeaPotVertArr[i];
  		var Y = TeaPotVertArr[i+1];
  		var Z = TeaPotVertArr[i+2];

  		var Theta = Math.atan2(Z,X);

  		var S = (Theta+Math.PI)/(2*Math.PI);
  		var T = Y/Ymax;

      TextureCoordArr.push(S,T);
  	}

  	TextureBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, TextureBuffer);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(TextureCoordArr), gl.STATIC_DRAW);

  	for(var i =0; i<TeaPotVertArr.length/3; i++){
      //initialize 0's for normal vectors
    	NormalVectArr.push(Vector.create([0,0,0]));
    }

    for(var i = 0; i< TeaPotIndArr.length; i+=3){
      //calculate per face normals and accumulate them per vertex
    	var vert1 = TeaPotIndArr[i];
		  var vert2 = TeaPotIndArr[i+1];
		  var vert3 = TeaPotIndArr[i+2];

    	var Ax = TeaPotVertArr[3*(vert1)];
    	var Ay = TeaPotVertArr[3*(vert1)+1]; 
    	var Az = TeaPotVertArr[3*(vert1)+2];
     

    	var Bx = TeaPotVertArr[3*(vert2)];
    	var By = TeaPotVertArr[3*(vert2)+1]; 
    	var Bz = TeaPotVertArr[3*(vert2)+2];
      

    	var Cx = TeaPotVertArr[3*(vert3)];
    	var Cy = TeaPotVertArr[3*(vert3)+1]; 
    	var Cz = TeaPotVertArr[3*(vert3)+2];

    	var VectorF = Vector.create([Bx-Ax, By-Ay, Bz-Az]);
    	var VectorG = Vector.create([Cx-Ax, Cy-Ay, Cz-Az]);

    	var NormalVector = Vector.create([0,0,0]);
    	NormalVector = VectorF.cross(VectorG);
    	NormalVector = NormalVector.toUnitVector();


 		  NormalVectArr[vert1] = NormalVectArr[vert1].add(NormalVector);    	
    	NormalVectArr[vert2] = NormalVectArr[vert2].add(NormalVector);
    	NormalVectArr[vert3] = NormalVectArr[vert3].add(NormalVector);
    }
    

    for(var i =0; i< NormalVectArr.length; i++){
      //unitize normals
    	var tempVector = Vector.create(NormalVectArr[i]);
    	NormalVectArr[i] = tempVector.toUnitVector();
    }

    for(var i=0; i<NormalVectArr.length; i++){
      //store normals as xyz
    	NormalxyzArr.push(NormalVectArr[i].e(1));
    	NormalxyzArr.push(NormalVectArr[i].e(2));
    	NormalxyzArr.push(NormalVectArr[i].e(3));
    }

    NormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, NormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(NormalxyzArr), gl.STATIC_DRAW);

	var colors = [];

	for(var c = 0; c<TeaPotIndArr.length; c++){
		colors.push(0.5);
		colors.push(0.0);
		colors.push(1.0);
		colors.push(1.0);
	}


  	VerticesColorBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, VerticesColorBuffer);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  	
  }

  //setup table verts and indices 
  var TableVerts = [
      -5.0, 0.0, -10.0,
      -5.0, 0.0, 10.0,
      5.0, 0.0, -10.0,
      5.0, 0.0, -10.0,
      5.0, 0.0, 10.0,
      -5.0, 0.0, 10.0];

  colors = [
      0.0, 0.0, 0.0, 1.0, 
      0.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0, 
      0.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0, 
      0.0, 0.0, 0.0, 1.0];

  TableColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, TableColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  TableVertBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, TableVertBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(TableVerts), gl.STATIC_DRAW);
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

  var normalMatrix = mvMatrix.inverse();
  normalMatrix = normalMatrix.transpose();
  var nUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
  gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));

  var StateUniform = gl.getUniformLocation(shaderProgram, "StateUniform");
  gl.uniform1f(StateUniform, RenderState);
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




