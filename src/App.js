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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white text-gray-800">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold">🪨📄✂️ Rock Paper Scissors DApp</h1>
          {account && (
            <p className="text-sm mt-1">
              Connected Wallet: <span className="font-mono text-yellow-200">{account}</span>
            </p>
          )}
        </div>
      </header>

      {/* Main App Container */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {contract ? (
          <>
            <Section title="1. Start Game">
              <StartGame contract={contract} account={account} />
            </Section>

            <Section title="2. Join Game">
              <JoinGame contract={contract} account={account} />
            </Section>

            <Section title="3. Send Bet">
              <SendBet contract={contract} account={account} />
            </Section>

            <Section title="4. Reveal Move">
              <RevealMove contract={contract} account={account} />
            </Section>

            <Section title="5. Abort Game (Timeout)">
              <AbortGame contract={contract} account={account} />
            </Section>

            <Section title="6. Game Status Viewer">
              <GameStatusViewer contract={contract} />
            </Section>
          </>
        ) : (
          <div className="text-center text-lg text-red-500 mt-10">Loading Web3 and Contract...</div>
        )}
      </main>
    </div>
  );
}

// Reusable Section component for clean layout
const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-xl font-semibold mb-4 text-indigo-700">{title}</h2>
    {children}
  </div>
);

export default App;
