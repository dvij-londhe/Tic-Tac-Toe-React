import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning_combinations.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSq = gameBoard[combination[0].row][combination[0].column];
    const secondSq = gameBoard[combination[1].row][combination[1].column];
    const thirdSq = gameBoard[combination[2].row][combination[2].column];

    if (firstSq && firstSq === secondSq && firstSq === thirdSq) {
      winner = players[firstSq];
    }
  }
  return winner;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex) {
    // setActivePlayer((turn) => (turn === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, playerName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: playerName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            InitialName={players.X}
            symbol="X"
            handleNameChange={handleNameChange}
          />
          <Player
            isActive={activePlayer === "O"}
            InitialName={players.O}
            symbol="O"
            handleNameChange={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            onRestart={handleRestart}
            hasDraw={hasDraw}
            winnerSymbol={winner}
          ></GameOver>
        )}
        <GameBoard
          onSelectSquare={handleSelectedSquare}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
