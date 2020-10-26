function setup() {
    var canvas = document.getElementById('hw4canvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('path');
    slider.value = 0;

    function draw() {
        canvas.width = canvas.width;
        var tParam = slider.value * 0.01;
        console.log(tParam);
        var p0 = [0, 0];
        var d0 = [-1, 3];
        var p1 = [1, -1];
        var d1 = [-1, 3];
        var p2 = [3, -2];
        var d2 = [0, 3];
        var p3 = [-1, -3];
        var d3 = [1, 3];
        var p4 = [0, -4];
        var d4 = [2, 3];
        var p5 = [-1, -6];
        var d5 = [2, 3];
        var P0 = [p0, d0, p1, d1];
        var P1 = [p1, d1, p2, d2];
        var P2 = [p2, d2, p3, d3];
        var P3 = [p3, d3, p4, d4];
        var P4 = [p4, d4, p5, d5];
        var C0 = function(t_) {
            return Cubic(Hermite, P0, t_);
        };
        var C1 = function(t_) {
            return Cubic(Hermite, P1, t_);
        };
        var C2 = function(t_) {
            return Cubic(Hermite, P2, t_);
        };
        var C3 = function(t_) {
            return Cubic(Hermite, P3, t_);
        };
        var C4 = function(t_) {
            return Cubic(Hermite, P4, t_);
        };
        var C0prime = function(t_) {
            return Cubic(HermiteDerivative, P0, t_);
        };
        var C1prime = function(t_) {
            return Cubic(HermiteDerivative, P1, t_);
        };
        var C2prime = function(t_) {
            return Cubic(HermiteDerivative, P2, t_);
        };
        var C3prime = function(t_) {
            return Cubic(HermiteDerivative, P3, t_);
        };
        var C4prime = function(t_) {
            return Cubic(HermiteDerivative, P4, t_);
        };

        function setCanvasTransform(Tx) {
            context.setTransform(Tx[0], Tx[1], Tx[3], Tx[4], Tx[6], Tx[7]);
        }

        function moveToTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.moveTo(res[0], res[1]);
        }

        function lineToTx(loc, Tx) {
            var res = vec2.create();
            vec2.transformMat3(res, loc, Tx);
            context.lineTo(res[0], res[1]);
        }

        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        function drawCar(color) {
            context.fillStyle = color;
            context.beginPath();
            context.lineTo(10, 50);
            context.lineTo(10, 0);
            context.lineTo(40, 0);
            context.lineTo(40, 50);
            context.stroke();
            context.fill();
        }

        function drawTree() {
            context.beginPath();
            context.lineTo(0, 0);
            context.lineTo(-30, 0);
            context.lineTo(-15, -30);
            context.stroke();
            context.fill();
        }

        function circlePoint(color) {
            context.fillStyle = color;
            context.beginPath();
            context.arc(0, 0, 10, 0, Math.PI * 2, true);
            context.fill();
        }
        var Hermite = function(t) {
            return [
                2 * t * t * t - 3 * t * t + 1,
                t * t * t - 2 * t * t + t, -2 * t * t * t + 3 * t * t,
                t * t * t - t * t
            ];
        }
        var HermiteDerivative = function(t) {
            return [
                6 * t * t - 6 * t,
                3 * t * t - 4 * t + 1, -6 * t * t + 6 * t,
                3 * t * t - 2 * t
            ];
        }

        function drawObject(color, Tx) {
            context.beginPath();
            context.fillStyle = color;
            moveToTx([-.05, -.05], Tx);
            lineToTx([-.05, .05], Tx);
            lineToTx([.05, .05], Tx);
            lineToTx([.1, 0], Tx);
            lineToTx([.05, -.05], Tx);
            context.closePath();
            context.fill();
        }

        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.beginPath();
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
            console.log("t_end " + t_end);
        }

        var Ccomp = function(t) {
            if (t < 1) {
                var u = t;
                return C0(u);
            } else if(t < 2){
                var u = t - 1.0;
                return C1(u);
            } else {
                var u = t - 2.0;
                return C2(u);
            }
        }
        
        var Ccomp_tangent = function(t) {
            if (t < 1) {
                var u = t;
                return C0prime(u);
            } else if (t < 2) {
                var u = t - 1.0;
                return C1prime(u);
            } else {
                var u = t - 2.0;
                return C2prime(u);
            }
        }
        context.fillStyle = "green";
        var tree1 = mat3.create();
        mat3.fromTranslation(tree1, [800, 700]);
        setCanvasTransform(tree1);
        drawTree();
        var tree2 = mat3.create();
        mat3.fromTranslation(tree2, [300, 500]);
        setCanvasTransform(tree2);
        drawTree();
        var tree3 = mat3.create();
        mat3.fromTranslation(tree3, [500, 300]);
        setCanvasTransform(tree3);
        drawTree();
        var redPoint = mat3.create();
        mat3.fromTranslation(redPoint, [400, 800]);
        setCanvasTransform(redPoint);
        circlePoint("red");
        var orangePoint = mat3.create();
        mat3.fromTranslation(orangePoint, [500, 700]);
        setCanvasTransform(orangePoint);
        circlePoint("orange");
        var yellowPoint = mat3.create();
        mat3.fromTranslation(yellowPoint, [600, 600]);
        setCanvasTransform(yellowPoint);
        circlePoint("yellow");
        var greenPoint = mat3.create();
        mat3.fromTranslation(greenPoint, [350, 350]);
        setCanvasTransform(greenPoint);
        circlePoint("green");
        var bluePoint = mat3.create();
        mat3.fromTranslation(bluePoint, [250, 150]);
        setCanvasTransform(bluePoint);
        circlePoint("blue");
        var Tblue_to_canvas = mat3.create();
        mat3.fromTranslation(Tblue_to_canvas, [75, 625]);
        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [200, 120]);
        drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, "blue");
        drawTrajectory(0.0, 1.0, 100, C1, Tblue_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C2, Tblue_to_canvas, "green");
        drawTrajectory(0.0, 1.0, 100, C3, Tblue_to_canvas, "orange");
        drawTrajectory(0.0, 1.0, 100, C4, Tblue_to_canvas, "purple");

        var car_To_blue = mat3.create();
        mat3.fromTranslation(car_To_blue, Ccomp(tParam));
        var Tcar_to_canvas = mat3.create();
        var tangent = Ccomp_tangent(tParam);
        var angle = Math.atan2(tangent[1],tangent[0]);
        mat3.rotate(car_To_blue,car_To_blue,angle);
        mat3.multiply(Tcar_to_canvas, Tblue_to_canvas, car_To_blue);
        //drawCar("pink");
        drawCar("pink");
    }
    slider.addEventListener("input", draw);
    draw();
}
window.onload = setup();