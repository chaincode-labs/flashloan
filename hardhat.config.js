require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.6",
  networks : {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts:["fec3318974dbdcc027d8e072ae31f53036eb49213561bc7844c5d5a88f843db0","030cfe191c6f051df8a84e5003d2547bb28934f8458ef4e33e1049584e0e0332"]
    },
    kovan: {
      url: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts:["030cfe191c6f051df8a84e5003d2547bb28934f8458ef4e33e1049584e0e0332"]
    },
    arbitrumRinkeby: {
      url: "https://arbitrum-rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    arbitrum: {
      url: "https://arbitrum-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    optimismKovan: {
      url: "https://optimism-kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    optimism: {
      url: "https://optimism-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    polygon: {
      url: "https://polygon-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
  }
};
