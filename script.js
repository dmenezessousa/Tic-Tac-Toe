const gameScore = document.querySelector(".score");
const redPlayer = document.querySelector(".red-player");
const redPlayerTitle = document.querySelector(".red-player-title");
const redPlayerScore = document.querySelector(".red-player-score");
const bluePlayer = document.querySelector(".blue-player");
const bluePlayerTitle = document.querySelector(".blue-player-title");
const bluePlayerScore = document.querySelector(".blue-player-score");
const playersTurnAndStatus = document.querySelector(".player-status");
const gameBoard = document.querySelector(".game-board");
const cell = document.querySelectorAll(".cell");
const resetScore = document.querySelector(".reset-score");
const resetGame = document.querySelector(".reset-game");
const leftColumn = document.querySelector(".left-column");
const middleColumn = document.querySelector(".middle-column");
const rightColumn = document.querySelector(".right-column");

let redScore = 0;
let blueScore = 0;

let playerTurn = "red-player-cell";

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

const checkForWin = () => {
  let redCells = [];
  let blueCells = [];

  cell.forEach((cell) => {
    if (cell.classList.contains("red-player-cell")) {
      cell.style.backgroundColor = "red";
      redCells.push(Number(cell.dataset.cell));
    } else if (cell.classList.contains("blue-player-cell")) {
      cell.style.backgroundColor = "blue";
      blueCells.push(Number(cell.dataset.cell));
    }
  });

  winningCombinations.forEach((combination) => {
    if (combination.every((cell) => redCells.includes(cell))) {
      redScore++;
      redPlayerScore.textContent = redScore;
      gameBoard.removeEventListener("click", handleClick);
      combination.forEach((cell) => {
        document.querySelector(`[data-cell="${cell}"]`).classList.add("win");
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
    redPlayerTitle.textContent = "Red Winner!";
    redPlayerTitle.style.color = "red";
    bluePlayerTitle.textContent = "Blue Loser!";
    bluePlayerTitle.style.color = "blue";
    playersTurnAndStatus.textContent = "Red Wins the Game!";
    playersTurnAndStatus.style.color = "red";
  }

  if (blueScore === 1) {
    redPlayerTitle.textContent = "Red Loser!";
    redPlayerTitle.style.color = "red";
    bluePlayerTitle.textContent = "Blue Winner!";
    bluePlayerTitle.style.color = "blue";
    playersTurnAndStatus.textContent = "Blue Wins the Game!";
    playersTurnAndStatus.style.color = "blue";
  }

  if (
    redScore === 0 &&
    blueScore === 0 &&
    redCells.length === 5 &&
    blueCells.length === 4
  ) {
    playersTurnAndStatus.textContent = "It's a Tie!";
  }else if (
    redScore === 0 &&
    blueScore === 0 &&
    redCells.length === 4 &&
    blueCells.length === 5
  ) {
    playersTurnAndStatus.textContent = "It's a Tie!";
  }
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = playerTurn;

  if (
    cell.classList.contains("red-player-cell") ||
    cell.classList.contains("blue-player-cell")
  ) {
    return;
  }

  cell.classList.add(currentClass);

  checkForWin();

  if (playerTurn === "red-player-cell") {
    playerTurn = "blue-player-cell";
    cell.textContent = "X";
  } else {
    playerTurn = "red-player-cell";
    cell.textContent = "O";
  }
};

const removeHandleClick = () => {
  cell.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
};

const resetGameScore = () => {
  redPlayerTitle.textContent = "Red";
  redPlayerTitle.style.color = "red";
  bluePlayerTitle.textContent = "Blue";
  bluePlayerTitle.style.color = "blue";
  playersTurnAndStatus.innerHTML = `<h2>First Player starts as <strong style="color:red">Red </strong> and Second Player as<strong style="color:blue"> Blue</strong></h2>`;
  playersTurnAndStatus.style.color = "white";
  playerTurn = "red-player-cell";
  gameBoard.addEventListener("click", handleClick);
  redScore = 0;
  blueScore = 0;
  redPlayerScore.textContent = redScore;
  bluePlayerScore.textContent = blueScore;
};

const resetGameBoard = () => {
  cell.forEach((cell) => {
    cell.classList.remove("red-player-cell");
    cell.classList.remove("blue-player-cell");
    cell.classList.remove("win");
    cell.style.backgroundColor = "white";
  });
};

const resetGameBoardAndScore = () => {
  resetGameBoard();
  resetGameScore();
};

resetGame.addEventListener("click", resetGameBoardAndScore);
gameBoard.addEventListener("click", handleClick);
