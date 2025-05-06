import React, { useState } from "react";
import Web3 from "web3";

function JoinGame({ contract, account }) {
  const [gameId, setGameId] = useState("");
  const [move, setMove] = useState("1"); // 1: Rock, 2: Paper, 3: Scissors
  const [salt, setSalt] = useState("");

  const handleJoin = async () => {
    if (!gameId || !salt) {
      alert("Please enter Game ID and Salt.");
      return;
    }

    const commitment = Web3.utils.soliditySha3(
      { type: "uint8", value: move },
      { type: "bytes32", value: salt }
    );

    try {
      await contract.methods.joinGame(gameId, commitment).send({ from: account });
      alert("Joined game successfully!");
    } catch (error) {
      console.error("Error joining game:", error);
      alert("Failed to join game.");
    }
  };

  return (
    <div>
      <h2>Join Existing Game</h2>
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
      <button onClick={handleJoin}>Join Game</button>
    </div>
  );
}

export default JoinGame;
