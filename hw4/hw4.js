function setup(){
    var canvas = document.getElementById('hw4canvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('path');
    slider.value = 0;
    
    function drawCar(){
        context.beginPath();
        context.rect(20, 20, 150, 100);
        context.stroke();
        context.fill();
    }

    function draw(){
        drawCar();
    }

    draw();
  }
  
  window.onload = setup();