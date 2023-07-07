//Query Selectors
const gameScore = document.querySelector(".score");
const redPlayerTitle = document.querySelector(".red-player-title");
const redPlayerScore = document.querySelector(".red-player-score");
const bluePlayerTitle = document.querySelector(".blue-player-title");
const bluePlayerScore = document.querySelector(".blue-player-score");
const playersTurnAndStatus = document.querySelector(".player-status");
const gameBoard = document.querySelector(".game-board");
const cell = document.querySelectorAll(".cell");
const resetGame = document.querySelector(".reset-game");
const resetScore = document.querySelector(".reset-score");

// Global Variables
let redScore = 0;
let blueScore = 0;
let playerTurn = "red-player-cell";

// Winning Combinations
const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal left to right
  [2, 4, 6], // diagonal right to left
];

// Functions
const checkForWin = () => {
  //check for win
  let redCells = []; //store red cells
  let blueCells = []; //store blue cells

  cell.forEach((cell) => {
    //loop through cells
    if (cell.classList.contains("red-player-cell")) {
      //check if cell contains red class
      cell.style.backgroundColor = "red";
      redCells.push(Number(cell.dataset.cell)); //push cell number to redCells array
    } else if (cell.classList.contains("blue-player-cell")) {
      cell.style.backgroundColor = "blue";
      blueCells.push(Number(cell.dataset.cell));
    }
  });

  winningCombinations.forEach((combination) => {
    //loop through winning combinations
    if (combination.every((cell) => redCells.includes(cell))) {
      //check if redCells array contains all the winning combinations
      redScore++; //increment red score
      redPlayerScore.textContent = redScore; //display red score
      gameBoard.removeEventListener("click", handleClick); //remove event listener
      combination.forEach((cell) => {
        //loop through winning combination
        document.querySelector(`[data-cell="${cell}"]`).classList.add("win"); //add win class to winning combination
      });
    } else if (combination.every((cell) => blueCells.includes(cell))) {
      blueScore++;
      bluePlayerScore.textContent = blueScore;
      gameBoard.removeEventListener("click", handleClick);
      combination.forEach((cell) => {
        document.querySelector(`[data-cell="${cell}"]`).classList.add("win");
      });
    }
  });

  if (redScore === 1) {
    //check if red score is 1 and display winner
    redPlayerTitle.textContent = "Red Winner!";
    redPlayerTitle.style.color = "red";
    bluePlayerTitle.textContent = "Blue Loser!";
    bluePlayerTitle.style.color = "blue";
    playersTurnAndStatus.textContent = "Red Wins the Game!";
    playersTurnAndStatus.style.color = "red";
  }

  if (blueScore === 1) {
    //check if blue score is 1 and display winner
    redPlayerTitle.textContent = "Red Loser!";
    redPlayerTitle.style.color = "red";
    bluePlayerTitle.textContent = "Blue Winner!";
    bluePlayerTitle.style.color = "blue";
    playersTurnAndStatus.textContent = "Blue Wins the Game!";
    playersTurnAndStatus.style.color = "blue";
  }

  //check if red and blue score is 0 and red and blue cells length is 5 and 4 respectively and display tie
  if (
    redScore === 0 &&
    blueScore === 0 &&
    redCells.length === 5 &&
    blueCells.length === 4
  ) {
    playersTurnAndStatus.textContent = "It's a Tie!";
  } else if (
    redScore === 0 &&
    blueScore === 0 &&
    redCells.length === 4 &&
    blueCells.length === 5
  ) {
    playersTurnAndStatus.textContent = "It's a Tie!";
  }
};

const handleClick = (e) => {//handle click
  const cell = e.target;
  const currentClass = playerTurn;

  //check if cell contains red or blue class
  if (
    cell.classList.contains("red-player-cell") ||
    cell.classList.contains("blue-player-cell")
  ) {
    return;//return if cell contains red or blue class
  }

  cell.classList.add(currentClass);//add red or blue class to cell

  checkForWin();//calls check for win function

  //check if player turn is red or blue and display X or O respectively
  if (playerTurn === "red-player-cell") {
    playerTurn = "blue-player-cell";
    cell.textContent = "X";
  } else {
    playerTurn = "red-player-cell";
    cell.textContent = "O";
  }
};

const removeHandleClick = () => {
  //remove event listener
  cell.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
};

const resetGameScore = () => {
  //reset game score
  redPlayerScore.textContent = redScore;
  bluePlayerScore.textContent = blueScore;
  redPlayerTitle.textContent = "Red";
  redPlayerTitle.style.color = "red";
  bluePlayerTitle.textContent = "Blue";
  bluePlayerTitle.style.color = "blue";
  playersTurnAndStatus.innerHTML = `<h2>First Player starts as <strong style="color:red">Red </strong> and Second Player as<strong style="color:blue"> Blue</strong></h2>`;
  playersTurnAndStatus.style.color = "white";
  playerTurn = "red-player-cell";
  gameBoard.addEventListener("click", handleClick);
};

const resetGameBoard = () => {
  //reset game board
  cell.forEach((cell) => {
    //remove red or blue or win class from cells
    cell.classList.remove("red-player-cell");
    cell.classList.remove("blue-player-cell");
    cell.classList.remove("win");
    cell.style.backgroundColor = "white";
  });
};
const resetPlayerScore = () => {
  //reset score
  redScore = 0;
  blueScore = 0;
  redPlayerScore.textContent = redScore;
  bluePlayerScore.textContent = blueScore;
};


const resetGameBoardAndScore = () => {
  //reset game board and score
  resetGameBoard();
  resetGameScore();
};

// Event Listeners
resetGame.addEventListener("click", resetGameBoardAndScore);
resetScore.addEventListener("click", resetPlayerScore);
gameBoard.addEventListener("click", handleClick);
