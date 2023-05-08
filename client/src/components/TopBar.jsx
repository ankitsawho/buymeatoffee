import React from "react";

function TopBar(props) {
	return (
		<div className="fixed w-screen bg-slate-50 h-20 shadow-lg mb-4 flex items-center justify-between">
			<h2 className=" cursor-pointer font-bold ml-10 text-lg text-purple-600">
				BuyMeAToffee
			</h2>
			<p className="mr-9 bg-purple-600 text-slate-50 p-2 rounded-full">
				{props.account}
			</p>
		</div>
	);
}

export default TopBar;
