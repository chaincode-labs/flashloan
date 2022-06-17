const { ethers } = require("hardhat");
const hre = require("hardhat");
const constants = require("./constants");

async function main() {

  const [deployer] = await ethers.getSigners();

  const uniswapFlashSwap = new hre.ethers.Contract(constants.ROUTER, constants.ABI, deployer);  

  const pairContract = new hre.ethers.Contract("0xcd9fB0FE3D706f2BA3a0A23fF5BD975A22AAdED2", constants.GET_RESERVES_ABI, deployer);
  const ret = await pairContract.getReserves();
  console.log("BNB/ZRX: ",  ethers.utils.formatUnits(ret.reserve0, 18), ethers.utils.formatUnits(ret.reserve1, 18))

  balance = await uniswapFlashSwap.getAmountIn(ethers.utils.parseEther("5000"), ret.reserve0, ret.reserve1, {gasLimit:25000000});
  console.log("借 ZRX 5000 需要还 BNB ",ethers.utils.formatUnits(balance, 18));

  let path = new Array;
  //ZRX->BUSD->BNB
  
  path[0] = constants.ZRX;

  path[1] = constants.BUSD;

  path[2] = constants.BNB;

  const amounts = await uniswapFlashSwap.getAmountsOut(ethers.utils.parseEther("5000"), path, {gasLimit:25000000});

  console.log("ZRX ---> BUSD  --->  BNB", ethers.utils.formatUnits(amounts[0], 18), ethers.utils.formatUnits(amounts[1], 18), ethers.utils.formatUnits(amounts[2], 18));

  console.log("利润 BNB: ", ethers.utils.formatUnits(amounts[2].sub(balance), 18));

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
