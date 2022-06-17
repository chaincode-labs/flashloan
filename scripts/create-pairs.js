// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const ethers = require('ethers');


const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const ZRX = "0x3604133971a6370bF0f13F6550d90e33837CBCA3";
const BNB = "0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE";
const BUSD = "0x47D3AF8814db9d74827D681DDC526bB14aac82E1";
const FACTORY_ABI = [
    "function createPair(address tokenA, address tokenB) external returns (address pair)",
    "function getPair(address tokenA, address tokenB) external view returns (address pair)"
];


async function main() {
    const provider = new ethers.providers.InfuraProvider("goerli", "4cd91fcd955643eab22f2c0dcebf87e2");

    const factoryContract = new ethers.Contract(factoryAddress, FACTORY_ABI, provider);

    // A Signer from a private key
    let privateKey = '0xfec3318974dbdcc027d8e072ae31f53036eb49213561bc7844c5d5a88f843db0';
    let wallet = new ethers.Wallet(privateKey, provider);

    // Create a new instance of the Contract with a Signer, which allows
    // update methods
    let contractWithSigner = factoryContract.connect(wallet);
    // ... OR ...
    // let contractWithSigner = new Contract(contractAddress, abi, wallet)

    // Set a new Value, which returns the transaction
    let tx = await contractWithSigner.createPair(ZRX, BNB, {gasLimit:250000});

    // See: https://goerli.etherscan.io/tx/0xe67dee57e20b72c1ab0595dec31f287b7d6bad877dc988f6b69390e9c480cf84
    console.log(tx.hash);
    // "0xe67dee57e20b72c1ab0595dec31f287b7d6bad877dc988f6b69390e9c480cf84"

    // The operation is NOT complete yet; we must wait until it is mined
    //await tx.wait();

    // Call the Contract's getPair() method again
    let pair = await factoryContract.getPair(ZRX, BNB);
    console.log("ZRX/BNB pair: ", pair);

    let tx1 = await contractWithSigner.createPair(BNB, BUSD, {gasLimit:25000000});
    console.log(tx1.hash);

    //await tx1.wait();

    let pair1 = await factoryContract.getPair(BNB, BUSD);
    console.log("BNB/BUSD pair: ", pair1);

    let tx2 = await contractWithSigner.createPair(ZRX, BUSD, {gasLimit:25000000});
    console.log(tx2.hash);
    //await tx2.wait();

    let pair2 = await factoryContract.getPair(ZRX, BUSD);
    console.log("ZRX/BUSD pair: ", pair2);

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
0xc6495a149fa83f909b516235d20c04e786a4879288e3c6948615b3df0df8aedd
ZRX/BNB pair:  0xcd9fB0FE3D706f2BA3a0A23fF5BD975A22AAdED2
0x78ab9e6e05c0c354cf580346592a4c1b028ece416220186fedda2805df3e9a6f
BNB/BUSD pair:  0x71e0438a0eDA69C4E07d1Eb076c3E8D0d79444b1
0xe7e17f23e582acfc120beeb1cf0e6d466e5510e201d9cd7ca7618d48484b3f80
ZRX/BUSD pair:  0xE321e3105A05520a743762661854fD3DF43C8557
*/