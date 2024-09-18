"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

export default function Graph() {
	const { userList, setUserList } = useAuth();
	const [graphSeg, setGraphseg] = useState({});

	useEffect(() => {
		setGraphseg({
			start: 0,
			finish: 0,
			complete: 0,
		});
		userList.forEach((item) => {

			item.completion === "start"
				? setGraphseg((prevState) => ({
						start: prevState.start + 1,
						finish: prevState.finish,
						complete: prevState.complete,
				  }))
				: item.completion === "finish"
				? setGraphseg((prevState) => ({
						start: prevState.start,
						finish: prevState.finish + 1,
						complete: prevState.complete,
				  }))
				: setGraphseg((prevState) => ({
						start: prevState.start,
						finish: prevState.finish,
						complete: prevState.complete + 1,
				  }));
		});
	}, [userList, setUserList]);

	function createGraph() {
		let amount = userList.length;
		let startPerc = (graphSeg.start / amount) * 100;
		let completePerc = 100 - (graphSeg.complete / amount) * 100;

		return {
			background: `linear-gradient(to right, rgb(248, 50, 208) ${startPerc}%, rgb(75, 192, 255) ${startPerc}%, rgb(75, 192, 255) ${completePerc}% ,rgb(47, 255, 82) ${completePerc}%)`,
		};
	}

	let linesArr = Array.from({ length: userList.length / 5 }, (e, i) => i);

	let lines = userList.map((item) => {
		let number = userList.indexOf(item);
		if (number + 1 === userList.length) {
			return (
				<div className="w-px h-8 bg-white" style={{ height: "8px" }}>
					<div className="relative" style={{ top: "18px", left: "-8px" }}>
						{number + 1 < 10 ? "0" + (number + 1) : number + 1}
					</div>
				</div>
			);
		} else {
			return (
				<div className="w-px h-8 bg-white">
					<div className="relative" style={{ top: "30px", left: "-8px" }}>
						{number + 1 < 10 ? "0" + (number + 1) : number + 1}
					</div>
				</div>
			);
		}
	});

	let largelines = linesArr.map((number) => {
		if (number + 1 === linesArr.length && userList.length % 5 === 0) {
			return;
		} else {
			return (
				<div className="w-px h-8 bg-white">
					<div className="relative" style={{ top: "30px", left: "-8px" }}>
						{(number + 1) * 5 < 10 ? "0" + (number + 1) * 5 : (number + 1) * 5}
					</div>
				</div>
			);
		}
	});

	// function createGap() {
	// 	let minFive = Math.floor(userList.length / 5) * 5;
	// 	let diffNum = userList.length - minFive;
	// 	let fiveGap = (420 / userList.length) * 5;
	// 	let gap = (420 / userList.length) * diffNum;
	// 	let negGap = fiveGap - gap;

	// 	return { marginLeft: `-${negGap}px`, height: "8px" };
	// }

	return (
		<div className="w-auto lg:w-1/2  m-5 ml-3 mb-4 text-white">
			<div className="w-auto h-40 flex justify-center items-center bg-neutral-800 rounded-lg border border-neutral-600">
				<div
					className="w-5/6 h-5 flex justify-between items-center border rounded-full"
					style={createGraph()}>
					<div className="w-px h-8 bg-white" style={{ height: "8px" }}>
						<div className="relative" style={{ top: "18px", left: "-8px" }}>
							00
						</div>
					</div>
					{userList.length <= 10 ? lines : largelines}
					{userList.length === 0 && (
						<div className="w-px h-8 bg-white" style={{ height: "8px" }}>
							<div className="relative" style={{ top: "18px", left: "-8px" }}>
								{"01"}
							</div>
						</div>
					)}
					{userList.length > 10 && (
						<div className="w-px h-8 bg-white" style={{ height: "8px" }}>
							<div className="relative" style={{ top: "18px", left: "-8px" }}>
								{userList.length}
							</div>
						</div>
					)}
				</div>
			</div>

			<div
				className="w-auto mt-5 flex justify-center items-center bg-neutral-800 rounded-lg border border-neutral-600"
				style={{ height: "398px" }}>
				<table className="w-5/6 h-5/6 flex flex-col justify-center items-center border border-neutral-600 shadow-md shadow-neutral-600 rounded-lg">
					<tbody className="w-full flex flex-col justify-center items-center">
						<tr className="w-11/12 h-12 my-2 flex justify-between items-center rounded-full bg-black">
							<th className="w-7/12 h-12 flex justify-center items-center rounded-l-full bg-neutral-500">
								Number of Games
							</th>
							<th className="w-5/12 h-12 flex justify-center items-center rounded-l-full">
								{userList.length}
							</th>
						</tr>
						<tr className="w-11/12 h-12 my-2 flex justify-between items-center rounded-full bg-black">
							<th
								className="w-7/12 h-12 flex justify-center items-center rounded-l-full"
								style={{ backgroundColor: "rgb(248, 50, 208)" }}>
								Number Started
							</th>
							<th className="w-5/12 h-12 flex justify-center items-center rounded-l-full">
								{graphSeg.start}
							</th>
						</tr>
						<tr className="w-11/12 h-12 my-2 flex justify-between items-center rounded-full bg-black">
							<th
								className="w-7/12 h-12 flex justify-center items-center rounded-l-full"
								style={{ backgroundColor: "rgb(75, 192, 255)" }}>
								NumberFinished
							</th>
							<th className="w-5/12 h-12 flex justify-center items-center rounded-l-full">
								{graphSeg.finish}
							</th>
						</tr>
						<tr className="w-11/12 h-12 my-2 flex justify-between items-center rounded-full bg-black">
							<th
								className="w-7/12 h-12 flex justify-center items-center rounded-l-full"
								style={{ backgroundColor: "rgb(47, 255, 82)" }}>
								Number Completed
							</th>
							<th className="w-5/12 h-12 flex justify-center items-center rounded-l-full">
								{graphSeg.complete}
							</th>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
