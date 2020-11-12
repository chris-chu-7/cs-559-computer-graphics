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
        var viewAngle = rotateSlider.value * 0.005 * Math.PI;

        function moveToTx(loc,Tx){
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            context.moveTo(res[0], res[1]);
        }

        function lineToTx(loc, Tx){
            var res = vec3.create();
            vec3.transformMat4(res, loc, Tx);
            context.lineTo(res[0], res[1]);
        }

        function drawRocket(color, TxU, scale){
            var Tx = mat4.clone(TxU);
            mat4.scale(Tx, Tx, [scale, scale, scale]);
            context.beginPath();
            context.strokeStyle = color;
            moveToTx([0, 0.5, 0.5], Tx);
            lineToTx([0, 2, 1], Tx);
            moveToTx([0, 2, 1], Tx);
            lineToTx([0.5, 1, -1], Tx);

            context.stroke();
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

        var p0=[0,0,0];
	var d0=[100,300,0];
	var p1=[100,100,0];
	var d1=[-100,300,0];
	var p2=[200,200,0];
	var d2=[0,300,0];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};

	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
      
    var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else {
            var u = t-1.0;
            return C1(u);
        }          
	}

    var Ccomp_tangent = function(t) {
        if (t<1){
            var u = t;
            return C0prime(u);
        } else {
            var u = t-1.0;
            return C1prime(u);
        }          
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

        var eyeCamera = CameraCurve(viewAngle);
        var origin = vec3.fromValues(0, 0, 0); 
        var verticalY = vec3.fromValues(0, 100, 0);
        var TlookAtCamera = mat4.create();
        mat4.lookAt(TlookAtCamera, eyeCamera, origin, verticalY);

        var eyeObserver = vec3.fromValues(500, 300, 500);
        var targetObserver = vec3.fromValues(0, 50, 0);
        var upObserver = vec3.fromValues(0, 1, 0);
        var TlookAtObserver = mat4.create();
        mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

          // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[200,300,0]);  // Move the center of the
                                                  // "lookAt" transform (where
                                                  // the camera points) to the
                                                  // canvas coordinates (200,300)
	mat4.scale(Tviewport,Tviewport,[100,-100,1]); // Flip the Y-axis,
                                                  // scale everything by 100x
    // make sure you understand these    

    context = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);
    //mat4.perspective(TprojectionCamera,Math.PI/4,1,-1,1); // Use for perspective teaser!

    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);
     
    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);
      
	// Create model(ing) transform
    // (from moving object to world)
    var Tmodel = mat4.create();
	mat4.fromTranslation(Tmodel,Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1],tangent[0]);
	mat4.rotateZ(Tmodel,Tmodel,angle);

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera,TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

    context = cameraContext;
    drawRocket("purple",tVP_PROJ_VIEW_Camera,100.0);
    draw3DAxes("grey",tVP_PROJ_VIEW_Camera,100.0);

    context = observerContext;
    drawCamera("blue",tVP_PROJ_VIEW_MOD2_Observer,10.0); 
    drawRocket("purple",tVP_PROJ_VIEW_MOD1_Observer,100.0);
    draw3DAxes("grey",tVP_PROJ_VIEW_MOD1_Observer,100.0);

    /*
    //draw a cube now.
    var boxVertices = 
    [
        //Top
        -1.0, 1.0, -1.0, 0.1, 0.1, 0.9,
        -1.0, 1.0, 1.0, 0.1, 0.1, 0.9,
        1.0, 1.0, 1.0, 0.1, 0.1, 0.9,
        1.0, 1.0, -1.0, 0.1, 0.1, 0.9,

        //Left
        -1.0, 1.0, 1.0, 0.2, 0.2, 0.8,
        -1.0, -1.0, 1.0, 0.2, 0.2, 0.8,
        -1.0, -1.0, -1.0, 0.2, 0.2, 0.8,
        -1.0, 1.0, -1.0, 0.2, 0.2, 0.8,
        
        //Right
        1.0, 1.0, 1.0, 0.3, 0.3, 0.7,
        1.0, -1.0, 1.0, 0.3, 0.3, 0.7,
        1.0, -1.0, -1.0, 0.3, 0.3, 0.7,
        1.0, 1.0, -1.0, 0.3, 0.3, 0.7,


        //Front
        1.0, 1.0, 1.0, 0.4, 0.4, 0.6,
        1.0, -1.0, 1.0, 0.4, 0.4, 0.6,
        -1.0, -1.0, 1.0, 0.4, 0.4, 0.6,
        -1.0, 1.0, 1.0, 0.4, 0.4, 0.6,


        //Back
        1.0, 1.0, -1.0, 0.5, 0.5, 0.5,
        1.0, -1.0, -1.0, 0.5, 0.5, 0.5,
        -1.0, -1.0, -1.0, 0.5, 0.5, 0.5,
        -1.0, 1.0, -1.0, 0.5, 0.5, 0.5,



        //Bottom
        -1.0, -1.0, -1.0, 0.6, 0.6, 0.4,
        -1.0, -1.0, 1.0, 0.6, 0.6, 0.4,
        1.0, -1.0, 1.0, 0.6, 0.6, 0.4,
        1.0, -1.0, -1.0, 0.6, 0.6, 0.4,

    ];

    var boxIndices = 
    [   
        //top
        0, 1, 2,
        0, 2, 3,

        //left
        5, 4, 6,
        6, 4, 7,

        //right
        8, 9, 10,
        8, 10, 11,

        //front
        13, 12, 14, 
        15, 14, 12, 

        //back
        16, 17, 18, 
        16, 18, 19,

        //bottom
        21, 20, 22,
        22, 20, 23


    ];

    var gl = cameraCanvas.getContext('webgl');
    var boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);
    console.log(boxVertices);
    console.log(boxIndices);*/






    


    }

    
    curveSlider.addEventListener("input", draw);
    rotateSlider.addEventListener("input", draw);
    draw();




}

window.onload = setup;