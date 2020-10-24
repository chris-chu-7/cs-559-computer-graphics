function setup(){
    var canvas = document.getElementById('hw4canvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('path');
    slider.value = 0;

    function setCanvasTransform(Tx) {
        context.setTransform(Tx[0], Tx[1], Tx[3], Tx[4], Tx[6], Tx[7]);
    }
    
    function drawCar(color){
        context.fillStyle = color;
        context.beginPath();
        context.lineTo(10, 50);
        context.lineTo(10, 0);
        context.lineTo(40, 0);
        context.lineTo(40, 50);
        context.stroke();
        context.fill();
    }

    function draw(){
        var car = mat3.create();
        mat3.fromTranslation(car, [500, 900]);
        setCanvasTransform(car);
        drawCar('rgb(255,20,147)');
    }

    draw();
  }
  
  window.onload = setup();