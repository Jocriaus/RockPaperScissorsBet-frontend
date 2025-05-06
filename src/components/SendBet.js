import React, { useState } from "react";
import Web3 from "web3";

function SendBet({ contract, account }) {
  const [gameId, setGameId] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const handleSendBet = async () => {
    if (!gameId || !betAmount) {
      alert("Please enter both Game ID and Bet Amount.");
      return;
    }

    try {
      await contract.methods.sendBet(gameId).send({
        from: account,
        value: Web3.utils.toWei(betAmount, "ether"),
      });
      alert("Bet sent successfully!");
    } catch (error) {
      console.error("Error sending bet:", error);
      alert("Failed to send bet.");
    }
  };

  return (
    <div>
      <h2>Send Bet</h2>
      <input
        type="text"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bet Amount (in ETH)"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />
      <button onClick={handleSendBet}>Send Bet</button>
    </div>
  );
}

export default SendBet;
