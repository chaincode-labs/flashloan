
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const amount = hre.ethers.utils.parseEther("1000000000");
  
  const Token = await hre.ethers.getContractFactory("Token");
  const ZRX = await Token.deploy(amount, "zrx", "ZRX");

  await ZRX.deployed();

  console.log("ZRX deployed to:", ZRX.address);

  const BNB = await Token.deploy(amount, "bnb", "BNB");

  await BNB.deployed();

  console.log("BNB deployed to:", BNB.address);


  const BUSD = await Token.deploy(amount, "busd", "BUSD");

  await BUSD.deployed();

  console.log("BUSD deployed to:", BUSD.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
/*

ZRX deployed to: 0x3604133971a6370bF0f13F6550d90e33837CBCA3
BNB deployed to: 0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE
BUSD deployed to: 0x47D3AF8814db9d74827D681DDC526bB14aac82E1

*/