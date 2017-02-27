var canvas = document.getElementById("slate");
var stopb = document.getElementById("stopb");
var dvd = document.getElementById("dvd");
var dot = document.getElementById("circle");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "dvd_logo.jpg";

ctx.fillStyle = "#0802df";

var clear = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var ret = 0;

var animateDot = function() {

    window.cancelAnimationFrame(ret);

    clear();
    var radius =  25;
    var center = canvas.width/2;
    var bounce = false;
    
    var circle = function() {
	
	clear();
	//console.log("dot!");
	ctx.beginPath();
	ctx.arc(center, canvas.height/2, radius,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	
	//console.log(ret);
	console.log(radius == canvas.height/2);
	
	if (radius == canvas.height/2){
	    bounce = true;
	}
	if (radius <= 1){
	    bounce = false;
	}
	
	if (bounce){
	    radius--;
	}else{
	    radius++;
	}
	
	ret = window.requestAnimationFrame( circle );
    };
    circle();
};

var stopit = function() {
    window.cancelAnimationFrame(ret);
};

var dvdStandby = function() {

    window.cancelAnimationFrame(ret);
    
    clear();
    var x = Math.floor(Math.random()*450);
    var y = Math.floor(Math.random()*450);
    ctx.drawImage(img,x,y,80,35);
    
    var vert = true;
    var horiz = true;
    
    var moving = function(){
	clear();

	if (x >= 420){
	    horiz = false;
	}
	if (x <= 0){
	    horiz = true;
	}
	if (y >= 465){
	    vert = false;
	}
	if (y <= 0){
	    vert = true;
	}

	if (horiz){ x++;
	}else{ x--;}
	if (vert){ y++;
	}else{ y--; }

	//console.log("x:"+x);
	//console.log("y:"+y);
	ctx.drawImage(img,x,y,80,35);

	ret = window.requestAnimationFrame( moving );
    };
    moving();
};

stopb.addEventListener( "click",  stopit );
dot.addEventListener( "click", animateDot );
dvd.addEventListener( "click", dvdStandby );

