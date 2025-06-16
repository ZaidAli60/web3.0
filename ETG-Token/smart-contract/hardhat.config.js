require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.INFURA_URL, // Default RPC URL for Ganache
      accounts: [`0x`+process.env.PRIVATE_KEY]
    },
  }
};
