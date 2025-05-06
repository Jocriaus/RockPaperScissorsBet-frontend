import React, { useState } from "react";

function RevealMove({ contract, account }) {
  const [gameId, setGameId] = useState("");
  const [move, setMove] = useState("1"); // 1: Rock, 2: Paper, 3: Scissors
  const [salt, setSalt] = useState("");

  const handleReveal = async () => {
    if (!gameId || !salt) {
      alert("Please enter Game ID and Salt.");
      return;
    }

    try {
      await contract.methods
        .revealMove(gameId, move, salt)
        .send({ from: account });
      alert("Move revealed successfully!");
    } catch (error) {
      console.error("Error revealing move:", error);
      alert("Failed to reveal move.");
    }
  };

  return (
    <div>
      <h2>Reveal Move</h2>
      <input
        type="text"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <select value={move} onChange={(e) => setMove(e.target.value)}>
        <option value="1">Rock</option>
        <option value="2">Paper</option>
        <option value="3">Scissors</option>
      </select>
      <input
        type="text"
        placeholder="Secret Salt"
        value={salt}
        onChange={(e) => setSalt(e.target.value)}
      />
      <button onClick={handleReveal}>Reveal Move</button>
    </div>
  );
}

export default RevealMove;
