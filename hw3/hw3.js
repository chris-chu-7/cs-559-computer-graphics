function setup() {
    var date = new Date();
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');


    function draw() {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        canvas.width = canvas.width;



        function setCanvasTransform(Tx) {
            context.setTransform(Tx[0], Tx[1], Tx[3], Tx[4], Tx[6], Tx[7]);
        }

        function circle(color) {
            context.strokeStyle = color;
            context.beginPath();
            context.arc(175, 175, 400, 0, Math.PI * 2, true);
            context.stroke();
        }

        function markers(color) {
            context.lineWidth = 3;
            context.strokeStyle = color;
            for (var j = 0; j < 60; j++) {
                if (j % 5 !== 0) {
                    context.beginPath();
                    context.moveTo(330, 0);
                    context.lineTo(360, 0);
                    context.stroke();
                }
                context.rotate(Math.PI / 30);
            }
        }

        function secondHand(color) {
            context.strokeStyle = 'orange';
            context.lineWidth = 6;
            context.beginPath();
            context.moveTo(-30, 0);
            context.lineTo(320, 0);
            context.stroke();
        }

        function minuteHand(color) {
            context.strokeStyle = 'red';

            context.lineWidth = 10;
            context.beginPath();
            context.moveTo(-20, 0);
            context.lineTo(300, 0);
            context.stroke();

        }

        function hourHand(color) {

        }




        var TCircle = mat3.create();
        mat3.fromTranslation(TCircle, [150, 150]);
        mat3.scale(TCircle, TCircle, [0.4, 0.4]);
        setCanvasTransform(TCircle);
        circle("blue");


        var TMarker = mat3.create();
        mat3.fromTranslation(TMarker, [170, 170]);
        mat3.multiply(TMarker, TCircle, TMarker);
        setCanvasTransform(TMarker);
        markers("green");


        var TsecondHand = mat3.create();
        mat3.rotate(TsecondHand, TsecondHand, seconds * (Math.PI / 30));
        secondHand("orange");

        var TminuteHand = mat3.create();
        mat3.rotate(TminuteHand, TminuteHand, minutes * (Math.PI / 30) + seconds * (Math.PI / (30 * 60)));
        minuteHand("red");




    }


    draw();
    window.requestAnimationFrame(time);
}

window.onload = setup;
window.requestAnimationFrame(time);