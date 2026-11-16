export default function GameBoard({ onSelectSquare, board }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectedSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = prevGameBoard.map((row) => row.map((col) => col));
  //     updatedBoard[rowIndex][colIndex] = activePlayer;
  //     return updatedBoard;
  //   });

  //   toggleTurn();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={rowIndex + " " + colIndex}>
                  <button
                    onClick={(e) => {
                      onSelectSquare(rowIndex, colIndex);
                    }}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
