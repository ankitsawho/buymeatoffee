const hre = require("hardhat");

async function getBalances(address) {
	const balanceBigInt = await hre.ethers.provider.getBalance(address);
	return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
	let count = 1;
	for (const address of addresses) {
		console.log(`Address ${count++} balance: `, await getBalances(address));
	}
}

async function consoleMemos(memos) {
	for (const memo of memos) {
		const timestamp = memo.timestamp;
		const name = memo.name;
		const from = memo.from;
		const message = memo.message;
		console.log(
			`At ${timestamp} name ${name} (address ${from}) sent message: ${message}`
		);
	}
}

async function main() {
	const [owner, from1, from2, from3] = await hre.ethers.getSigners();
	const toffee = await hre.ethers.getContractFactory("toffee");
	const contract = await toffee.deploy();
	await contract.deployed();

	console.log(contract.address);

	const addresses = [owner.address, from1.address, contract.address];
	await consoleBalances(addresses);

	const amt = { value: hre.ethers.utils.parseEther("1000") };
	await contract
		.connect(from1)
		.buymeatoffee("from1", "message from from1 hey", amt);
	await contract
		.connect(from2)
		.buymeatoffee("from2", "message from from2 hey", amt);
	await contract
		.connect(from3)
		.buymeatoffee("from3", "message from from3 hey", amt);

	await consoleBalances(addresses);

	const memos = await contract.getMemos();
	consoleMemos(memos);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
