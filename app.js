let player = (name, score, marker, turn) => {
  const getScore = () => score;
  const getName = () => name;
  const getMarker = () => marker;
  const getTurn = () => turn;
  const toggleTurn = () => {
    turn = !turn;
  };

  const winRound = () => ++score;

  return { getName, getScore, getMarker, getTurn, toggleTurn };
};

let gameBoard = (() => {
  let board;
  let round = 0;

  let addMark = (row, column, marker) => {
    round++;
    board[row][column] = marker;
    visualComponent.printBoard();
    checkWin(row, column);
  };
  function checkWin(row, col) {
    if (round < 4) return;
    // check row
    if (board[row].every((elm) => elm == board[row][0])) {
      alert("winennr");
      reset();
      visualComponent.printBoard();
    }
    // check columns
    if (board.every((elm) => elm[col] == board[0][col])) {
      alert("winner");
    }
    // check diagonal
    (() => {
      if ((row + col) % 2 == 1) return;

      let center = board[1][1];
      let topLeft = board[0][0];
      let bottomRight = board[2][2];
      let topRight = board[0][2];
      let bottomLeft = board[2][0];
      if (
        (bottomRight == topLeft && bottomRight == center && center) ||
        (bottomLeft == topRight && bottomLeft == center && center)
      ) {
        alert("winennr");
        reset();
        visualComponent.printBoard();
      }
    })();
    if (round == 9) {
      alert("tie");
      reset();
    }
  }
  let reset = function () {
    round = 0;
    board = Array(3)
      .fill()
      .map((_) => Array(3).fill(""));
  };
  let getBoard = () => board;

  reset();
  return { addMark, checkWin, getBoard };
})();

let gameFlow = (() => {
  let player1 = player("player1", 0, "X", true);
  let player2 = player("player2", 0, "O", false);

  function playRound(row, col) {
    let board = gameBoard.getBoard();
    if (!(board[row][col] == "")) return;

    console.log(this);
    let marker = player1.getTurn() ? player1.getMarker() : player2.getMarker();
    // this.innerText = marker;
    gameBoard.addMark(row, col, marker);
    // gameBoard.checkWin(round, row, col);
    player1.toggleTurn();
    player2.toggleTurn();
  }
  return { playRound };
})();

let visualComponent = (() => {
  let printBoard = () => {
    let board = gameBoard.getBoard();
    console.log(board);
    console.log("aaa");
    for (let i = 0; i < 3; i++) {
      let row = document.querySelector(`.row-${i + 1}`);
      for (let j = 0; j < 3; j++) {
        let cell = row.querySelector(`.cell-${j + 1}`);
        cell.innerText = board[i][j];
      }
    }
  };
  // initialize
  (() => {
    let board = gameBoard.getBoard();
    for (let i = 0; i < 3; i++) {
      let row = document.querySelector(`.row-${i + 1}`);
      for (let j = 0; j < 3; j++) {
        let cell = row.querySelector(`.cell-${j + 1}`);
        cell.innerText = board[i][j];
        cell.addEventListener("click", gameFlow.playRound.bind(cell, i, j));
      }
    }
  })();

  return { printBoard };
})();
