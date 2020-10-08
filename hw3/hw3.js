function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    
    context.scale(0.4, 0.4)
  
    function draw() {
	canvas.width = canvas.width;

	
	function setCanvasTransform(Tx) {
	    context.setTransform(Tx[0],Tx[1],Tx[3],Tx[4],Tx[6],Tx[7]);
	}

	function circle(color) {
      context.scale(0.4, 0.4)
      context.strokeStyle = color;
	   context.beginPath();
       context.arc(175, 175, 400, 0, Math.PI * 2, true);
       context.stroke();
	}
	
      
      var TCircle = mat3.create();
      mat3.fromTranslation(TCircle,[150,150]);
      setCanvasTransform(TCircle);
      circle("blue");


    }


    draw();
}
window.onload = setup;