require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  version: "0.8.10",
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // viaIR: true, /// This one
    },
  },
  networks: {
    hardhat: {
      accounts: {
        count: 25, // Number of testing accounts
        initialBalance: "5000000000000000000", // Amount of Ether in each testing account (5 Ether)
      },
      forking: {
        url: "https://bsc-dataseed.binance.org/",
        // url:"https://mainnet.infura.io/v3/8abc04a746ab4352bde4df1ad3e7f23b",
        // url:"https://data-seed-prebsc-1-s1.binance.org:8545",
        enabled: true,
      },
    },
    bscTestnet: {
      url: process.env.URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY,
    },
  },

  gasReporter: {
    currency: "USD",
    gasPrice: 20,
    enabled: false,
    coinmarketcap: process.env.COINMARTKETCAP_API,
    excludeContracts: [
      "Token",
      "PairContract",
      "UniswapFactory",
      "UniswapPair",
    ],
  },
};
