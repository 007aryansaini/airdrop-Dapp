import "./SendAirdrop.css";
import React, { useState } from "react";

const SendAirdrop = ({ state }) => {
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

  const sendAirdrop = async (e) => {
    try {
      e.preventDefault();
      if (!contract) {
        alert("Please Connect Your Wallet first");
        return;
      }

      const addressesString = formData.addresses;
      const amount = formData.amount;

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

      const tx = await contract.aidropSameEtherToAddresses(addressesArray, {
        value: amount,
      });
      const receipt = await tx.wait();
      if (receipt && receipt.status === 1) {
        alert("Airdrop Sent Successfully");
      }

      // Reset form data
      setFormData({
        addresses: "",
        amount: "",
      });
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
          Send Airdrop
        </button>
      </form>
    </div>
  );
};

export default SendAirdrop;
