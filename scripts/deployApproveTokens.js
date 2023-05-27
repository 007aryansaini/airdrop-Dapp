const { ethers, upgrades, network, run } = require("hardhat");

async function deploy() {
  const Contract = await ethers.getContractFactory("ApproveToken");
  console.log("Deploying Contract...");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log(
    `Contract deployed on ${network.name} at address : ${contract.address}`
  );

  if (network.name !== "hardhat") {
    console.log(`Waiting for 6 confirmations to verify....`);

    await contract.deployTransaction.wait(6);

    await run("verify:verify", {
      address: contract.address,
      constructorArguments: [],
    });
  }
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
