
const { ethers } = require("hardhat");
const hre = require("hardhat");

const ZRX = "0x3604133971a6370bF0f13F6550d90e33837CBCA3";
const BNB = "0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE";
const BUSD = "0x47D3AF8814db9d74827D681DDC526bB14aac82E1";


const FLASH_SWAP = "0xc7aB159445Dbf160F67b789D66d2Dd3a62ef3E5a";
const ABI = [
    'function addLiquidity(address _tokenA, address _tokenB, uint _amountA, uint _amountB) external'
];

async function main() {

  const [deployer] = await ethers.getSigners();

  const uniswapFlashSwap = new hre.ethers.Contract(FLASH_SWAP, ABI, deployer);  

  tx = await uniswapFlashSwap.addLiquidity(ZRX, BNB, ethers.utils.parseEther("20000"), ethers.utils.parseEther("1000"), {gasLimit:25000000});
  console.log(tx.hash);

  tx = await uniswapFlashSwap.addLiquidity(BNB, BUSD, ethers.utils.parseEther("3000"), ethers.utils.parseEther("20000"), {gasLimit:25000000});
  console.log(tx.hash);

  tx = await uniswapFlashSwap.addLiquidity(BUSD, ZRX, ethers.utils.parseEther("10000000"), ethers.utils.parseEther("10000"), {gasLimit:25000000});
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
