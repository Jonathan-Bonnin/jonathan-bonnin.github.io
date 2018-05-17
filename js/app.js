// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speedFactor = 250*Math.random()+50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    const listOfCharacters = ['images/char-princess-girl.png','images/char-pink-girl.png','images/char-horn-girl.png','images/char-cat-girl.png','images/char-boy.png'];
    this.sprite = listOfCharacters[Math.floor(Math.random()*5)];
    //sets the enemy anyway on the road
    this.x = Math.random()*505;
    //sets the enemy in one of the 3 lines 227||144||61
    let randomLine;
    randomLine = Math.floor(Math.random()*3);
    if (randomLine === 0){
      this.y = 61;
    } else if (randomLine === 1){
      this.y = 144;
    } else {
      this.y = 227;
    }


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedFactor*dt;
    if(this.x > 504){
      this.x -= 606;
    }
    //checks if the distance between any enemy and the player is smaller than 50
    //if yes, the player loses 2 points and its position is reset
    if (Math.abs(this.x-player.x) < 50 && player.y === this.y){
      player.reset();
      score-=2;
      //let's be nice and prevent the player from having a sub-zero score :)
      if (score<0){
        score = 0;
      }
      //remove enemies if player gets hit, so that the maximum amount of enemies is 10 for the final attempt
      while (score + 1 < allEnemies.length){
        allEnemies.pop();
      }
      scoreCounter.innerHTML = "Score: " + score;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 202;
    this.y = 310;
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy1 = new Enemy;
let enemyCount = 1;
let player = new Player;
let score = 0;
let allEnemies = [];
const modalWin = document.querySelector('.modal-for-the-win');
const modalWater = document.querySelector('.modal-for-the-water');
const scoreCounter = document.querySelector('.score-counter');
const refreshButton = document.querySelector('.fa-repeat');
const resetGame = function(){
  player.reset();
  score = 0;
  scoreCounter.innerHTML = "Score: " + score;
  allEnemies = [];
  extraEnemy = new Enemy;
  allEnemies.push(extraEnemy);

}
modalWin.style.display = "none";
modalWater.style.display = "none";



player.reset = function (){
  player.x = 202;
  player.y = 310;
}

resetGame();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    switch(e.keyCode){
      case 37:
        if (player.x !== 0){
          player.x -=101;
        }
        break;
      case 38:
      if (player.y !== 61){
          player.y -=83;
      } else {
        score++;
        scoreCounter.innerHTML = "Score: " + score;
        enemyCount++;
        let extraEnemy = 'enemy'+enemyCount;
        extraEnemy = new Enemy;
        allEnemies.push(extraEnemy);
        player.reset();
        if (score === 10){
           modalWin.style.display = "block";
           resetGame();
        }
      }
      break;
      case 39:
      if (player.x !== 404){
        player.x +=101;
      }
        break;
      case 40:
      if (player.y !== 310){
          player.y +=83;
      } else {
        modalWater.style.display = "block";
        resetGame();
      }
        break;
    }
});

modalWin.addEventListener ('click', function(){
  modalWin.style.display = "none";
})

modalWater.addEventListener ('click', function(){
  modalWater.style.display = "none";
  resetGame();
})

refreshButton.addEventListener ('click', function(){
  resetGame();
})


// going into water sets the score to 0 and resets the game + modal + facepalm pic
//refresh btn: look at mem game for styling
