const cells = Array.from(document.querySelectorAll(".cell"));
const enemyCells = cells.slice(0, 30);
const playerCells = cells.slice (30);
const scoreDisplay = document.querySelector(".score");

let dropCount, speed, score;


reset();

document.addEventListener("keydown", e =>{
    if (!dropCount) {
        startGame();
        
    }
    const player = document.querySelector(".player");

    if(e.key === "ArrowRight" && playerCells.includes(player.parentElement.nextElementSibling)) {
        player.parentElement.nextElementSibling.appendChild(player);
    }

    if(e.key === "ArrowLeft" && playerCells.includes(player.parentElement.previousElementSibling)) {
        player.parentElement.previousElementSibling.appendChild(player);
    }
});
function reset()  {
    dropCount = 0;
    speed = 600;
    score = 0;
    scoreDisplay.innerHTML = "0";

    cells.forEach(cell => cell.innerHTML = "");
    playerCells[1].innerHTML = '<div class="player"></div>';

}
function startGame(){
    reset();
    loop();
    
}

    function loop() {

        let stopGame = false;
        for(let i =enemyCells.length - 1; i>= 0; i--){
            const cell = enemyCells[i];
            const nextCell = cells[ i + 3];
            const enemy = cell.children[0];
            
            if(!enemy) {
                continue;
        }
        nextCell.appendChild(enemy);

        if (playerCells.includes(nextCell)) {
            if (nextCell.querySelector(".player")){
                stopGame = true;
            
            } else {
                score++;
                speed =Math.max(100, speed -25);
                scoreDisplay.innerHTML = score;
                enemy.remove();
        }
    }
}

        if (dropCount % 2 === 0) {
            const position = Math.floor(Math.random()*3);

            enemyCells[position].innerHTML = '<div class= "enemy"></div>';
        }
        
        if (stopGame) {
            alert('Your score: ' + score + ". Close this window to play again.");
            reset();

        } else{
            dropCount++;
            setTimeout(loop,speed);
        }

}
























// const canvas = document.
// querySelector('canvas');
// const c = canvas.getContext('2d');


// canvas.width = innerWidth;
// canvas.height = innerHeight;

// //class created to interact with the main element with other elements in the game//

// class Player{
//     constructor(x,y,radius,color){
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//     }
//     draw(){
//         c.beginPath()
//         c.arc (this.x, this.y, this.radius, 0, Math.PI *2, false)
//         c.fillStyle = this.color
//         c.fill()
//     }

// }

// //using same code as player but adding velocity to other circles for movement//


// class Projectile {
//     constructor(x,y, radius, color, velocity){
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//         this.velocity = velocity
// }
// draw(){
//     c.beginPath()
//     c.arc (this.x, this.y, this.radius, 0, Math.PI *2, false)
//     c.fillStyle = this.color
//     c.fill()
// }

// }




// const x = canvas.width/2
// const y = canvas.height/2
// const player = new Player(x,y,30, 'blue');
// player.draw()


// // console.log(Event.clientX)
// addEventListener('click', (event) => {
//    const projectile = new Projectile(
//    canvas.width/2, canvas.height/ 2,5,'red',null)
// })
// Projectile.draw()
// //Event object added to coordinate with mouse//
// // console.log(canvas)