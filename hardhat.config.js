require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.18",
	networks: {
		sepolia: {
			url: SEPOLIA_URL,
			accounts: [PRIVATE_KEY],
		},
	},
};

// contract address: 0x72443259Eb7fC6FEAF92a6068Dc150D52A436392
