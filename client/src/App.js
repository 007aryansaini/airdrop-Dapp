import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SendAirdrop from "./components/SendAirdrop/SendAirdrop";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AirdropTypes from "./components/AirdropTypes/AirdropTypes";
import AirdropBNBDifferent from "./components/AirdropBNBDifferent/AirdropBNBDifferent";

const App = () => {
  const [state, setState] = useState({
    signer: null,
    contract: null,
  });

  const saveState = (state) => {
    setState(state);
  };
  return (
    <Router>
      <Header saveState={saveState} />
      <AirdropTypes />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simple-airdrop" element={<SendAirdrop state={state} />} />
        <Route
          path="/different-BNB-airdrop"
          element={<AirdropBNBDifferent state={state} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
