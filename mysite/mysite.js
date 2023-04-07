



var canvas;
var ctx;
var w = 1000;
var h = 900;











 var canvas = document.getElementById("myCanvas");
 var c = canvas.getContext("2d");
 var tx = window.innerWidth;
 var ty = window.innerHeight;
 canvas.width = tx;
 canvas.height = ty;
 arc = 30;
 
 
 var mousex = 0;
 var mousey = 0;

addEventListener("mousemove" ,function(){
    mousex = event.clientX;
    mousey = event.clientY;
});
var grav = 0.99;
c.strokeWidth=5;
function randomColor(){
    return(
        "rgba("+
        Math.round(Math.random()*190)+
        ","+
        Math.round(Math.random()*120)+
        ","+
        Math.round(Math.random()*150)+
        ","+
        Math.ceil(Math.random()*60)/20+
        ")"
    );
}
function Ball(){
    this.color = randomColor();
    this.radius = Math.random()*40+7;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius*1)+
    this.radius;
    this.y = Math.random()*(ty - this.radius);
    this.dy = Math.random()*2;
    this.dx = Math.round ((Math.random()+0,2)*4);
    this.vel = Math.random()/2;
    this.update = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,7*
            Math.PI);
            c.fillStyle = this.color;
            c.fill();
    };
}
var bal = [];




for(var i=0; i<80; i++){
    bal.push(new Ball())
}
function animate() {
    if(tx != window.innerWidth || ty !=
        window.innerHeight){
            tx = window.innerWidth;
            ty = window.innerHeight;
            canvas.width = tx;
            canvas.height = ty;
            

        }requestAnimationFrame(animate);
    c.clearRect(0,0,tx,ty);
for(var i = 0; i <bal.length; i++){
    bal[i].update();
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    if (bal[i].y+bal[i].radius>=ty){
    bal[i].dy = -bal[i].dy * grav;
}else{
    bal[i].dy += bal[i].vel;

}
if(bal[i].x +bal[i].radius > tx || bal[i].x -
    bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;

}
if(mousex > bal [i].x -50 &&
    mousex < bal [i].x +50 &&
    mousey > bal [i].y -50 &&
    mousey < bal [i].y +50 &&
    bal[i].radius<70)
{
    bal[i].radius += 50;
}else{
    if(bal[i].radius > bal [i].startradius){
        bal[i].radius += 0;
    
    }
}
}
}
animate();
setInterval(function(){
    bal.push(new Ball());
    bal.splice(0,1);

},400);

// var radius = 8;
// TweenMax.staggerFromTo('.blob', 4 ,{
//   cycle: {
//     attr:function(i) {
//       var r = i*90;
//       return {
//         transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
//       }      
//     }
//   }  
// },{
//   cycle: {
//     attr:function(i) {
//       var r = i*90+360;
//       return {
//         transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
//       }      
//     }
//   },
//   ease:Linear.easeNone,
//   repeat:-1
// })



// var o1 = {
//     x: w/2,
//     changeX: 100,
//     y: h/2,
//     changeY: 0,
//     w: 100,
//     h: 100,
//     c: 200,
//     a: 0.75,
//     random: 20,
//     changeRandom: 10,
//     num: 10,
    
// }

// setUpCanvas();

// var interval = setInterval(function(){
//     // clear();

//     squiggly(o1)
//     o1.random += o1.changeRandom;
    
//     if(o1.random > 500){
        
//         o1.changeRandom *= -1;
        
//     }
//     if( o1.random < 10){
        
//         o1.changeRandom *= -1;
//         // console.log("clear interval");
//         // clearInterval(interval)
//     }
// },100)


// function clear(){
//     ctx.clearRect(0,0,w,h);
// }



// function squiggly(o){
//     // o.x -= o.random/2;
//     // o.y -= o.random/2;
//     ctx.beginPath();
//     ctx.moveTo(o.x, o.y);
//     for (var i=0; i<o.num; i++){
//         ctx.quadraticCurveTo(o.x + rand(o.random), o.y + rand(o.random), o.x + rand(o.random), o.y + rand(o.random)) 
//     }
//     ctx.fillStyle = "hsla("+o.c+", 100%, 60%, "+o.a+")";
//     ctx.fill();
//     // o.x += o.random/2;
//     // o.y += o.random/2;
// }

// function rectRand(o){
//     // var objectBuffer = o;
//     // // console.log(o.x,o.y);
//     // var bx = o.x;
//     // var by = o.y;
//     o.x = o.x-o.w/2;
//     o.y = o.y-o.h/2;
//     ctx.beginPath();
//     ctx.moveTo(o.x+randn(o.random), o.y+randn(o.random));
//     ctx.lineTo(o.x+o.w+randn(o.random), o.y+randn(o.random));
//     ctx.lineTo(o.x+o.w+randn(o.random), o.y+o.h+randn(o.random));
//     ctx.lineTo(o.x+randn(o.random), o.y+o.h+randn(o.random));
//     ctx.closePath(); 
//     ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
//     ctx.fill();
//     o.x = o.x + o.w/2;
//     o.y = o.y + o.h/2;
//     // o = objectBuffer;
//     // o.x = bx;
//     // o.y = by;



// }


// function rand(range){
//     var r = Math.random()*range;
//     return r
// }

// function randi(range){
//     var r = Math.floor(Math.random()*range);
//     return r
// }

// function randn(range){
//     var r = Math.random()*range-range/2;
//     return r
// }



// function setUpCanvas(){
//     canvas = document.querySelector("#myCanvas");
//     canvas.width = w;
//     canvas.height = h;
    
//     ctx = canvas.getContext("2d");