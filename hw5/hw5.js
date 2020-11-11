function setup() {
    var observerCanvas = document.getElementById("observerCanvas");
    var cameraCanvas = document.getElementById("cameraCanvas");
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var curveSlider = document.getElementById('slider1');
    var rotateSlider = document.getElementById('slider2');
    curveSlider.value = 0;
    rotateSlider.value = 0; 
}

window.onload = setup;