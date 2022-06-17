// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ZRX = "0x3604133971a6370bF0f13F6550d90e33837CBCA3";
const BNB = "0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE";
const BUSD = "0x47D3AF8814db9d74827D681DDC526bB14aac82E1";
const FLASH_SWAP = "0xc7aB159445Dbf160F67b789D66d2Dd3a62ef3E5a";

const API = [
    'function approve(address spender, uint256 amount) public returns (bool)'
];


async function main() {

  let privateKey = "0xfec3318974dbdcc027d8e072ae31f53036eb49213561bc7844c5d5a88f843db0";
  let wallet = new ethers.Wallet(privateKey);

  // Connect a wallet to goerli
  const provider = new ethers.providers.InfuraProvider("goerli", "4cd91fcd955643eab22f2c0dcebf87e2");

  let walletWithProvider = new ethers.Wallet(privateKey, provider);

  const amount = hre.ethers.utils.parseEther("1000000000");
  
  const zrx = new hre.ethers.Contract(ZRX, API, walletWithProvider);
  tx = await zrx.approve(FLASH_SWAP, amount, {gasLimit:25000000});
  console.log(tx.hash);

  tx = await zrx.approve("0xcd9fB0FE3D706f2BA3a0A23fF5BD975A22AAdED2", amount, {gasLimit:25000000});
  console.log(tx.hash);

  const bnb = new hre.ethers.Contract(BNB, API, walletWithProvider);
  tx = await bnb.approve(FLASH_SWAP, amount, {gasLimit:25000000});
  console.log(tx.hash);


  const busd = new hre.ethers.Contract(BUSD, API, walletWithProvider);
  tx = await busd.approve(FLASH_SWAP, amount, {gasLimit:25000000});
  console.log(tx.hash);



/*

ZRX deployed to: 0x3604133971a6370bF0f13F6550d90e33837CBCA3
BNB deployed to: 0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE
BUSD deployed to: 0x47D3AF8814db9d74827D681DDC526bB14aac82E1

*/

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
