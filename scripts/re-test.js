
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  // We get the contract to deploy
  const ReCall = await hre.ethers.getContractFactory("ReCall");
  const reCall = await ReCall.deploy();

  await reCall.deployed();

  console.log("ReCall deployed to:", reCall.address);


  const ReTest = await hre.ethers.getContractFactory("ReTest");
  const reTest = await ReTest.deploy();

  await reTest.deployed();
  

  console.log("ReTest deployed to:", reTest.address);
  const ZRX = "0x3604133971a6370bF0f13F6550d90e33837CBCA3";

  const ABI = [
      "function transfer(address recipient, uint256 amount) public returns (bool)"
  ];

  const zrxContract = new hre.ethers.Contract(ZRX, ABI, deployer);

  let tx = await zrxContract.transfer(reTest.address, 30000,  {gasLimit:250000});
  console.log(tx.hash);


  tx = await reCall.callRe(reTest.address, hre.ethers.BigNumber(10000),  {gasLimit:550000});

  console.log(tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
