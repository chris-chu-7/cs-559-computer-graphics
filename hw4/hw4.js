function setup(){
    var canvas = document.getElementById('hw4canvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('path');
    slider.value = 0;
    
    function drawCar(color){
        context.fillStyle = color;
        context.beginPath();
        context.rect(20, 20, 60, 100);
        context.stroke();
        context.fill();
    }

    function draw(){
        drawCar('rgb(255,20,147)');
    }

    draw();
  }
  
  window.onload = setup();