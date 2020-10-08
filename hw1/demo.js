function setup() {
    var slider = document.getElementById('myRange');
    slider.value = 00;
    function drawShapes() {
        var canvas = document.getElementById("chrischuscanvas");
        var context = canvas.getContext('2d');
        var context2 = canvas.getContext('2d');
        var dx = slider.value;
        canvas.width = canvas.width;
        function drawQuad() {
            context.beginPath();
            context.fillStyle = "green";
            context.moveTo(20, 20);
            context.lineTo(20, 120);
            context.lineTo(120, 120);
            context.lineTo(120, 20);
            context.closePath();
            context.fill();
        }

        function drawCircle() {

            context2.beginPath();
            context2.fillStyle = "orange";
            context2.beginPath();
            context2.arc(200, 75, 50, 0, 2 * Math.PI);
            context2.stroke();
            context2.fill();
        }
        context.save();
        context2.save();
        context2.translate(0, dx);
        context.translate(dx, 0);
        drawCircle();
        drawQuad();
        context.restore();
        context2.restore();
    }
    slider.addEventListener("input", drawShapes);
    drawShapes();
}
window.onload = setup;