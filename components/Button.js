import React from "react";

export default function Button({ text, color, full, clickHandler }) {
	return (
		<button
			onClick={clickHandler}
			className={
				" flex justify-center items-center overflow-hidden duration-200 " +
				(color === "red"
					? " text-white bg-red-600 hover:bg-red-700 w-20 mx-2 h-8 "
					: "text-white bg-indigo-600 hover:bg-indigo-700 h-12") +
				(full && " grid place-items-center w-full ") +
				(text === "Search" ? " rounded-r-full h-8" : " rounded-full ")
			}>
			<p className="px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ">{text}</p>
		</button>
	);
}
