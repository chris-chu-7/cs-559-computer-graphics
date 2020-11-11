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

        function drawObject(color, TxU, scale){

        }

        function drawCamera(color, TxU, scale){
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx, Tx, [scale, scale, scale]);
            context.beginPath();
            context.strokeStyle = color;
            moveToTx([-3,-3,-2],Tx);
            lineToTx([3,-3,-2],Tx);
            lineToTx([3,3,-2],Tx);
            lineToTx([-3,3,-2],Tx);
            moveToTx([3,-3,-2],Tx);
            lineToTx([2,-2,0],Tx);
            lineToTx([2,2,0],Tx);
            lineToTx([3,3,-2],Tx);
            moveToTx([2,-2,0],Tx);
            lineToTx([-2,-2,0],Tx);
            lineToTx([-2,2,0],Tx);
            lineToTx([2,2,0],Tx);
            moveToTx([-2,-2,0],Tx);
            lineToTx([-3,-3,-2],Tx);
            lineToTx([-3,3,-2],Tx);
            lineToTx([-2,2,0],Tx);
            context.stroke();
        }

        function draw3DAxes(color,TxU,scale) {
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx,Tx,[scale,scale,scale]);
    
            context.strokeStyle=color;
            context.beginPath();
            // Axes
            moveToTx([1.2,0,0],Tx);
            lineToTx([0,0,0],Tx);
            lineToTx([0,1.2,0],Tx);
            moveToTx([0,0,0],Tx);
            lineToTx([0,0,1.2],Tx);
            // Arrowheads
            moveToTx([1.1,.05,0],Tx);
            lineToTx([1.2,0,0],Tx);
            lineToTx([1.1,-.05,0],Tx);
            moveToTx([.05,1.1,0],Tx);
            lineToTx([0,1.2,0],Tx);
            lineToTx([-.05,1.1,0],Tx);
            moveToTx([.05,0,1.1],Tx);
            lineToTx([0,0,1.2],Tx);
            lineToTx([-.05,0,1.1],Tx);
            // X-label
            moveToTx([1.3,-.05,0],Tx);
            lineToTx([1.4,.05,0],Tx);
            moveToTx([1.3,.05,0],Tx);
            lineToTx([1.4,-.05,0],Tx);
            // Y-label
            moveToTx([-.05,1.4,0],Tx);
            lineToTx([0,1.35,0],Tx);
            lineToTx([.05,1.4,0],Tx);
            moveToTx([0,1.35,0],Tx);
            lineToTx([0,1.28,0],Tx);
            // Z-label
            moveToTx([-.05,0,1.3],Tx);
            lineToTx([.05,0,1.3],Tx);
            lineToTx([-.05,0,1.4],Tx);
            lineToTx([.05,0,1.4],Tx);
    
            context.stroke();
        }


        function drawUVWAxes(color,TxU,scale) {
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx,Tx,[scale,scale,scale]);
    
            context.strokeStyle=color;
            context.beginPath();
            // Axes
            moveToTx([1.2,0,0],Tx);
            lineToTx([0,0,0],Tx);
            lineToTx([0,1.2,0],Tx);
            moveToTx([0,0,0],Tx);
            lineToTx([0,0,1.2],Tx);
            // Arrowheads
            moveToTx([1.1,.05,0],Tx);
            lineToTx([1.2,0,0],Tx);
            lineToTx([1.1,-.05,0],Tx);
            moveToTx([.05,1.1,0],Tx);
            lineToTx([0,1.2,0],Tx);
            lineToTx([-.05,1.1,0],Tx);
            moveToTx([.05,0,1.1],Tx);
            lineToTx([0,0,1.2],Tx);
            lineToTx([-.05,0,1.1],Tx);
            // U-label
            moveToTx([1.3,.05,0],Tx);
            lineToTx([1.3,-.035,0],Tx);
            lineToTx([1.35,-.05,0],Tx);
            lineToTx([1.4,-.035,0],Tx);
            lineToTx([1.4,.05,0],Tx);
            // V-label
            moveToTx([-.05,1.4,0],Tx);
            lineToTx([0,1.3,0],Tx);
            lineToTx([.05,1.4,0],Tx);
            // W-label
            moveToTx([-.1,0,1.3],Tx);
            lineToTx([-.05,0,1.4],Tx);
            lineToTx([-0,0,1.3],Tx);
            lineToTx([.05,0,1.4],Tx);
            lineToTx([.1,0,1.3],Tx);
    
            context.stroke();
        }

        var Hermite = function(t) {
            return [
            2*t*t*t-3*t*t+1,
            t*t*t-2*t*t+t,
            -2*t*t*t+3*t*t,
            t*t*t-t*t
            ];
        }
    
        var HermiteDerivative = function(t) {
            return [
            6*t*t-6*t,
            3*t*t-4*t+1,
            -6*t*t+6*t,
            3*t*t-2*t
            ];
        }

        function Cubic(basis,P,t){
            var b = basis(t);
            var result=vec3.create();
            vec3.scale(result,P[0],b[0]);
            vec3.scaleAndAdd(result,result,P[1],b[1]);
            vec3.scaleAndAdd(result,result,P[2],b[2]);
            vec3.scaleAndAdd(result,result,P[3],b[3]);
            return result;
        }

        var CameraCurve = function(angle) {
            var distance = 120.0;
            var eye = vec3.create();
            eye[0] = distance*Math.sin(viewAngle);
            eye[1] = 100;
            eye[2] = distance*Math.cos(viewAngle);  
            return [eye[0],eye[1],eye[2]];
        }

        function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
            context.strokeStyle=color;
            context.beginPath();
            moveToTx(C(t_begin),Tx);
            for(var i=1;i<=intervals;i++){
                var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
                lineToTx(C(t),Tx);
            }
            context.stroke();
        }




    


    }

    
    curveSlider.addEventListener("input", draw);
    rotateSlider.addEventListener("input", draw);
    draw();




}

window.onload = setup;