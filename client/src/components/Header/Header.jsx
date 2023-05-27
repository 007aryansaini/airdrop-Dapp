import React from "react";
import { Link } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import "./Header.css";

const Header = ({ saveState }) => {
  return (
    <nav className="nav-container">
      <Link to={"/"} id="name">
        <h1>Crypto Drop</h1>
      </Link>
      <Link to={"/simple-airdrop"}>Simple Airdrop</Link>
      <Wallet saveState={saveState}></Wallet>
    </nav>
  );
};

export default Header;
