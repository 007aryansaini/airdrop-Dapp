import React from "react";
import "./AirdropTypes.css";
import { Link } from "react-router-dom";

const AirdropTypes = () => {
  return (
    <div className="airdrop-types-container">
      <Link to={"/simple-airdrop"} className="types-heading">
        Airdrop equal BNB
      </Link>
      <Link to={"/different-BNB-airdrop"} className="types-heading">
        Airdrop different BNB
      </Link>
      <Link to={"/simple-airdrop-token"} className="types-heading">
        Airdrop equal Tokens
      </Link>
      <Link to={"/simple-airdrop"} className="types-heading">
        Airdrop Different Tokens
      </Link>
    </div>
  );
};

export default AirdropTypes;
