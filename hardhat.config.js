require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { POLYGON_MUMBAI_RPC_PROVIDER, PRIVATE_KEY, POLYGONSCAN_API_KEY } =
	process.env;

module.exports = {
	solidity: "0.8.18",
	networks: {
		mumbai: {
			url: POLYGON_MUMBAI_RPC_PROVIDER,
			accounts: [`0x${PRIVATE_KEY}`],
		},
	},
	solidity: {
		version: "0.8.19",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	etherscan: {
		apiKey: POLYGONSCAN_API_KEY,
	},
};

// contract address: 0x72443259Eb7fC6FEAF92a6068Dc150D52A436392
