import React, { useState } from "react";
import useWeb3StateStore from "../../store/web3state";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BuyToffee() {
	const state = useWeb3StateStore((st) => st.state);
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const buytoffee = async () => {
		toast.info("In Progress", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: "colored",
		});
		const { contract } = state;
		const amount = { value: ethers.utils.parseEther("0.0001") };
		const txn = await contract.buymeatoffee(name, message, amount);
		await txn.wait();
		toast.success("Message sent successfully");
		setName("");
		setMessage("");
		window.location.reload();
	};

	return (
		<div className=" pt-32 w-screen flex items-center justify-center">
			<form className="w-full max-w-lg">
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-full">
						<input
							placeholder="Name"
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-full">
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Message..."
							cols={30}
							rows={10}
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						/>
					</div>
				</div>
				<div className="md:flex md:items-center">
					<div className="md:w-full">
						<button
							className="w-full shadow-lg bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-purple-300"
							type="button"
							onClick={buytoffee}
							disabled={
								!state.contract ||
								name.length === 0 ||
								message.length === 0
							}
						>
							Send
						</button>
					</div>
				</div>
			</form>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
}

export default BuyToffee;
