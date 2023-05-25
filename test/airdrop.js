const { ethers, network } = require("hardhat");

const { expect } = require("chai");
const provider = ethers.provider;

const testUSDT = "0xE933102Fa79EdcCF2107d188fD0F177897BC3Af0";

describe("Airdrop contract : disperseSameEtherToAddresses() function checks", () => {
  let contract;
  let owner;
  let investors;

  beforeEach(async function () {
    [owner, ...investors] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("AirDrop");
    contract = await Contract.deploy();
    await contract.deployed;
  });

  it("Should revert if the Amount per user is 0", async () => {
    let addresses = [];
    const options = {
      value: "1",
    };

    for (let i = 0; i < 2; i++) {
      addresses.push(investors[i].address);
    }
    await expect(
      contract.disperseSameEtherToAddresses(addresses, options)
    ).to.be.revertedWithCustomError(
      contract,
      "CannotSendZeroAmountToEachAddress"
    );
  });

  it("Should send the airdrop to addresses successfully", async () => {
    let addresses = [];
    let initialBalance = [];
    const options = {
      value: "10",
    };

    for (let i = 0; i < 2; i++) {
      addresses.push(investors[i].address);
    }

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      initialBalance.push(balance);
    }

    await contract.disperseSameEtherToAddresses(addresses, options);

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      // console.log(ethers.utils.formatEther(balance));
      expect(await provider.getBalance(addresses[i])).to.equal(
        initialBalance[i].add("5")
      );
    }
  });

  it("Should send the airdrop to addresses successfully to 500 addresses", async () => {
    let addresses = [];
    let initialBalance = [];
    const options = {
      value: "1000",
    };

    for (let i = 0; i < investors.length; i++) {
      addresses.push(investors[i].address);
    }

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      initialBalance.push(balance);
    }

    await contract.disperseSameEtherToAddresses(addresses, options);

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      // console.log(ethers.utils.formatEther(balance));
      expect(await provider.getBalance(addresses[i])).to.equal(
        initialBalance[i].add("2")
      );
    }
  });

  it("Should send the ether back to the owner if some ether left in the contract after successfull airdrop", async () => {
    let addresses = [];
    let initialBalance = [];
    const options = {
      value: "13",
    };

    for (let i = 0; i < 2; i++) {
      addresses.push(investors[i].address);
    }

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      initialBalance.push(balance);
    }

    await contract.disperseSameEtherToAddresses(addresses, options);

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      // console.log(ethers.utils.formatEther(balance));
      expect(await provider.getBalance(addresses[i])).to.equal(
        initialBalance[i].add("6")
      );
    }
  });
});

describe("Airdrop Contract : disperseDifferentEtherToAddresses() function check", () => {
  let contract;
  let owner;
  let investors;

  beforeEach(async function () {
    [owner, ...investors] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("AirDrop");
    contract = await Contract.deploy();
    await contract.deployed;
  });

  it("Should revert if the address array and the value array length is not equal ", async () => {
    let addresses = [];
    let values = [1];
    const options = {
      value: "100",
    };

    for (let i = 0; i < 10; i++) {
      addresses.push(investors[i].address);
      values.push(Math.floor(Math.random() * 5) + 1);
    }

    await expect(
      contract.disperseDifferentEtherToAddresses(addresses, values, options)
    ).to.be.revertedWithCustomError(
      contract,
      "SizeofRecipientsAndValuesArrayNotEqual"
    );
  });

  it("Should send the airdrop to addresses successfully", async () => {
    let addresses = [];
    let values = [];
    let initialBalance = [];
    const options = {
      value: "10",
    };

    for (let i = 0; i < 2; i++) {
      addresses.push(investors[i].address);
      values.push(5);
    }

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      initialBalance.push(balance);
    }

    await contract.disperseDifferentEtherToAddresses(
      addresses,
      values,
      options
    );

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      // console.log(ethers.utils.formatEther(balance));
      expect(await provider.getBalance(addresses[i])).to.equal(
        initialBalance[i].add("5")
      );
    }
  });

  it("Should send the airdrop to addresses successfully to 500 addresses", async () => {
    let addresses = [];
    let values = [];
    let initialBalance = [];
    const options = {
      value: "2500",
    };

    for (let i = 0; i < investors.length; i++) {
      addresses.push(investors[i].address);
      values.push(5);
    }

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      initialBalance.push(balance);
    }

    await contract.disperseDifferentEtherToAddresses(
      addresses,
      values,
      options
    );

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);

      expect(await provider.getBalance(addresses[i])).to.equal(
        initialBalance[i].add("5")
      );
    }
  });

  it("Should send the ether back to the owner if some ether left in the contract after successfull airdrop", async () => {
    let addresses = [];
    let initialBalance = [];
    let values = [];
    const options = {
      value: "13",
    };

    for (let i = 0; i < 2; i++) {
      addresses.push(investors[i].address);
      values.push(5);
    }

    for (let i = 0; i < addresses.length; i++) {
      const balance = await provider.getBalance(addresses[i]);
      initialBalance.push(balance);
    }

    await contract.disperseDifferentEtherToAddresses(
      addresses,
      values,
      options
    );

    for (let i = 0; i < addresses.length; i++) {
      expect(await provider.getBalance(addresses[i])).to.equal(
        initialBalance[i].add("5")
      );
    }
  });
});
