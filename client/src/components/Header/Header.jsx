import React from "react";
import { Link } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import "./Header.css";

const Header = ({
  saveState,
  balance,
  saveBalance,
  userAddress,
  saveUserAddress,
}) => {
  return (
    <nav className="nav-container">
      <Link to={"/"} id="name">
        <h1>Crypto Drop</h1>
      </Link>

      <Wallet
        saveState={saveState}
        balance={balance}
        saveBalance={saveBalance}
        userAddress={userAddress}
        saveUserAddress={saveUserAddress}
      ></Wallet>
    </nav>
  );
};

export default Header;
