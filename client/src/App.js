import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SendAirdrop from "./components/SendAirdrop/SendAirdrop";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AirdropTypes from "./components/AirdropTypes/AirdropTypes";
import AirdropBNBDifferent from "./components/AirdropBNBDifferent/AirdropBNBDifferent";
import AirdropEqualToken from "./components/AirdropEqualToken/AirdropEqualToken";

const App = () => {
  const [state, setState] = useState({
    signer: null,
    contract: null,
  });

  const [balance, setBalance] = useState(0);
  const [userAddress, setUserAddress] = useState(null);

  const saveUserAddress = (newUserAddress) => {
    setUserAddress(newUserAddress);
  };

  const saveBalance = (newBalance) => {
    setBalance(newBalance);
  };
  const saveState = (state) => {
    setState(state);
  };
  return (
    <Router>
      <Header
        saveState={saveState}
        balance={balance}
        saveBalance={saveBalance}
        userAddress={userAddress}
        saveUserAddress={saveUserAddress}
      />
      <AirdropTypes />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/simple-airdrop"
          element={
            <SendAirdrop
              state={state}
              saveBalance={saveBalance}
              userAddress={userAddress}
            />
          }
        />
        <Route
          path="/simple-airdrop-token"
          element={
            <AirdropEqualToken
              state={state}
              saveBalance={saveBalance}
              userAddress={userAddress}
            />
          }
        />
        <Route
          path="/different-BNB-airdrop"
          element={
            <AirdropBNBDifferent
              state={state}
              saveBalance={saveBalance}
              userAddress={userAddress}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
