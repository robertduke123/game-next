"usse client";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import Button from "./Button";
import Search from "./Search";

export default function List() {
	const { userList, setUserList, gameSearch } = useAuth();
	const [search, setSearch] = useState("");
	const alphaList = [...userList];
	alphaList.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});	

	const statusChange = (completion, indx) => {
		const newUserList = [...alphaList];
		newUserList[indx].completion = completion;
		setUserList(newUserList);
	};

	const deleteItem = (index) => {
		const newUserList = [...alphaList];
		newUserList.splice(index, 1);
		setUserList(newUserList);
	};

	return (
		<div className="w-auto lg:w-1/2 h-full m-5 mr-3 mb-4">
			<Search search={search} setSearch={setSearch} gameSearch={gameSearch} />
			<div
				className="mt-3 bg-neutral-800 text-white overflow-y-scroll rounded-lg border border-neutral-600"
				style={{ height: "70vh" }}>
				{alphaList?.length > 0 &&
					alphaList?.map((item, itemIndx) => {
						const name = item.name.toLowerCase();
						return (
							<div
								key={"item " + itemIndx}
								className={
									"w-full h-20 px-6 flex justify-between items-center border border-neutral-600 " +
									(itemIndx === 0 && "rounded-tl-lg")
								}>
								<div
									className="w-28 h-16 rounded-lg"
									style={{
										backgroundImage: `url(${item.img})`,
										backgroundPosition: "center",
										backgroundSize: "cover",
									}}
								/>
								<p className="w-36 h-12 px-2 text-xs text-nowrap md:text-wrap text-ellipsis truncate flex justify-around items-center border border-neutral-600 rounded-lg">
									{item.name}
								</p>
								<Button
									clickHandler={() => deleteItem(itemIndx)}
									text="delete"
									color="red"
								/>
								<div className="w-28 h-12 flex justify-around items-center border border-neutral-600 rounded-lg">
									<div
										id="0"
										className="w-5 h-5 border rounded-full cursor-pointer"
										style={
											item.completion === "start"
												? { backgroundColor: "rgb(248, 50, 208)" }
												: { backgroundColor: "" }
										}
										onClick={(e) => statusChange("start", itemIndx)}></div>
									<div
										id="1"
										className="w-5 h-5 border rounded-full cursor-pointer"
										style={
											item.completion === "finish"
												? { backgroundColor: "rgb(75, 192, 255)" }
												: { backgroundColor: "" }
										}
										onClick={(e) => statusChange("finish", itemIndx)}></div>
									<div
										id="2"
										className="w-5 h-5 border rounded-full cursor-pointer"
										style={
											item.completion === "complete"
												? { backgroundColor: "rgb(47, 255, 82)" }
												: { backgroundColor: "" }
										}
										onClick={(e) => statusChange("complete", itemIndx)}></div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
