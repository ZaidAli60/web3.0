require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
const {INFURA_URL,PRIVATE_KEY} = process.env
// console.log('INFURA_URL', INFURA_URL)
// console.log('PRIVATE_KEY', `0x`+PRIVATE_KEY)
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.INFURA_URL, // Default RPC URL for Ganache
      accounts: [`0x`+process.env.PRIVATE_KEY]
    },
  }
};
