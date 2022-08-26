(function (window) {
  "use strict";

  var gameState = {
    name: "Tic Tac Toe",
    version: "1.0",
    gameboard: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ], // Gameboard array
    parameters: [
      {
        player: null, // player 1 or 2
        move: null, // row and column
        moves: 0, // number of moves
        difficulty: null, // difficulty of game
      },
    ],
  };

  console.table(gameState.gameboard);

  var playerOne = {
    name: "Player One",
    turn: null,
    parameters: [
      {
        player: null,
        type: "integer",
      },
    ],
  };

  var playerTwo = {
    name: "Player Two",
    turn: null,
    parameters: [
      {
        player: null,
        type: "integer",
      },
    ],
  };

  // Check for who's turn it is and who won the round, alert the winner and reset the game

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
      }
    }
    gameState.parameters[0].moves++;
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

  // Render gameboard
  
  renderGameboard();
  // End render gameboard

  // Render player moves on gameboard
  
  renderPlayerMoves();

  // Render gameBoard & playerMoves
  const render = () => {
    renderGameboard();
    renderPlayerMoves();  
  };

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
  };
  gameLoop();
  // End game loop

  // Start code refactor!  ///////////////

  // Setup Play Button and initialize
  const cssTransitions = () => {
    // for the Play button
    const playButton = document.getElementById("playButton");
    const header = document.getElementById("header");
    header.classList.add("active"); // Active header to begin transition
    playButton.classList.add("active"); // Active button to hide and start check for players (play game)
    main.classList.remove("hidden"); // Remove class from main to view contents
  };

  const playersModal = () => {
    // Start playersModal display
    const modal = document.getElementById("playersModal");
    // Remove hidden class to show modal
    modal.classList.remove("hidden");
    (() => {
      // Immediately invoked function expression to start modal transition
      // backdropDiv creation and deletion based on Modal
      // Create Element and assign ID
      const backdropCreate = () => {
        const main = document.getElementById("main");
        const backdropDiv = document.createElement("div");
        backdropDiv.id = "modalBackdrop";
        main.appendChild(backdropDiv);
      };
      // Check if Modal present
      function isModalPresent() {
        if (!modal.classList.contains("hidden")) {
          return true;
        } else {
          return false;
        }
      }
      // Hide Modal
      const backdropDivRemove = () => {
        if (isModalPresent === true) {
          modal.removeChild(backdropDiv);
        }

        if (checkPlayerInputs !== true) {
          modal.classList.add("hidden");
        }
      };
      // Check if Modal present
      if (isModalPresent() === true) {
        backdropCreate();
      }

      // Manage Modal Backdrop
      const backdrop = () => {
        backdropCreate(); // Create backdrop
        backdropDivRemove(); // Wait for modal to close
      };
      backdrop();

      
    })();
    // End playersModal display
    // Event listeners to close modalBackdrop and modal
    const backdropDiv = document.getElementById("modalBackdrop");
    backdropDiv.addEventListener("click", () => {
      modal.classList.add("hidden");
      backdropDiv.remove();
    });
    // Modal close to check game parameter and player inputs are setDifficulty and checkPlayerInputs


    const modalClose = () => {
      if (checkPlayerInputs() === true) {
        modal.classList.add("hidden");
        backdropDiv.remove();
      }
    };
    modalClose();
  };

  const playerOneName = () => {
    const inputElement = document.getElementById("playerOneInput");
    var playerOneParameter = playerOne.name;

    if (playerOneParameter === "") {
      if (
        inputElement.value === "" &&
        playerOne.parameters[0].player === null
      ) {
        const inputBody = document.getElementById("inputBody");
        console.log("ayy");
        const errorMsg = () => {
          var errorPresent = document.getElementById("errorMsg");
          if (
            errorPresent == null &&
            playerOne.parameters[0].player == null
          ) {
            const span = document.createElement("span");
            span.id = "errorMsg";
            span.innerHTML += "Please Enter Your Name";
            inputBody.appendChild(span);
          }
          
          }
          
        };
          
        inputElement.addEventListener("focusout", errorMsg, false);
      }

      if (
        inputElement.value !== "" ||
        playerOne.parameters[0].player !== null
      ) {
        // Remove error message & hide Modal
        errorPresent = document.getElementById("errorMsg");
        if (
          errorPresent === null &&
          playerOne.parameters[0].player === null
        ) {
          inputBody.removeChild(errorPresent);
          console.log("removed child?")
          playersModal();
        }
      inputElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const name = new String(inputElement.value);
          playerOne.name += name;
          console.log("Hello: " + playerOne.name);
          playerOne.parameters[0].player = 1;
          console.log(playerOne.parameters[0].player);
        } else if (e.key === "Escape") {
          inputElement.value = "";
          playerOne.parameters[0].player = 0;
        }
      });
    }
  };

  const playerTwoDifficulty = () => {
    if (gameState.parameters[0].player === null) {
      var buttons = document.querySelectorAll(".difficultySelect");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", setDifficulty);
        function setDifficulty() {
          var gameDifficultyState = gameState.parameters[0].difficulty;
          if (gameState.parameters[0].difficulty === null) {
            gameDifficultyState = parseInt([i]);
            console.log("Difficulty: " + gameDifficultyState);
            console.log(typeof gameDifficultyState);
          } else if (
            gameDifficultyState === gameState.parameters[0].difficulty
          ) {
            checkPlayerInputs();
            console.log(checkPlayerInputs());
          }
        }
      }
    }
  };

  // const playerTwoDifficulty = () => {
  //   const playerTwoInput = document.getElementById("playerTwoInput").value;
  //   const difficultyButtons = document.querySelectorAll("difficultySelect");
  // }

  const loadGame = () => {
    resetGameBoard();
    resetPlayers();

    playersModal();
    playerOneName();
    playerTwoDifficulty();
    checkPlayerInputs();
    playersModal();
    //closeModal(); // to build
    //initGame(); // to build
  };

  const initialize = () => {
    cssTransitions();
    loadGame();
  };

  const clickEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.id === "playButton") {
      const playButton = document.getElementById("playButton");
      playButton.classList.remove("active");

      initialize();
    }

    if (e.target.id === "difficultySelect") {
      const selectedButton = document.getElementById("difficultySelect");
      difficultySelect.classList.add("selected");
      initialize();
    }
  };


  // Start Game Logic
  

  const checkWhoWon = () => {
    // to tidy this
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

  

  

  const resetPlayers = () => {
    (playerOne.name = ""), (playerTwo.name = ""), (playerOne.turn = null);
    playerTwo.turn = null;

    playerOne.parameters[0].player = null;
    playerTwo.parameters[0].player = null;
  };

  const checkPlayerInputs = () => {
    console.log("quack");
    if (
      !playerOne.parameters[0].player !== null &&
      !gameState.parameters[0].difficulty !== null
    ) {
      console.log("falseInputs");
      console.log(playerOne.parameters[0].player);
      console.log(gameState.parameters[0].difficulty);
      return false;
    } else {
      console.log("trueInputs");
      return true;
    }
  };
  // Initialize checkPlayerInputs

  // Player Logic
  const playerOneTurn = () => {
    gameState.parameters[0].player = 1;
  };

  const playerTwoTurn = () => {
    gameState.parameters[0].player = 2;
  };
  // End Player Logic

  // Start mouse handling for game
  document.addEventListener("click", clickEvent);
  document.addEventListener("click", playerOneClick);
  document.addEventListener("mouseover", hoverEvent);
  document.addEventListener("mouseleave", leaveEvent);
  // End event listeners

  // Game loop Setup
})(window);
