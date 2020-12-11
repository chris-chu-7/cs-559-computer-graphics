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

    // Attach the shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);	    
    
    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);
    
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);    
    
    // this gives us access to the matrix uniform
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");

    //DATA
    



    function draw(){
        var hor_angle = hor.value*0.01*Math.PI;
        var ver_angle = ver.value*0.01*Math.PI;
    }

    hor.addEventListener("input", draw);
    ver.addEventListener("input", draw);


}

window.onload = start;


