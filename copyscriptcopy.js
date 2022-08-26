(function (window) {
  "use strict";

  var gameState = {
    name: "Tic Tac Toe",
    version: "1.0",
    gameboard: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    winner: null,
    // Gameboard array
    parameters: [
      {
        move: null, // row and column
        moves: 0, // number of moves
        player: 1, // player 1 or 2
        difficulty: null, // difficulty of game
      },
    ],
  };

  console.table(gameState.gameboard);

  var playerOne = {
    name: null,
    turn: null,
    wins: 0,
    parameters: [
      {
        score: 0,
      },
    ],
  };

  var playerTwo = {
    name: "AI",
    turn: null,
    wins: 0,
    parameters: [
      {
        score: 0,
      },
    ],
  };

  const winningCombos = [
    [
      gameState.gameboard[0][0],
      gameState.gameboard[0][1],
      gameState.gameboard[0][2],
    ],
    [
      gameState.gameboard[1][0],
      gameState.gameboard[1][1],
      gameState.gameboard[1][2],
    ],
    [
      gameState.gameboard[2][0],
      gameState.gameboard[2][1],
      gameState.gameboard[2][2],
    ],
    [
      gameState.gameboard[0][0],
      gameState.gameboard[1][0],
      gameState.gameboard[2][0],
    ],
    [
      gameState.gameboard[0][1],
      gameState.gameboard[1][1],
      gameState.gameboard[2][1],
    ],
    [
      gameState.gameboard[0][2],
      gameState.gameboard[1][2],
      gameState.gameboard[2][2],
    ],
    [
      gameState.gameboard[0][0],
      gameState.gameboard[1][1],
      gameState.gameboard[2][2],
    ],
    [
      gameState.gameboard[0][2],
      gameState.gameboard[1][1],
      gameState.gameboard[2][0],
    ],
  ];

  // Const function to open modal after clicking the play button
  const playButton = document.getElementById("playButton");
  const header = document.getElementById("header");
  const modal = document.getElementById("playersModal");
  const inputModal = document.getElementById("inputBody");
  const main = document.getElementById("main");
  const playerOneNameInput = document.getElementById("playerOneInput");

  // Game Logic Functions //
  const checkForWin = () => {
    // Limit to 9 moves
    if (gameState.parameters[0].moves > 9) {
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
  const checkForDraw = () => {
    if (gameState.parameters[0].moves > 9) {
      return true;
    } else {
      return false;
    }
  };
  var sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const checkForTwoInARow = () => {
    // Check for two in a row
    if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[0][1] === 1 &&
      gameState.gameboard[0][2] === 0
    ) {
      return [0, 2];
    } else if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[0][1] === 0 &&
      gameState.gameboard[0][2] === 1
    ) {
      return [0, 1];
    } else if (
      gameState.gameboard[0][0] === 0 &&
      gameState.gameboard[0][1] === 1 &&
      gameState.gameboard[0][2] === 1
    ) {
      return [0, 0];
    } else if (
      gameState.gameboard[1][0] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[1][2] === 0
    ) {
      return [1, 2];
    } else if (
      gameState.gameboard[1][0] === 1 &&
      gameState.gameboard[1][1] === 0 &&
      gameState.gameboard[1][2] === 1
    ) {
      return [1, 1];
    } else if (
      gameState.gameboard[1][0] === 0 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[1][2] === 1
    ) {
      return [1, 0];
    } else if (
      gameState.gameboard[2][0] === 1 &&
      gameState.gameboard[2][1] === 1 &&
      gameState.gameboard[2][2] === 0
    ) {
      return [2, 2];
    } else if (
      gameState.gameboard[2][0] === 1 &&
      gameState.gameboard[2][1] === 0 &&
      gameState.gameboard[2][2] === 1
    ) {
      return [2, 1];
    } else if (
      gameState.gameboard[2][0] === 0 &&
      gameState.gameboard[2][1] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      return [2, 0];
    } else if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][0] === 1 &&
      gameState.gameboard[2][0] === 0
    ) {
      return [2, 0];
    } else if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][0] === 0 &&
      gameState.gameboard[2][0] === 1
    ) {
      return [1, 0];
    } else if (
      gameState.gameboard[0][0] === 0 &&
      gameState.gameboard[1][0] === 1 &&
      gameState.gameboard[2][0] === 1
    ) {
      return [0, 0];
    } else if (
      gameState.gameboard[0][1] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][1] === 0
    ) {
      return [2, 1];
    } else if (
      gameState.gameboard[0][1] === 1 &&
      gameState.gameboard[1][1] === 0 &&
      gameState.gameboard[2][1] === 1
    ) {
      return [1, 1];
    } else if (
      gameState.gameboard[0][1] === 0 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][1] === 1
    ) {
      return [0, 1];
    } else if (
      gameState.gameboard[0][2] === 1 &&
      gameState.gameboard[1][2] === 1 &&
      gameState.gameboard[2][2] === 0
    ) {
      return [2, 2];
    } else if (
      gameState.gameboard[0][2] === 1 &&
      gameState.gameboard[1][2] === 0 &&
      gameState.gameboard[2][2] === 1
    ) {
      return [1, 2];
    } else if (
      gameState.gameboard[0][2] === 0 &&
      gameState.gameboard[1][2] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      return [0, 2];
    } else if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][2] === 0
    ) {
      return [2, 2];
    } else if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][1] === 0 &&
      gameState.gameboard[2][2] === 1
    ) {
      return [1, 1];
    } else if (
      gameState.gameboard[0][0] === 0 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      return [0, 0];
    } else if (
      gameState.gameboard[0][2] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][0] === 0
    ) {
      return [2, 0];
    } else if (
      gameState.gameboard[0][2] === 1 &&
      gameState.gameboard[1][1] === 0 &&
      gameState.gameboard[2][0] === 1
    ) {
      return [1, 1];
    } else if (
      gameState.gameboard[0][2] === 0 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][0] === 1
    ) {
      return [0, 2];
    } else {
      return false;
    }
  };

  // AI Logic Functions //
  const calculateBestMove = () => {
    // AI to make best move
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (gameState.gameboard[i][j] === 0) {
          gameState.gameboard[i][j] = 2;
          let score = minimax(gameState.gameboard, 0, false);
          gameState.gameboard[i][j] = 0;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    gameState.gameboard[move.i][move.j] = 2;
    playerTwo.parameters[0].score++;
    gameState.parameters.push(move);
    console.table(gameState.gameboard);
    console.log("AI move: ", move);
    console.log("AI score: ", playerTwo.parameters[0].score);
    console.log("Game state: ", gameState.parameters);
    checkForWin();
    checkForDraw();
    checkForTwoInARow();
    checkForWin();
    checkForDraw();
    checkForTwoInARow();
  };

  const minimax = (gameboard, depth, isMaximizing) => {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (gameboard[i][j] === 0) {
            gameboard[i][j] = 2;
            let score = minimax(gameboard, depth + 1, false);
            gameboard[i][j] = 0;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (gameboard[i][j] === 0) {
            gameboard[i][j] = 1;
            let score = minimax(gameboard, depth + 1, true);
            gameboard[i][j] = 0;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const scores = {
    X: -10,
    O: 10,
    tie: 0,
  };

  const checkForPlayerTwoWin = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        gameState.gameboard[i][0] === 2 &&
        gameState.gameboard[i][1] === 2 &&
        gameState.gameboard[i][2] === 0
      ) {
        gameState.gameboard[i][2] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      } else if (
        gameState.gameboard[i][0] === 2 &&
        gameState.gameboard[i][1] === 0 &&
        gameState.gameboard[i][2] === 2
      ) {
        gameState.gameboard[i][1] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      } else if (
        gameState.gameboard[i][0] === 0 &&
        gameState.gameboard[i][1] === 2 &&
        gameState.gameboard[i][2] === 2
      ) {
        gameState.gameboard[i][0] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        gameState.gameboard[0][i] === 2 &&
        gameState.gameboard[1][i] === 2 &&
        gameState.gameboard[2][i] === 0
      ) {
        gameState.gameboard[2][i] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      } else if (
        gameState.gameboard[0][i] === 2 &&
        gameState.gameboard[1][i] === 0 &&
        gameState.gameboard[2][i] === 2
      ) {
        gameState.gameboard[1][i] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      }
      if (
        gameState.gameboard[0][i] === 0 &&
        gameState.gameboard[1][i] === 2 &&
        gameState.gameboard[2][i] === 2
      ) {
        gameState.gameboard[0][i] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      }
    }
    // Check diagonals
    if (
      gameState.gameboard[0][0] === 2 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[2][2] === 0
    ) {
      gameState.gameboard[2][2] = 2;
      playerTwo.turn = false;
      playerOne.turn = true;
      renderPlayerMoves();
      playerTurnDisplay();
      checkForWinner();
      return true;
    }
    if (
      gameState.gameboard[0][0] === 2 &&
      gameState.gameboard[1][1] === 0 &&
      gameState.gameboard[2][2] === 2
    ) {
      gameState.gameboard[1][1] = 2;
      playerTwo.turn = false;
      playerOne.turn = true;
      renderPlayerMoves();
      playerTurnDisplay();
      checkForWinner();
      return true;
    }
    if (
      gameState.gameboard[0][0] === 0 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[2][2] === 2
    ) {
      gameState.gameboard[0][0] = 2;
      playerTwo.turn = false;
      playerOne.turn = true;
      renderPlayerMoves();
      playerTurnDisplay();
      checkForWinner();
      return true;
    }
  };

  const checkForPlayerOneWin = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        gameState.gameboard[i][0] === 1 &&
        gameState.gameboard[i][1] === 1 &&
        gameState.gameboard[i][2] === 0
      ) {
        gameState.gameboard[i][2] = 1;
        playerOne.turn = false;
        playerTwo.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      } else if (
        gameState.gameboard[i][0] === 1 &&
        gameState.gameboard[i][1] === 0 &&
        gameState.gameboard[i][2] === 1
      ) {
        gameState.gameboard[i][1] = 1;
        playerOne.turn = false;
        playerTwo.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      } else if (
        gameState.gameboard[i][0] === 0 &&
        gameState.gameboard[i][1] === 1 &&
        gameState.gameboard[i][2] === 1
      ) {
        gameState.gameboard[i][0] = 1;
        playerOne.turn = false;
        playerTwo.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        gameState.gameboard[0][i] === 1 &&
        gameState.gameboard[1][i] === 1 &&
        gameState.gameboard[2][i] === 0
      ) {
        gameState.gameboard[2][i] = 1;
        playerOne.turn = false;
        playerTwo.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      } else if (
        gameState.gameboard[0][i] === 1 &&
        gameState.gameboard[1][i] === 0 &&
        gameState.gameboard[2][i] === 1
      ) {
        gameState.gameboard[1][i] = 1;
        playerOne.turn = false;
        playerTwo.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      }
      if (
        gameState.gameboard[0][i] === 0 &&
        gameState.gameboard[1][i] === 1 &&
        gameState.gameboard[2][i] === 1
      ) {
        gameState.gameboard[0][i] = 1;
        playerOne.turn = false;
        playerTwo.turn = true;
        renderPlayerMoves();
        playerTurnDisplay();
        checkForWinner();
        return true;
      }
    }
    // Check diagonals
    if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][2] === 0
    ) {
      gameState.gameboard[2][2] = 1;
      playerOne.turn = false;
      playerTwo.turn = true;
      renderPlayerMoves();
      playerTurnDisplay();
      checkForWinner();
      return true;
    }
    if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][1] === 0 &&
      gameState.gameboard[2][2] === 1
    ) {
      gameState.gameboard[1][1] = 1;
      playerOne.turn = false;
      playerTwo.turn = true;
      renderPlayerMoves();
      playerTurnDisplay();
      checkForWinner();
      return true;
    }
    if (
      gameState.gameboard[0][0] === 0 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      gameState.gameboard[0][0] = 1;
      playerOne.turn = false;
      playerTwo.turn = true;
      renderPlayerMoves();
      playerTurnDisplay();
      checkForWinner();
      return true;
    }

    return false;
  };

  const checkForGameOver = () => {
    // Check for win
    if (checkForWin() === true) {
      console.log("Checked as true for win");
      return true;
    }
    // Check for draw
    if (checkForDraw() === true) {
      return true;
    }
    // If neither win or draw, return false
    return false;
  };
  const resetGameBoard = () => {
    // Reset gameboard array
    gameState.gameboard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  };

  const resetGame = () => {
    if (checkForGameOver() === true) {
      // Reset player turns
      playerOne.turn = true;
      playerTwo.turn = false;

      const resetHTML = () => {
        // Reset gameboard HTML
        const gameboard = document.querySelector(".gameboard");
        gameboard.innerHTML = "";
      };
      resetHTML();

      resetGameBoard();

      init();
      // Reset player turn display
      playerTurnDisplay();
      gameState.parameters[0].moves = 0;
    }
  };

  const displayMessage = (message) => {
    // Display message
    document.getElementById("gameStatus").textContent = message;
  };
  const clearDisplayMessages = () => {
    // Clear display
    document.getElementById("gameStatus").textContent = "";
  };

  // Game UI Initialization Functions //
  const renderGameboardSquares = () => {
    for (let i = 0; i < gameState.gameboard.length; i++) {
      for (let j = 0; j < gameState.gameboard.length; j++) {
        let square = document.createElement("div");
        square.className = "game-square";
        square.id = `${i}-${j}`;
        gameBoard.appendChild(square);
      }
    }
  };
  const renderPlayerOneName = () => {
    var playerOneNameDisplay = document.getElementById("playerName");
    playerOneNameDisplay.innerHTML = playerOne.name;
  };
  const renderPlayerOneScore = () => {
    var playerOneScoreDisplay = document.getElementById("playerScore");
    playerOneScoreDisplay.innerHTML = playerOne.wins;
  };
  const renderPlayerTwoScore = () => {
    var playerTwoScoreDisplay = document.getElementById("oponentScore");
    playerTwoScoreDisplay.innerHTML = playerTwo.wins;
  };
  const playerTurnDisplay = () => {
    var playerTurnDisplay = document.getElementById("turnDisplay");
    playerTurnDisplay.innerHTML = playerOne.name + "'s turn";

    if (playerOne.turn === true) {
      playerTurnDisplay.innerHTML = playerOne.name + "'s turn";
    }
    if (playerTwo.turn === true) {
      playerTurnDisplay.innerHTML = playerTwo.name + "'s turn";
    }

    if (playerOne.turn === false && playerTwo.turn === false) {
      playerTurnDisplay.innerHTML = "";
    }
  };
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
  const handlePlayerHover = (e) => {
    let row = e.target.id[0];
    let column = e.target.id[2];
    if (gameState.gameboard[row][column] === 0) {
      if (playerOne.turn === true) {
        // Add player one cross html
        e.target.innerHTML = "x";
      }
    }
  };
  const handlePlayerHoverLeave = (e) => {
    let row = e.target.id[0];
    let column = e.target.id[2];
    if (gameState.gameboard[row][column] === 0) {
      if (playerOne.turn === true) {
        e.target.innerHTML = "";
      } else if (playerTwo.turn === true) {
        e.target.innerHTML = "";
      }
    }
  };

  const handlePlayerTwoEasyMove = () => {
    // Function to handle player two move on easy difficulty
    // Completely random move on easy difficulty
    const randomRow = Math.floor(Math.random() * 3);
    const randomColumn = Math.floor(Math.random() * 3);
    console.log(randomRow, randomColumn);
    if (gameState.gameboard[randomRow][randomColumn] === 0) {
      gameState.gameboard[randomRow][randomColumn] = 2;
      gameState.parameters[0].moves++;
      playerTwo.turn = false;
      playerOne.turn = true;
      playerTurnDisplay();
      renderPlayerMoves();
      if (checkForGameOver() === true) {
        sleep(1500).then(() => {
          if (checkForWin() === true) {
            playerTwo.wins++;
            renderPlayerTwoScore();

            displayMessage(`${playerTwo.name} wins!`);
            setTimeout(() => {
              displayMessage("Click a square to play another round!");
              setTimeout(() => {
                clearDisplayMessages();
              }, 4000);
            }, 2000);
            resetGame();
          } else if (checkForDraw() === true) {
            displayMessage("It's a draw!");
            playerTwo.wins++;
            playerOne.wins++;
            renderPlayerOneScore();
            renderPlayerTwoScore();
            setTimeout(() => {
              displayMessage("Click a square to play another round!");
              setTimeout(() => {
                clearDisplayMessages();
              }, 4000);
            }, 2000);
            resetGame();
          }
        });
      }
    }
    // If random move is not valid, call function again
    else {
      handlePlayerTwoEasyMove();
    }
  };
  const handlePlayerTwoMediumMove = () => {
    // Function to handle player two move on medium difficulty
    // Slightly smarter move on medium difficulty
    const randomRow = Math.floor(Math.random() * 3);
    const randomColumn = Math.floor(Math.random() * 3);

    // Check if player one has two in a row
    if (checkForTwoInARow === true) {
      // Check if player one has two in a row and block it
      if (gameState.gameboard[randomRow][randomColumn] === 0) {
        gameState.gameboard[randomRow][randomColumn] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        playerTurnDisplay();
        renderPlayerMoves();
        checkForWinner();
      }
    }
  };
  const handlePlayerTwoHardMove = () => {
    // Function to handle player two move on hard difficulty
    // Slightly smarter move on hard difficulty
    const randomRow = Math.floor(Math.random() * 3);
    const randomColumn = Math.floor(Math.random() * 3);

    // Check if player one has two in a row
    if (checkForTwoInARow === true) {
      // Check if player one has two in a row and block it
      if (gameState.gameboard[randomRow][randomColumn] === 0) {
        gameState.gameboard[randomRow][randomColumn] = 2;
        playerTwo.turn = false;
        playerOne.turn = true;
        playerTurnDisplay();
        renderPlayerMoves();
        checkForWinner();
      }
    }
  };
  const handlePlayerTwoExtremeMove = () => {
    // Function to handle player two move with unbeatable difficulty
    // Unbeatable move on extreme difficulty
    // Math to determine best move
    const bestMove = minimax(gameState.gameboard, 2).index;
    // Set best move to gameboard
    gameState.gameboard[bestMove[0]][bestMove[1]] = 2;
    // Change turns
    playerTwo.turn = false;
    playerOne.turn = true;
    // Render player moves
    renderPlayerMoves();
    // Display player turn
    playerTurnDisplay();
    // Check for winner
    checkForWinner();
  };
  const handleComputerMove = () => {
    console.log(
      "Handle Computer Move, difficulty: " + gameState.parameters[0].difficulty
    );
    // Check difficulty level before making move
    if (playerTwo.turn === true) {
      var difficulty = gameState.parameters[0].difficulty;
      if (difficulty === "easy") {
        console.log("Easy difficulty, handling move");
        handlePlayerTwoEasyMove();
      } else if (difficulty === "medium") {
        handlePlayerTwoMediumMove();
      } else if (difficulty === "hard") {
        handlePlayerTwoHardMove();
      } else if (difficulty === "extreme") {
        handlePlayerTwoImpossibleMove();
      }
    }
  };
  const handlePlayerMove = (e) => {
    let square = e.target;
    let squareId = square.id;
    let squareIdArray = squareId.split("-");
    let row = squareIdArray[0];
    let column = squareIdArray[1];
    if (gameState.gameboard[row][column] === 0) {
      gameState.gameboard[row][column] = 1;
      gameState.parameters[0].moves++;
      playerOne.turn = false;
      playerTwo.turn = true;
      playerTurnDisplay();
      renderPlayerMoves();
      if (checkForGameOver() === true) {
        sleep(1500).then(() => {
          if (checkForWin() === true) {
            console.log("P1 wins ?");
            playerOne.wins++;
            renderPlayerOneScore();

            displayMessage(`${playerOne.name} wins!`);
            setTimeout(() => {
              displayMessage("Click a square to play another round!");
              setTimeout(() => {
                clearDisplayMessages();
              }, 4000);
            }, 2000);
            resetGame();
          } else if (checkForDraw() === true) {
            displayMessage("It's a draw!");
            playerTwo.wins++;
            playerOne.wins++;
            renderPlayerOneScore();
            renderPlayerTwoScore();
            setTimeout(() => {
              displayMessage("Click a square to play another round!");
              setTimeout(() => {
                clearDisplayMessages();
              }, 4000);
            }, 2000);
            resetGame();
          }
        });
      } else if (checkForGameOver() === false && playerTwo.turn === true) {
        setTimeout(() => {
          console.log("Computer's turn");
          handleComputerMove();
        }, 1500);
      }
    }
  };

  const handlePlayerOneClick = (e) => {
    if (playerOne.turn === true) {
      handlePlayerMove(e);
    }
  };

  // Game UI Event Listeners //
  const addGameboardEventListeners = () => {
    const gameSquares = document.querySelectorAll(".game-square");

    gameSquares.forEach((gameSquares) => {
      gameSquares.addEventListener("mouseover", handlePlayerHover);
      gameSquares.addEventListener("mouseleave", handlePlayerHoverLeave);
      gameSquares.addEventListener("click", handlePlayerOneClick);
    });
  };

  // Game UI Initialization //
  const init = () => {
    renderGameboardSquares();
    addGameboardEventListeners();
  };
  init();

  // Game Initialization //
  const setup = () => {
    // Open modal
    const load = () => {
      header.classList.add("active"); // Active header to begin transition
      playButton.classList.add("active"); // Active button to hide it
      main.classList.remove("hidden"); // Remove class from main to view contents
      modal.classList.remove("hidden"); // Remove class from modal to view contents

      // Function to create background for modal
      const handleModalBackground = () => {
        const backgroundDiv = document.createElement("div");
        backgroundDiv.id = "modalBackdrop";
        main.appendChild(backgroundDiv);
      };
      handleModalBackground();

      const handlePlayerOneName = () => {
        document.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && playerOne.name === null) {
            playerOne.name = document.getElementById("playerOneInput").value;
            console.log("hi " + playerOne.name);

            playerTurnDisplay();
            renderPlayerOneName();
            renderPlayerOneScore();
            renderPlayerTwoScore();

            updateModal();
          }
        });
      };

      const handleDifficulty = () => {
        const buttons = document.querySelectorAll(".difficultySelect");

        buttons.forEach((a) => {
          if (gameState.parameters[0].difficulty === null) {
            a.addEventListener("click", () => {
              // Get data index of button
              const index = a.dataset.index;
              if (gameState.parameters[0].difficulty === null) {
                if (index === "0") {
                  gameState.parameters[0].difficulty = "easy";
                  a.id = "selected";
                } else if (index === "1") {
                  gameState.parameters[0].difficulty = "medium";
                  a.id = "selected";
                } else if (index === "2") {
                  gameState.parameters[0].difficulty = "hard";
                  a.id = "selected";
                } else if (index === "3") {
                  gameState.parameters[0].difficulty = "extreme";
                  a.id = "selected";
                }
                console.log(gameState.parameters[0].difficulty);
  
                // Update modal
                console.log("Difficulty: " + gameState.parameters[0].difficulty);
                updateModal();
              }
            });
          } 
        });
      };

      // Click inside modal for name or difficulty
      document.addEventListener("click", () => {
        if (
          playerOne.name === null &&
          gameState.parameters[0].difficulty === null
        ) {
          handlePlayerOneName();
          handleDifficulty();
          console.log(gameState.parameters[0].difficulty);
          console.log(playerOne.name);
        }
      });

      // Function to remove modal once name and difficulty are selected
      const updateModal = () => {
        if (
          gameState.parameters[0].difficulty !== null &&
          playerOne.name !== null
        ) {
          console.log("Modal removed");
          modal.classList.add("hidden");
          main.removeChild(modal);
          main.removeChild(document.getElementById("modalBackdrop"));
          addGameboardEventListeners();

          playerOne.turn = true;
          playerTwo.turn = false;
        }
        return null;
      };
    };

    // Event listener to play game
    playButton.addEventListener("click", load);
  };
  setup();

  // Function to check for winner
  const checkForWinner = () => {
    // Check for horizontal winner
    for (let i = 0; i < gameState.gameboard.length; i++) {
      if (
        gameState.gameboard[i][0] === 1 &&
        gameState.gameboard[i][1] === 1 &&
        gameState.gameboard[i][2] === 1
      ) {
        gameState.winner = 1;
        playerOne.wins++;
        renderPlayerOneScore();
        console.log("Player One Wins!");
      } else if (
        gameState.gameboard[i][0] === 2 &&
        gameState.gameboard[i][1] === 2 &&
        gameState.gameboard[i][2] === 2
      ) {
        gameState.winner = 2;
        playerTwo.wins++;
        renderPlayerTwoScore();
        console.log("Player Two Wins!");
      }
    }

    // Check for vertical winner
    for (let i = 0; i < gameState.gameboard.length; i++) {
      if (
        gameState.gameboard[0][i] === 1 &&
        gameState.gameboard[1][i] === 1 &&
        gameState.gameboard[2][i] === 1
      ) {
        gameState.winner = 1;
        playerOne.wins++;
        renderPlayerOneScore();
        console.log("Player One Wins!");
      } else if (
        gameState.gameboard[0][i] === 2 &&
        gameState.gameboard[1][i] === 2 &&
        gameState.gameboard[2][i] === 2
      ) {
        gameState.winner = 2;
        playerTwo.wins++;
        renderPlayerTwoScore();
        console.log("Player Two Wins!");
      }
    }

    // Check for diagonal winner
    if (
      gameState.gameboard[0][0] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][2] === 1
    ) {
      gameState.winner = 1;
      playerOne.wins++;
      renderPlayerOneScore();
      console.log("Player One Wins!");
    } else if (
      gameState.gameboard[0][0] === 2 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[2][2] === 2
    ) {
      gameState.winner = 2;
      playerTwo.wins++;
      renderPlayerTwoScore();
      console.log("Player Two Wins!");
    } else if (
      gameState.gameboard[0][2] === 1 &&
      gameState.gameboard[1][1] === 1 &&
      gameState.gameboard[2][0] === 1
    ) {
      gameState.winner = 1;
      playerOne.wins++;
      renderPlayerOneScore();
      console.log("Player One Wins!");
    }
    if (
      gameState.gameboard[0][2] === 2 &&
      gameState.gameboard[1][1] === 2 &&
      gameState.gameboard[2][0] === 2
    ) {
      gameState.winner = 2;
      playerTwo.wins++;
      renderPlayerTwoScore();
      console.log("Player Two Wins!");
    }

    // Check for draw
    if (
      gameState.gameboard[0][0] !== 0 &&
      gameState.gameboard[0][1] !== 0 &&
      gameState.gameboard[0][2] !== 0 &&
      gameState.gameboard[1][0] !== 0 &&
      gameState.gameboard[1][1] !== 0 &&
      gameState.gameboard[1][2] !== 0 &&
      gameState.gameboard[2][0] !== 0 &&
      gameState.gameboard[2][1] !== 0 &&
      gameState.gameboard[2][2] !== 0 &&
      gameState.winner === null
    ) {
      gameState.winner = 0;
      console.log("Draw!");
    }

    // Check for winner and display winner message

    if (gameState.winner === 1) {
      displayMessage(`${playerOne.name} Wins!`);
      //Timeout and reset
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else if (gameState.winner === 2) {
      displayMessage(`${playerTwo.name} Wins!`);
      //Timeout and reset
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else if (gameState.winner === 0) {
      displayMessage("Draw!");
      //Timeout and reset
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  };
})(window);
