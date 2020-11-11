function setup() {
    var observerCanvas = document.getElementById("observerCanvas");
    var cameraCanvas = document.getElementById("cameraCanvas");
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var curveSlider = document.getElementById('slider1');
    var rotateSlider = document.getElementById('slider2');
    curveSlider.value = 0;
    rotateSlider.value = 0; 

    var context = cameraContext;

    function draw(){
        
        observerCanvas.width = observerCanvas.width;
        cameraCanvas.width = cameraCanvas.width;

        var tParam = curveSlider.value * 0.01;
        var viewAngle = rotateSlider.value * 0.429 * Math.PI;

        function moveToTx(){
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            context.moveTo(res[0], res[1]);
        }

        function lineToTx(){
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            context.lineTo(res[0], res[1]);
        }


    }

    draw();
    curveSlider.addEventListener("input", draw);
    rotateSlider.addEventListener("input", draw);
    




}

window.onload = setup;