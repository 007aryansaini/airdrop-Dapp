import React, { useState } from "react";
import "./AirdropBNBDifferent.css";
import { ethers } from "ethers";

const AirdropBNBDifferent = ({ state, userAddress, saveBalance }) => {
  const { contract } = state;

  const validateAddress = (address) => {
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
  };
  const [formData, setFormData] = useState({
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

  const sendAirdrop = async (event) => {
    try {
      event.preventDefault();

      if (!contract) {
        alert("Please Connect Your Wallet first");
        return;
      }

      if (formData.addresses === "") {
        alert("Enter one address at least");
        return;
      }

      if (formData.amount === "") {
        alert("Amount not correct");
        return;
      }

      const addressesArray = formData.addresses.split("#");
      const amountArray = formData.amount.split("#");

      if (addressesArray.length !== amountArray.length) {
        alert("Addresses and Amount values are not same");
        return;
      }

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

      let totalAmountToBeTaken = 0;

      amountArray.forEach((amount) => {
        if (amount.charAt[0] === "0" || amount.charAt(0) === "-1") {
          alert("One of the amount is less than or equal to zero");
          return;
        }
        amount *= 1;

        totalAmountToBeTaken = totalAmountToBeTaken + amount;

        if (amount <= 0) {
        }
      });

      const tx = await contract.aidropDifferentEtherToAddresses(
        addressesArray,
        amountArray,
        {
          value: totalAmountToBeTaken,
        }
      );
      const receipt = await tx.wait();
      if (receipt && receipt.status === 1) {
        alert("Airdrop Sent Successfully");
      }

      // Reset form data
      setFormData({
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
          className="addresses-input"
          type="text"
          name="addresses"
          placeholder="Enter addresses seprated by #"
          value={formData.addresses}
          onChange={handleChange}
        />

        <input
          className="different-amount-input"
          type="text"
          name="amount"
          placeholder="Enter Amount seprated by #"
          value={formData.amount}
          onChange={handleChange}
        />

        <button className="button" type="submit">
          Send Airdrop
        </button>
      </form>
    </div>
  );
};

export default AirdropBNBDifferent;
