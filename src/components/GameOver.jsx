export default function GameOver({ winnerSymbol, hasDraw, onRestart }) {
  let message = hasDraw ? <p>It's a Draw</p> : <p>{winnerSymbol} Won!</p>;

  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {message}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
