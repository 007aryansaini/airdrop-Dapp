import React, { useState } from "react";
import "./AirdropBNBDifferent.css";

const AirdropBNBDifferent = ({ state }) => {
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
        amount *= 1;

        totalAmountToBeTaken = totalAmountToBeTaken + amount;

        if (amount <= 0) {
          alert("One of the amount is less than or equal to zero");
          return;
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
