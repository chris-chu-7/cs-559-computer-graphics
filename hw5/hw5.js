function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    var context = cameraContext; 

    function draw() {
      
	observerCanvas.width = observerCanvas.width;
	cameraCanvas.width = cameraCanvas.width;

	var tParam = slider1.value*0.015;
    var viewAngle = slider2.value*0.01*Math.PI;
     
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
    function drawRocket(color, TxU, scale){
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.05,-.05,.03],Tx);
	    lineToTx([-.05,.05,.03],Tx);
        lineToTx([.05,.05,.03],Tx);
      	lineToTx([.1,0,.03],Tx);
        lineToTx([.05,-.05,.03],Tx);
        moveToTx([-.05,-.05,-.03],Tx);
	    lineToTx([-.05,.05,-.03],Tx);
        lineToTx([.05,.05,-.03],Tx);
      	lineToTx([.1,0,-.03],Tx);
        lineToTx([.05,-.05,-.03],Tx);
	    context.closePath();
	    context.fill();
    }
	
    function drawCamera(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.strokeStyle = color;
        // Twelve edges of a cropped pyramid
        moveToTx([-6,-6,-4],Tx);lineToTx([6,-6,-4],Tx);
        lineToTx([6,6,-4],Tx);lineToTx([-6,6,-4],Tx);
        moveToTx([6,-6,-4],Tx);lineToTx([4,-4,0],Tx);
        lineToTx([4,4,0],Tx);lineToTx([6,6,-4],Tx);
        moveToTx([4,-4,0],Tx);lineToTx([-4,-4,0],Tx);
        lineToTx([-4,4,0],Tx);lineToTx([4,4,0],Tx);
        moveToTx([-4,-4,0],Tx);lineToTx([-6,-6,-4],Tx);
        lineToTx([-6,6,-4],Tx);lineToTx([-4,4,0],Tx);
        context.stroke();
    }
      
    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // X-label
	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);
        // Y-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
        moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);
	    // Z-label
	    moveToTx([-.05,0,1.3],Tx);
	    lineToTx([.05,0,1.3],Tx);
	    lineToTx([-.05,0,1.4],Tx);
	    lineToTx([.05,0,1.4],Tx);

	    context.stroke();
	}



    function draw2DAxes(color,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    moveToTx([120,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,120,0],Tx);
	    moveToTx([110,5,0],Tx);lineToTx([120,0,0],Tx);lineToTx([110,-5,0],Tx);
	    moveToTx([5,110,0],Tx);lineToTx([0,120,0],Tx);lineToTx([-5,110,0],Tx);

	    moveToTx([130,0,0],Tx);lineToTx([140,10,0],Tx);
	    moveToTx([130,10,0],Tx);lineToTx([140,0,0],Tx);

        moveToTx([0,128,0],Tx);lineToTx([5,133,0],Tx);lineToTx([10,128,0],Tx);
        moveToTx([5,133,0],Tx);lineToTx([5,140,0],Tx);
	    context.stroke();
	}

    function drawUpVector(color,vecUp,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    moveToTx([0,0,0],Tx);
        lineToTx(vecUp,Tx);
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
	
    var p0=[0,0,100];
    var d0=[50,100,100];
    var p1=[80,170,-50];
    var d1=[-200,375,25];
    var p2=[200,100,-25];
    var d2=[0,150,200];
    var p3=[100, 100, 100]; 
    var d3=[0, 0, 100];

    var P0 = [p0,d0,p1,d1]; // First two points and tangents
    var P1 = [p1,d1,p2,d2]; // Last two points and tangents
    var P2 = [p2, d2, p3, d3];

    var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
    var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
    var C2 = function(t_) {return Cubic(Hermite,P2,t_);};


    var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
    var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
    var C2prime = function(t_) {return Cubic(HermiteDerivative,P2,t_);};

      
    var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else if(t < 2) {
            var u = t-1.0;
            return C1(u);
        } else {
            var u = t-2.0;
            return C2(u);
        }          
    }

    var Ccomp_tangent = function(t) {
        if (t<1){
            var u = t;
            return C0prime(u);
        } else if(t < 2) {
            var u = t-1.0;
            return C1prime(u);
        } else {
            var u = t-2.0;
            return C2prime(u);
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
    var targetCamera = vec3.fromValues(0,0,0); 
    var upCamera = vec3.fromValues(0,100,0); 
	var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

    var eyeObserver = vec3.fromValues(500,300,500);
    var targetObserver = vec3.fromValues(0,50,0); 
    var upObserver = vec3.fromValues(0,1,0); 
	var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
      
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[200,300,0]);  
                                                
	mat4.scale(Tviewport,Tviewport,[100,-100,1]); 
                                                 

    context = cameraContext;

    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);

    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);

    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);
      

    var Tmodel = mat4.create();
	mat4.fromTranslation(Tmodel,Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1],tangent[0]);
	mat4.rotateZ(Tmodel,Tmodel,angle);


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
    draw2DAxes("black", mat4.create());
	draw3DAxes("grey",tVP_PROJ_VIEW_Camera,100.0);
	drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Camera,"red");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"blue");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Camera,"green");

    drawRocket("black",tVP_PROJ_VIEW_MOD_Camera,100.0);
      
    context = observerContext;
	draw3DAxes("grey",tVP_PROJ_VIEW_Observer,100.0);  
    drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Observer,"red");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Observer,"blue");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Observer,"green");

    drawRocket("black",tVP_PROJ_VIEW_MOD1_Observer,100.0);     
    drawCamera("orange",tVP_PROJ_VIEW_MOD2_Observer,10.0); 
    }
    
  
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;
