import { useState } from "react";

export default function Player({
  InitialName,
  symbol,
  isActive,
  handleNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(InitialName);

  let playerHTML = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerHTML = (
      <input type="text" value={playerName} required onChange={handleChange} />
    );
  }

  function handleEdit() {
    setIsEditing((wasEditing) => !wasEditing);

    if (isEditing) {
      handleNameChange(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerHTML}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>
        {isEditing ? <span>Save</span> : <span>Edit</span>}
      </button>
    </li>
  );
}
