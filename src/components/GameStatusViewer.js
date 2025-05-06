import React, { useState } from "react";

function GameStatusViewer({ contract }) {
  const [gameId, setGameId] = useState("");
  const [status, setStatus] = useState("");
  const [bet1, setBet1] = useState(null);
  const [bet2, setBet2] = useState(null);

  const fetchStatus = async () => {
    if (!gameId) {
      alert("Enter a valid Game ID");
      return;
    }

    try {
      const gameState = await contract.methods.getGameState(gameId).call();
      const [amount1, amount2] = await contract.methods.getBetAmounts(gameId).call();

      const statusMap = {
        0: "Waiting For Player 1",
        1: "Waiting For Player 2",
        2: "Awaiting Reveal",
        3: "Game Over"
      };

      setStatus(statusMap[gameState] || "Unknown");
      setBet1(amount1);
      setBet2(amount2);
    } catch (error) {
      console.error("Error fetching game status:", error);
      alert("Failed to fetch game status.");
    }
  };

  return (
    <div>
      <h2>Game Status Viewer</h2>
      <input
        type="text"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <button onClick={fetchStatus}>Get Status</button>

      {status && (
        <div>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Player 1 Bet:</strong> {bet1} wei</p>
          <p><strong>Player 2 Bet:</strong> {bet2} wei</p>
        </div>
      )}
    </div>
  );
}

export default GameStatusViewer;
