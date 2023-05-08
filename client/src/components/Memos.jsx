import React, { useState } from "react";
import useWeb3StateStore from "../../store/web3state";
import { useEffect } from "react";

function Memos() {
	const state = useWeb3StateStore((st) => st.state);
	const { contract } = state;
	const [memos, setMemos] = useState([]);

	const getAllMemos = async () => {
		const data = await contract.getMemos();
		setMemos(data);
	};

	useEffect(() => {
		contract && getAllMemos();
	}, [contract]);

	return (
		<div className="mt-16 mb-10">
			{memos
				.slice(0)
				.reverse()
				.map((memo) => {
					return (
						<table
							key={memo.timestamp}
							className="w-screen flex items-center justify-center mt-2"
						>
							<tbody className="md:w-1/2 bg-slate-50 p-6 rounded-lg shadow-lg">
								<tr className="flex items-center justify-between">
									<td className="text-purple-600 font-semibold">
										{memo.name}
									</td>
									<td className="text-slate-50 rounded-full bg-purple-600 px-2">
										{memo.from}
									</td>
								</tr>
								<tr>
									<td className=" font-light italic py-4">
										{memo.message}
									</td>
								</tr>
								<tr>
									<td className=" font-extralight text-xs">
										{memo.timestamp.toString()}
									</td>
								</tr>
							</tbody>
						</table>
					);
				})}
		</div>
	);
}

export default Memos;
