require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545", // Default RPC URL for Ganache
      // chainId: 1337,               // Default Chain ID for Ganache
      accounts: [
        "0xd6020b890282ca4c13974ac73923f3dcfa5b8cc4593ee78bfdd6e74caa23a449",
        // Add more private keys if needed
      ]
    },
  }
};
