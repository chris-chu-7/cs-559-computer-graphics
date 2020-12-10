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
    console.log("Beginning of Hw 7.");
    var hor = document.getElementById('hor');
    hor.value = 0;
    var ver = document.getElementById('slider2');
    ver.value = 0;



    function draw(){

    }

    hor.addEventListener("input", draw);
    ver.addEventListener("input", draw);


}

window.onload = start;