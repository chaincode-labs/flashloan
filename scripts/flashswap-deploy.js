
const hre = require("hardhat");

const factoryAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const routerAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  // We get the contract to deploy
  const FlashSwap = await hre.ethers.getContractFactory("UniswapFlashSwap");
  const flashSwap = await FlashSwap.deploy();

  await flashSwap.deployed();

  console.log("FlashSwap deployed to:", flashSwap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
