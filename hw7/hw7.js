//Assignment 7 Requirements: 
//https://graphics.cs.wisc.edu/WP/cs559-fall2020/2020/11/29/programming-assignment-7/
/* 
* Write a Vertex Shader
* Write a Fragment Shader
* Compile and link these Shaders
* Define your own vertex attributes
*   - Pointers Query the data
*   - Defining Associated Data
*   - Dispatch data to GPU
*   - Any other necessary operation
*   - Define geometry via trangles/shapes 
    and buffer data to the GPU
*   - Get all the transform into uniforms
*   - Load Texture Images
*   - Use Z-Buffer Visibility mechanism
*   - Polyhedral Nonflat object please!
*   - Use diffuse/specular shading. 
*   - Some way to change the scene rather than just
    -rotation.
*   - Spin a camera, and properly place this camera

* BONUS:  
*   - Non-trivial lighting + texturing 
*   - Model objects
*   - Multiple textures
*   - Comple objects
*   - Interesting camera motion
*
* LINK: 
*   - https://jsbin.com/hagakel/edit?html,js,output
*/

function start() {

    //initialize graphics libraries
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    //initialize the slider and their values 
    var hor = document.getElementById('hor');
    hor.value = 0;
    var ver = document.getElementById('ver');
    ver.value = 0;

    //read shader source
    var vertexSource = document.getElementById("vertexShader").text;
    var fragmentSource = document.getElementById("fragmentShader").text;

    //compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(vertexShader));
        return null;
    }

    //compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(fragmentShader));
        return null;
    }

    //attach shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        alert("Couldn't  initialize shaders");
    }
    gl.useProgram(shaderProgram);

    //set up communication to pass vertex shader positions and colors as attributes
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);


    //give access to the matrix uniform
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram, "uMVP");

    //DATA
     // vertex positions
     var vertexPos = new Float32Array(
        [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,
           1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,
           1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,
          -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,
          -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,
           1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1 ]);

    // vertex colors
    var vertexColors = new Float32Array(
        [  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
           1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
           0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
           1, 1, 0,   1, 1, 0,   1, 1, 0,   1, 1, 0,
           1, 0, 1,   1, 0, 1,   1, 0, 1,   1, 0, 1,
           0, 1, 1,   0, 1, 1,   0, 1, 1,   0, 1, 1 ]);
    
    // element index array
    var triangleIndices = new Uint8Array(
        [  0, 1, 2,   0, 2, 3,    // front
           4, 5, 6,   4, 6, 7,    // right
           8, 9,10,   8,10,11,    // top
           12,13,14,  12,14,15,    // left
           16,17,18,  16,18,19,    // bottom
	   20,21,22,  20,22,23 ]); // back

    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 24;
    
    // a buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 24;

    // a buffer for indices
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);  



    function draw(){
        var hor_angle = hor.value*0.01*Math.PI;
        var ver_angle = ver.value*0.01*Math.PI;
    }

    hor.addEventListener("input", draw);
    ver.addEventListener("input", draw);


}

window.onload = start;


