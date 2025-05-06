
import Web3 from "web3";
import RockPaperScissors from "../abi/RockPaperScissors.json";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Install MetaMask");
      }
    });
  });

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  return new web3.eth.Contract(RockPaperScissors.abi, deployedAddress);
};

export { getWeb3, getContract };
