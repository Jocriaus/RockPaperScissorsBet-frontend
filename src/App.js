import React, { useEffect, useState } from "react";
import Web3 from "web3";
import RockPaperScissorsABI from "./abi/RockPaperScissors.json";
import StartGame from "./components/StartGame";
import JoinGame from "./components/JoinGame";
import SendBet from "./components/SendBet";
import RevealMove from "./components/RevealMove";
import AbortGame from "./components/AbortGame";
import GameStatusViewer from "./components/GameStatusViewer";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = RockPaperScissorsABI.networks[networkId];

        const contractInstance = new web3Instance.eth.Contract(
          RockPaperScissorsABI.abi,
          deployedNetwork && deployedNetwork.address
        );

        setContract(contractInstance);
      } else {
        alert("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">🪨📄✂️ Rock Paper Scissors DApp</h1>
        {account && (
          <p className="text-center mb-6 text-sm text-gray-600">
            Connected Account: <span className="font-mono">{account}</span>
          </p>
        )}

        {contract ? (
          <div className="space-y-8">
            <div className="bg-white shadow-md rounded-xl p-6">
              <StartGame contract={contract} account={account} />
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <JoinGame contract={contract} account={account} />
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <SendBet contract={contract} account={account} />
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <RevealMove contract={contract} account={account} />
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <AbortGame contract={contract} account={account} />
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <GameStatusViewer contract={contract} />
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-red-500">Loading Web3 and Contract...</p>
        )}
      </div>
    </div>
  );
}

export default App;
