import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const App = () => {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [balance, setBalance] = useState(0);

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

          setDefaultAccount(accounts[0]);
          setIsMetamaskConnected(true);
          setDisabled(true);
          setBalance(balanceOfUser);
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
      console.log(account);
      let balanceOfUser = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      balanceOfUser = parseInt(balanceOfUser, 16).toString();
      balanceOfUser = ethers.formatEther(balanceOfUser);
      balanceOfUser = parseFloat(balanceOfUser).toFixed(2);
      setBalance(balanceOfUser);
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
        setDefaultAccount(account);
        setNewAccountBalance(account[0]);
      });

      window.ethereum.on("chainChanged", (chainID) => {
        if (chainID !== "0x61") {
          alert("Please switch to Bsc Testnet");
          sendNetworkChangeRequest();
        }
      });
    }
  }, [isMetamaskConnected]);

  return (
    <div>
      <button onClick={initAccount} disabled={disabled}>
        {isMetamaskConnected ? "Connected" : "Connected Wallet"}
      </button>
      <div>{defaultAccount ? defaultAccount : "User Address"}</div>
      <div>{balance ? balance : 0}</div>
    </div>
  );
};

export default App;
