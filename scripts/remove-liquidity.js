// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const ZRX = "0x3604133971a6370bF0f13F6550d90e33837CBCA3";
const BNB = "0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE";
const BUSD = "0x47D3AF8814db9d74827D681DDC526bB14aac82E1";


const FLASH_SWAP = "0xc7aB159445Dbf160F67b789D66d2Dd3a62ef3E5a";
const ABI = [
    'function removeLiquidity(address _tokenA, address _tokenB) external'
];

async function main() {

  const [deployer] = await ethers.getSigners();

  const uniswapFlashSwap = new hre.ethers.Contract(FLASH_SWAP, ABI, deployer);  

  tx = await uniswapFlashSwap.removeLiquidity(ZRX, BNB, {gasLimit:25000000});
  console.log(tx.hash);


  tx = await uniswapFlashSwap.removeLiquidity(BNB, BUSD, {gasLimit:25000000});
  console.log(tx.hash);
  

  tx = await uniswapFlashSwap.removeLiquidity(BUSD, ZRX, {gasLimit:25000000});
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
