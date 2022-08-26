(function (window) {
  "use strict";

  const gameState = {
    name: "Tic Tac Toe", // Name of the game
    version: "1.0", // Version of the game
    gameboard: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ], // Gameboard array
    parameters: [
      {
        player: null, // player 1 or 2
        turn: false, // true or false
        move: null, // row and column
        moves: 0, // number of moves
      },
    ],
  };

  console.table(gameState.gameboard);

  const playerOne = {
    name: "Player One",
    turn: null,
    parameters: [
      {
        player: null,
        type: "integer",
      },
    ],
  };

  const playerTwo = {
    name: "Player Two",
    turn: null,
    parameters: [
      {
        player: null,
        type: "integer",
      },
    ],
  };

  const checkForWin = () => {
    // Limit to 9 moves
    if (gameState.parameters.length > 9) {
      return "Draw";
    }
    if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[0][1] === 1 &&
      gameState.gameboard[0][2] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[1][0] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[1][2] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[2][0] === 1 &&
      gameState.gameboard[2][1] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][0] === 1 &&
      gameState.gameboard[2][0] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[0][1] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][1] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[0][2] === 1 &&
      gameState.gameboard[1][2] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[0][2] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][0] === 1
    ) {
      return true;
    } else if (
      gameState.gameboard[0][0] === 2 &&
      gameState.gameboard[0][1] === 2 &&
      gameState.gameboard[0][2] === 2
    ) {
      return true;
    } else if (
      gameState.gameboard[1][0] === 2 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[1][2] === 2
    ) {
      return true;
    } else if (
      gameState.gameboard[2][0] === 2 &&
      gameState.gameboard[2][1] === 2 &&
      gameState.gameboard[2][2] === 2
    ) {
      return true;
    } else if (
      gameState.gameboard[0][0] === 2 &&
      gameState.gameboard[1][0] === 2 &&
      gameState.gameboard[2][0] === 2
    ) {
      return true;
    } else if (
      gameState.gameboard[0][1] === 2 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[2][1] === 2
    ) {
      return true;
    } else if (
      gameState.gameboard[0][2] === 2 &&
      gameState.gameboard[1][2] === 2 &&
      gameState.gameboard[2][2] === 2
    ) {
      return true;
    } else if (
      gameState.gameboard[0][0] === 2 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[2][2] === 2
    ) {
      return true;
    } else if (
      gameState.gameboard[0][2] === 2 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[2][0] === 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Check for who's turn it is and who won the round, alert the winner and reset the game
  const checkForWinner = () => {
    if (checkForWin() === true) {
      if (gameState.parameters[0].player === 1) {
        return "Player One";
      } else {
        return "Player Two";
      }
    } else {
      return "No one";
    }
  };

 

  const checkForDraw = () => {
    // Check for draw
    for (let i = 0; i < gameState.gameboard.length; i++) {
      // Loop through gameboard array
      for (let j = 0; j < gameState.gameboard.length; j++) {
        // Loop through gameboard array
        if (gameState.gameboard[i][j] === 0) {
          // If gameboard array element is 0, return false
          return false;
        } else {
          // If gameboard array element is not 0, return true
          return true;
        }
      }
    }
  };

  const resetGame = () => {
    // Reset gameboard array
    gameState.gameboard = [];
    gameState.gameboard[0] = [];
    gameState.gameboard[1] = [];
    gameState.gameboard[2] = [];
    gameState.gameboard[0][0] = 0;
    gameState.gameboard[0][1] = 0;
    gameState.gameboard[0][2] = 0;
    gameState.gameboard[1][0] = 0;
    gameState.gameboard[1][1] = 0;
    gameState.gameboard[1][2] = 0;
    gameState.gameboard[2][0] = 0;
    gameState.gameboard[2][1] = 0;
    gameState.gameboard[2][2] = 0;
  };

  const playerOneTurn = () => {
    gameState.parameters[0].player = 1;
  };

  const playerTwoTurn = () => {
    gameState.parameters[0].player = 2;
  };

  const changePlayer = () => {
    if (gameState.parameters[0].player === 1) {
      playerTwoTurn();
      playerTwoMove();
    } else {
      playerOneTurn();
    }
  };

  // manage turns until someone wins or there is a draw
  const manageTurns = () => {
    if (checkForWinner() === "No one") {
      console.log("No one");
      if (checkForDraw() === true) {
        return "Draw";
      } else {
        changePlayer();
        return "No winner";
      }
    } else {
      return checkForWinner();
    }
  };

  //player two AI logic to make a random move
  const playerTwoAI = () => {
    if (checkForWinner() === "No one") {
      let randomNumber = Math.floor(Math.random() * 9);
      let randomRow = Math.floor(randomNumber / 3);
      let randomColumn = randomNumber % 3;
      if (gameState.gameboard[randomRow][randomColumn] === 0) {
        gameState.gameboard[randomRow][randomColumn] = 2;
      } else {
        playerTwoAI();
      }
    }
  };

  const playerTwoMove = () => {
    if (gameState.parameters[0].player === 2) {
      playerTwoAI();
      gameState.parameters[0].moves++;
    }
  };

  // Player 1 click event listener, hover event listener, and click event listener
  const playerOneClick = (e) => {
    if (gameState.parameters[0].player === 1) {
      let row = e.target.id.split("-")[0];
      let col = e.target.id.split("-")[1];
      console.log(row, col);
      if (gameState.gameboard[row][col] === 0) {
        gameState.gameboard[row][col] = 1;
        manageTurns();
        renderPlayerMoves();
        changePlayer();
      }
    }
    gameState.parameters[0].moves++
  };

  // Global click event listener
  const clickEvent = (e) => {
    if (e.target.className === "game-square") {
      playerOneClick(e);
    }
  };

  const playerOneHover = (e) => {
    if (gameState.parameters[0].player === 1) {
      let row = e.target.id.split("-")[0];
      let col = e.target.id.split("-")[1];
      console.log(row, col);
      if (gameState.gameboard[row][col] === 0) {
        e.target.classList.add("hover");
      }

      // Remove hover class when mouse leaves square
      e.target.addEventListener("mouseleave", () => {
        e.target.classList.remove("hover");
      });
    }
  };

  const hoverEvent = (e) => {
    if (e.target.className === "game-square") {
      playerOneHover(e);
    }
  };

  const playerOneLeave = (e) => {
    if (gameState.parameters[0].player === 1) {
      let row = e.target.id.split("-")[0];
      let col = e.target.id.split("-")[1];
      console.log(row, col);
      if (gameState.gameboard[row][col] === 0) {
        e.target.classList.remove("hover");
      }
    }
  };
  const leaveEvent = (e) => {
    if (e.target.className === "game-square") {
      playerOneLeave(e);
    }
  };

  // Event listeners
  document.addEventListener("click", clickEvent);
  // Click tally to increment moves
  // Click to player one move
  document.addEventListener("click", playerOneClick);
  document.addEventListener("mouseover", hoverEvent);
  document.addEventListener("mouseleave", leaveEvent);
  // End event listeners

  // Render gameboard
  const renderGameboard = () => {
    for (let i = 0; i < gameState.gameboard.length; i++) {
      for (let j = 0; j < gameState.gameboard.length; j++) {
        let square = document.createElement("div");
        square.className = "game-square";
        square.id = `${i}-${j}`;
        gameBoard.appendChild(square);
      }
    }
  };
  renderGameboard();
  // End render gameboard

  // Render player moves on gameboard
  const renderPlayerMoves = () => {
    for (let i = 0; i < gameState.gameboard.length; i++) {
      for (let j = 0; j < gameState.gameboard.length; j++) {
        let square = document.getElementById(`${i}-${j}`);
        if (gameState.gameboard[i][j] === 1) {
          square.classList.add("player-one");
          square.innerHTML = "x";
        } else if (gameState.gameboard[i][j] === 2) {
          square.classList.add("player-two");
          square.innerHTML = "o";
        }
      }
    }
  };
  renderPlayerMoves();

  //Game loop to manage turns/ check winner & keep track of moves
  const gameLoop = () => {
    for (let i = 0; i < gameState.gameboard.length; i++) {
      for (let j = 0; j < gameState.gameboard.length; j++) {
        do {
          let square = document.getElementById(`${i}-${j}`);
          
          square.addEventListener("click", playerOneClick);
          square.addEventListener("mouseover", playerOneHover);
          square.addEventListener("mouseleave", playerOneLeave);
        } while (gameState.parameters[0].player === 1);
      }
    }
    while (gameState.parameters[0].moves < 9) {
      

      manageTurns();
      checkForWinner(); // Check for winner
      checkForDraw(); // Check for draw
      renderPlayerMoves(); // Render player moves

      console.log(gameState.parameters[0].moves);
    }
  };
  gameLoop();
  // End game loop
})();
