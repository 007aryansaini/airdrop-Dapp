import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./Wallet.css";
import ABI from "./ABI.json";
import approveABI from "./ABIapprove.json";
const CONTRACT_ADDRESS = "0x90ae301b067a3694b3754EAFe9788aD5F6393D09";
const APPROVE_CONTRACT = "0xe6e62ec1F5C66b1CA30Ad71a13fB0a0EaEA4DB90";

const Wallet = ({
  saveState,
  balance,
  saveBalance,
  userAddress,
  saveUserAddress,
}) => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  // const [defaultAccount, setDefaultAccount] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // const [balance, setBalance] = useState(0);

  const initAccount = async () => {
    try {
      if (!isMetamaskConnected) {
        if (window.ethereum && window.ethereum.isMetaMask) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          const network = await provider.getNetwork();
          const chainId = network.chainId;

          if (chainId !== 97n) {
            alert("Please switch to Bsc Testnet");
            const networkRequest = {
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x61" }], // Replace with the desired chain ID
            };

            await window.ethereum.request(networkRequest);
          }

          let balanceOfUser = await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          });
          balanceOfUser = parseInt(balanceOfUser, 16).toString();
          balanceOfUser = ethers.formatEther(balanceOfUser);
          balanceOfUser = parseFloat(balanceOfUser).toFixed(2);

          saveUserAddress(accounts[0]);
          setIsMetamaskConnected(true);
          setDisabled(true);
          saveBalance(balanceOfUser);

          const signer = await provider.getSigner();

          const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

          const contractApproveToken = new ethers.Contract(
            APPROVE_CONTRACT,
            approveABI,
            signer
          );

          const state = {
            signer: signer,
            contract: contract,
            contractApproveToken,
          };

          saveState(state);
        } else {
          alert("You need to install Metamask first");
        }
      }
    } catch (error) {
      if (error.code === 4001) {
        alert("Please Connect again with bsc Testnet network in metamask");
      } else {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    const setNewAccountBalance = async (account) => {
      let balanceOfUser = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      balanceOfUser = parseInt(balanceOfUser, 16).toString();
      balanceOfUser = ethers.formatEther(balanceOfUser);
      balanceOfUser = parseFloat(balanceOfUser).toFixed(2);
      saveBalance(balanceOfUser);
    };

    const sendNetworkChangeRequest = async () => {
      try {
        const networkRequest = {
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x61" }], // Replace with the desired chain ID
        };

        await window.ethereum.request(networkRequest);
      } catch (error) {
        alert("Please switch to bsc Testnet");
        window.location.reload();
      }
    };
    if (window.ethereum.isConnected()) {
      window.ethereum.on("accountsChanged", (account) => {
        saveUserAddress(account);
        setNewAccountBalance(account[0]);
      });

      window.ethereum.on("chainChanged", (chainID) => {
        if (chainID !== "0x61") {
          alert("Please switch to Bsc Testnet");
          sendNetworkChangeRequest();
        }
      });
    }
  }, [isMetamaskConnected, saveBalance, saveUserAddress]);

  return (
    <div>
      <div className="Wallet-Container">
        <div className="wallet-details">
          {balance ? balance : 0}
          <span> </span>tBNB
        </div>
        <div className="wallet-details">
          {userAddress ? userAddress : "User Address"}
        </div>
        <button
          className="wallet-submit"
          onClick={initAccount}
          disabled={disabled}
        >
          {isMetamaskConnected ? "Connected" : "Connected Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Wallet;
