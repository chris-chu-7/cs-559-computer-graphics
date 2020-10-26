function setup(){
    var canvas = document.getElementById('hw4canvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('path');
    slider.value = 0;

    var p0=[0,0];
	var d0=[1,3];
	var p1=[1,1];
	var d1=[-1,3];
	var p2=[2,2];
	var d2=[0,3];

    var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents

    var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};

    var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
    var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
    
    function setCanvasTransform(Tx) {
        context.setTransform(Tx[0], Tx[1], Tx[3], Tx[4], Tx[6], Tx[7]);
    }

  
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx);
		console.log("move res 0 " + res[0]);
		console.log("move res 1 " + res[1]);
         context.lineTo(res[0],res[1]);
         //context.stroke();
        }
	

        function Cubic(basis,P,t){
            var b = basis(t);
            var result=vec2.create();
            vec2.scale(result,P[0],b[0]);
            vec2.scaleAndAdd(result,result,P[1],b[1]);
            vec2.scaleAndAdd(result,result,P[2],b[2]);
            vec2.scaleAndAdd(result,result,P[3],b[3]);
            return result;
        }
    function drawCar(color){
        context.fillStyle = color;
        context.beginPath();
        context.lineTo(10, 50);
        context.lineTo(10, 0);
        context.lineTo(40, 0);
        context.lineTo(40, 50);
        context.stroke();
        context.fill();
    }

    function drawTree(){
        context.beginPath();
        context.lineTo(0,0);
        context.lineTo(-30, 0);
        context.lineTo(-15, -30);
        context.stroke();
        context.fill();
    }

    function circlePoint(color){
        context.fillStyle = color;
        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2, true);
        context.fill();
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


    function draw(){

        //car
        var car = mat3.create();
        mat3.fromTranslation(car, [500, 900]);
        setCanvasTransform(car);
        drawCar('rgb(255,20,147)');

        context.fillStyle = "green";

        //first tree
        var tree1 = mat3.create();
        mat3.fromTranslation(tree1, [800, 700]);
        setCanvasTransform(tree1);
        drawTree();


        //second tree
        var tree2 = mat3.create();
        mat3.fromTranslation(tree2, [300, 500]);
        setCanvasTransform(tree2);
        drawTree();


        //third tree
        var tree3 = mat3.create();
        mat3.fromTranslation(tree3, [500, 300]);
        setCanvasTransform(tree3);
        drawTree();

        //red point
        var redPoint = mat3.create();
        mat3.fromTranslation(redPoint, [400, 800]);
        setCanvasTransform(redPoint);
        circlePoint("red");

        //orange point
        var orangePoint = mat3.create();
        mat3.fromTranslation(orangePoint, [500, 700]);
        setCanvasTransform(orangePoint);
        circlePoint("orange");

        //yellow point
        var yellowPoint = mat3.create();
        mat3.fromTranslation(yellowPoint, [600, 600]);
        setCanvasTransform(yellowPoint);
        circlePoint("yellow");

        //green point
        var greenPoint = mat3.create();
        mat3.fromTranslation(greenPoint, [350, 350]);
        setCanvasTransform(greenPoint);
        circlePoint("green");

        //blue point
        var bluePoint = mat3.create();
        mat3.fromTranslation(bluePoint, [250, 150]);
        setCanvasTransform(bluePoint);
        circlePoint("blue");

        var Tblue_to_canvas = mat3.create();
	    mat3.fromTranslation(Tblue_to_canvas,[-125,510]);
       // mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[150,-150]);
        //setCanvasTransform(Tblue_to_canvas);
        mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[200,120]); // Flip the Y-axis

        drawTrajectory(0.0,1.0,100,C1,Tblue_to_canvas,"blue");

        var Tred_to_canvas = mat3.create();
	    mat3.fromTranslation(Tred_to_canvas,[200,510]);
       // mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[150,-150]);
        //setCanvasTransform(Tblue_to_canvas);
        mat3.scale(Tred_to_canvas,Tred_to_canvas,[-200,120]); // Flip the Y-axis

        drawTrajectory(0.0,1.0,100,C1,Tred_to_canvas,"red");

    }

    draw();

  }
  
  window.onload = setup();