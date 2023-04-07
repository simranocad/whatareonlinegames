const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// var ctx = canvas.getContext("2d");
// ctx.fillStyle = ("green");
// ctx.fillRect(0, 0, 300, 200)
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = "bold 22px Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif";




let canvasPosition = canvas.getBoundingClientRect();
// console.log(canvasPosition);
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    // console.log(mouse.x, mouse.y);
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
})

class Player{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 20;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }
    update(){
        const dx = this.x - mouse.x;
        // console.log(canvas.width, mouse.x);
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx/10;
        }
        if (mouse.y != this.y) {
            this.y -= dy/10;
        }
    }
    draw(){
        if(mouse.click) {
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = '#0378ff';
        ctx.beginPath();
        ctx.arc (this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x,this.y,this.radius, 5);
    }
}
const player = new Player();

const bubblesArray = [];
class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 65;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false; 
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';

    }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw(){
        ctx.fillStyle = '#ff03e2';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'p_1.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'p_2.ogg';


function handleBubbles(){
    if (gameFrame % 50 == 0){
        bubblesArray.push(new Bubble());
        // console.log(bubblesArray.length);
    }
    for(let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
        
    }
    for (let i = 0; i < bubblesArray.length; i++){
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2){
            bubblesArray.splice(i, 1);
        }
        if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
            // (console.log('collision'));
            if (!bubblesArray[i].counted){
            if(bubblesArray[i].sound == 'sound1'){
                bubblePop1.play();
            } else{
                bubblePop2.play();
            }
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i, 1);

            }
        
    }
  }
}           



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = '#fffcfc';
    
    

    ctx.fillText('SCORE: ' + score, 10 , 30);
    gameFrame++;
    requestAnimationFrame(animate);

}
animate();
