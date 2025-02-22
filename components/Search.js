"use client";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function Search({ search, setSearch, gameSearch }) {
	const { found } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		gameSearch(search);
	};

	return (
		<div className="w-auto h-20 flex flex-col justify-center items-center bg-neutral-800 rounded-lg border border-neutral-600">
			<form
				onSubmit={handleSubmit}
				className="w-full flex justify-center items-center"
				style={{ position: "relative", zIndex: "5" }}>
				<input
					type="text"
					className="w-3/5 h-8 rounded-l-full px-5"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button type="submit" text="Search" />
			</form>

			<div
				className="w-3/5 lg:w-4/5 h-5 text-xs flex justify-center items-end rounded-b-lg text-white bg-red-600 duration-300"
				style={
					!found
						? { marginTop: "-4px", position: "relative", zIndex: "4" }
						: { marginTop: "-30px", position: "relative", zIndex: "4" }
				}>
				title not found try again
			</div>
		</div>
	);
}
