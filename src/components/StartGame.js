import React, { useState } from "react";
import Web3 from "web3";

function StartGame({ contract, account }) {
  const [opponent, setOpponent] = useState("");
  const [move, setMove] = useState("1");
  const [salt, setSalt] = useState("");

  const handleStart = async () => {
    const commitment = Web3.utils.soliditySha3({ type: "uint8", value: move }, { type: "bytes32", value: salt });
    await contract.methods.startGame(opponent, commitment).send({ from: account });
    alert("Game started!");
  };

  return (
    <div>
      <h2>Start New Game</h2>
      <input placeholder="Opponent Address" value={opponent} onChange={(e) => setOpponent(e.target.value)} />
      <select value={move} onChange={(e) => setMove(e.target.value)}>
        <option value="1">Rock</option>
        <option value="2">Paper</option>
        <option value="3">Scissors</option>
      </select>
      <input placeholder="Secret Salt" value={salt} onChange={(e) => setSalt(e.target.value)} />
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}

export default StartGame;
