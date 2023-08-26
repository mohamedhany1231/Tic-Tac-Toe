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

let gameFlow = (() => {
  let player1 = player("player1", 0, "X", true);
  let player2 = player("player2", 0, "O", false);
  let printBoard = () => {
    let board = Array(3)
      .fill()
      .map((_) => Array(3).fill(""));
    for (let i = 0; i < 3; i++) {
      let row = document.querySelector(`.row-${i + 1}`);
      for (let j = 0; j < 3; j++) {
        let cell = row.querySelector(`.cell-${j + 1}`);
        cell.addEventListener("click", function () {
          let marker = player1.getTurn()
            ? player1.getMarker()
            : player2.getMarker();
          this.innerText = marker;
          board[i][j] = marker;
          console.log(board);
          player1.toggleTurn();
        });
      }
    }
  };
  printBoard();
})();
