import React, { useEffect } from "react";
import "./SendAirdrop.css";

const SendAirdrop = ({ state }) => {
  const { contract } = state;

  const validateAddress = (address) => {
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
  };

  const sendAirdrop = async (e) => {
    try {
      e.preventDefault();
      if (!contract) {
        alert("Please Connect Your Wallet first");
        return;
      }

      const addressesString = e.target.addressesArray.value;
      const amount = e.target.amount.value;

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

      //   const tx = await contract.aidropSameEtherToAddresses(addressesArray, {
      //     value: amount,
      //   });
      //   tx.wait();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={sendAirdrop}>
        <input type="text" id="addressesArray" />
        <input type="number" id="amount" />
        <button type="submit">Send Airdrop</button>
      </form>
    </div>
  );
};

export default SendAirdrop;
