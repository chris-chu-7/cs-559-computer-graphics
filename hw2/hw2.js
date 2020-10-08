function time(){
  
  var date = new Date();
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.save();
  context.clearRect(0, 0, 300, 300);
  context.translate(175, 175);
  context.scale(0.4, 0.4);
  context.rotate(-Math.PI / 2);
  context.strokeStyle = 'green';
  context.fillStyle = 'black';
  context.lineWidth = 10;
  context.lineCap = 'round';
  
  context.save();
  
  for(var i = 0; i < 12; i++){
    context.beginPath();
    context.rotate(Math.PI/6);
    context.moveTo(300, 0);
    context.lineTo(360, 0);
    context.stroke();
  }
  
  context.restore();
  
  
  
  context.save();
  context.lineWidth = 3;
  for(var j = 0; j < 60; j++){
    if(j % 5 !== 0){
      context.beginPath();
      context.moveTo(330, 0);
      context.lineTo(360, 0);
      context.stroke();
    }
    context.rotate(Math.PI/30);
  }
  
  context.restore();
  
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds(); 
  
  
  
 
  context.strokeStyle = 'orange';
  context.save();
  context.rotate(seconds * (Math.PI / 30));
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(-30, 0);
  context.lineTo(320, 0);
  context.stroke();
  context.restore();
  
  context.strokeStyle = 'red';
   context.save();
  context.rotate(minutes * (Math.PI/30) + seconds * (Math.PI / (30 * 60)));
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(-20, 0);
  context.lineTo(300, 0);
  context.stroke();
  context.restore();
  
  context.strokeStyle = 'blue';
  context.save();
  context.rotate(hours * (Math.PI/6) + minutes * (Math.PI/(60 * 6))  + seconds * (Math.PI / (60 * 6 * 3600)));
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(130, 0);
  context.stroke();
  context.restore();
  
  
  
  context.beginPath();
  context.arc(0, 0, 400, 0, Math.PI * 2, true);
  context.stroke();
  
  context.restore();
window.requestAnimationFrame(time);
}

window.requestAnimationFrame(time);