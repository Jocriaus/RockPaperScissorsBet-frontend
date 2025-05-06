import React, { useState } from "react";

function AbortGame({ contract, account }) {
  const [gameId, setGameId] = useState("");

  const handleAbort = async () => {
    if (!gameId) {
      alert("Please enter Game ID.");
      return;
    }

    try {
      await contract.methods.abortGame(gameId).send({ from: account });
      alert("Game aborted and funds refunded (if eligible).");
    } catch (error) {
      console.error("Error aborting game:", error);
      alert("Failed to abort game. Make sure the timeout has passed.");
    }
  };

  return (
    <div>
      <h2>Abort Game</h2>
      <input
        type="text"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <button onClick={handleAbort}>Abort Game</button>
    </div>
  );
}

export default AbortGame;
