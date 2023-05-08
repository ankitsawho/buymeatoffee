const hre = require("hardhat");

async function main() {
	const toffee = await hre.ethers.getContractFactory("toffee");
	const contract = await toffee.deploy();
	await contract.deployed();
	console.log("Address ", contract.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
