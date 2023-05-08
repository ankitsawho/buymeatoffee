import React, { useState } from "react";
import { useEffect } from "react";
import { ethers } from "ethers";
import abi from "./contracts/toffee.json";
import useWeb3StateStore from "../store/web3state";
import BuyToffee from "./components/BuyToffee";
import Memos from "./components/Memos";
import TopBar from "./components/TopBar";

function App() {
	const state = useWeb3StateStore((st) => st.state);
	const setState = useWeb3StateStore((st) => st.setState);
	const [account, setAccount] = useState("");

	const connectToWallet = async () => {
		const contractAddress = "0x72443259Eb7fC6FEAF92a6068Dc150D52A436392";
		const contractAbi = abi.abi;

		try {
			const { ethereum } = window;
			if (ethereum) {
				const eth_account = await ethereum.request({
					method: "eth_requestAccounts",
				});
				window.ethereum.on("chainChanged", () => {
					window.location.reload();
				});
				window.ethereum.on("accountChanged", () => {
					window.location.reload();
				});
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(
					contractAddress,
					contractAbi,
					signer
				);
				setAccount(eth_account);
				setState({ provider, signer, contract });
			} else {
				alert("Install Metamask");
			}
		} catch (error) {
			console.log("Error ", error);
		}
	};

	useEffect(() => {
		connectToWallet();
	}, []);

	console.log(state);
	return (
		<div>
			<TopBar account={account} />
			<BuyToffee />
			<Memos />
		</div>
	);
}

export default App;
