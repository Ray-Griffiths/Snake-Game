const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalid;
let score =  0;

//getting high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;


const changeFoodPosition = () => {
  // Passing a random 9 - 30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
  // clearing the time and reloading the page on game over
  clearInterval(setIntervalid);
  alert("Game Over! Press Ok to replay...")
  location.reload();
}

const changeDirection = (e) => {
  //changing velocity value based on key press
  if(e.key === "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  } else if(e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if(e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if(e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
    
}

controls.forEach(key => {
  // calling changeDirection on each key click and passing key dataset value as object
  key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
})

const initGame = () => {
  if(gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // checking if the snake hit the food
  if(snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++; //increament by 1

    highScore = score >= highScore ? score: highScore;
    localStorage.setItem("high-score", highScore)
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
    
  }

  

  for (let i = snakeBody.length - 1; i > 0; i--) {
    // shifting forward the values of the elements in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
    
  }

  // setting first element of snake body to current snake position
  snakeBody[0] = [snakeX, snakeY];

  // updating the snake's head position base on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;


  //checking if the snake's head is out of wall, if so setting gameOver to true
  if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
    
  }

  for (let i = 0; i < snakeBody.length; i++) {
    // adding a div for each part of the snake's body
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    //checking if the snake head hit the body, if so set gameOver to true
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalid = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection) 

/*
const playBoard = document.querySelector(".play-board");

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let gameOver = false;

const changeFoodPosition = () => {
  // Generate random positions for the food
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  alert("Game Over! Press OK to restart.");
  location.reload(); // Reload the page to restart the game
};

const changeDirection = (e) => {
  // Change velocity based on key press, preventing reverse direction
  if (e.key === "ArrowUp" && velocityY === 0) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY === 0) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX === 0) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX === 0) {
    velocityX = 1;
    velocityY = 0;
  }
};

const initGame = () => {
  if (gameOver) return handleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // Update snake head position
  snakeX += velocityX;
  snakeY += velocityY;

  // Game over conditions
  if (snakeX < 1 || snakeX > 30 || snakeY < 1 || snakeY > 30) {
    gameOver = true;
  }

  // Check if snake eats food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    // Add a new segment to the snake's body
    snakeBody.push([foodY, foodX]);
  }

  // Move snake body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeY, snakeX];
  }

  // Check for collision with body
  for (let segment of snakeBody) {
    if (segment[0] === snakeY && segment[1] === snakeX) {
      gameOver = true;
    }
  }

  // Add snake head to markup
  htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
  // Add snake body to markup
  for (let segment of snakeBody) {
    htmlMarkup += `<div class="body" style="grid-area: ${segment[0]} / ${segment[1]}"></div>`;
  }

  playBoard.innerHTML = htmlMarkup;
};

// Initialize food position
changeFoodPosition();

// Game loop
setInterval(initGame, 100);
document.addEventListener("keydown", changeDirection);  */
