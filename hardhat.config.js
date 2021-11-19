require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: process.env.POLYGON_MUMBAI_KEY_DEV,
      accounts: [privateKey],
    },
    mainnet: {
      url: process.env.POLYGON_MUMBAI_KEY_PROD,
      accounts: [privateKey],
    },
  },
};
