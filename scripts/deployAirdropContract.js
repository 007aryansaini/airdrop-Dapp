const { ethers, upgrades, network, run } = require("hardhat");

async function deploy() {
  const ContractV1 = await ethers.getContractFactory("Airdrop");
  console.log("Deploying Contract...");
  const contractv1 = await upgrades.deployProxy(ContractV1);

  await contractv1.deployed();

  console.log(
    `Contract deployed on ${network.name} at address : ${contractv1.address}`
  );

  if (network.name !== "hardhat") {
    console.log(`Waiting for 6 confirmations to verify....`);

    await contractv1.deployTransaction.wait(6);

    await run("verify:verify", {
      address: contractv1.address,
      constructorArguments: [],
    });
  }
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
