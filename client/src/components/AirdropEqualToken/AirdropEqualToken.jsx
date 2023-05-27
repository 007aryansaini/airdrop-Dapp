import "./AirdropEqualToken.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import ERC20ABI from "./ERC20ABI.json";

const AirdropEqualToken = ({ state, saveBalance, userAddress }) => {
  const [approved, setApproved] = useState(false);
  const { contract, signer } = state;

  const validateAddress = (address) => {
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
  };

  const [formData, setFormData] = useState({
    token: "",
    addresses: "",
    amount: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const sendAirdrop = async (e) => {
    try {
      e.preventDefault();

      const tokenAddress = formData.token;
      const addressesString = formData.addresses;
      const amount = formData.amount;

      if (!validateAddress(tokenAddress)) {
        alert("Invalid Token Address");
        return;
      }

      if (amount === "" || amount === "0") {
        alert("Enter a valid amount");
        return;
      }

      if (addressesString === "") {
        alert("Enter one address at least");
        return;
      }

      const addressesArray = addressesString.split("#");

      if (addressesArray.length > 500) {
        alert("You can airdrop to 500 addresses at a time");
        return;
      }
      addressesArray.forEach((address) => {
        if (!validateAddress(address)) {
          alert("One or more invalid address..Please check and try again!");
          return;
        }
      });

      if (!approved) {
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ERC20ABI,
          signer
        );

        console.log(tokenContract, state.signer);
        const tx = await tokenContract.approve(
          "0x90ae301b067a3694b3754EAFe9788aD5F6393D09",
          amount
        );

        const receipt0 = await tx.wait();
        if (receipt0 && receipt0.status === 1) {
          alert("Tokens Approved Successfully");
        }

        setApproved(true);
        return;
      }

      const tx = await contract.airdropSameTokenToAddresses(
        tokenAddress,
        addressesArray,
        amount
      );
      const receipt = await tx.wait();
      if (receipt && receipt.status === 1) {
        alert("Airdrop Sent Successfully");
      }

      setApproved(false);

      // Reset form data
      setFormData({
        token: "",
        addresses: "",
        amount: "",
      });

      if (window.ethereum) {
        let balanceOfUser = await window.ethereum.request({
          method: "eth_getBalance",
          params: [userAddress, "latest"],
        });
        balanceOfUser = parseInt(balanceOfUser, 16).toString();
        balanceOfUser = ethers.formatEther(balanceOfUser);
        balanceOfUser = parseFloat(balanceOfUser).toFixed(2);
        saveBalance(balanceOfUser);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={sendAirdrop}>
        <input
          className="token-input"
          type="text"
          name="token"
          placeholder="Enter Token Address"
          value={formData.token}
          onChange={handleChange}
        />
        <input
          className="addresses-input"
          type="text"
          name="addresses"
          placeholder="Enter Addresses seprate by #"
          value={formData.addresses}
          onChange={handleChange}
        />
        <input
          className="amount-input"
          type="number"
          name="amount"
          placeholder="Amount in wei"
          value={formData.amount}
          onChange={handleChange}
        />
        <button className="button" type="submit">
          {!approved ? <>Approve</> : <>Send Airdrop</>}
        </button>
      </form>
    </div>
  );
};

export default AirdropEqualToken;
