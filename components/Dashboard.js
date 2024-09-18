"use client";
import React from "react";
import Header from "./Header";
import List from "./List";
import Graph from "./Graph";
// import ParticlesBg from "particles-bg";

export default function Dashboard() {
	return (
		<div className="w-auto md:w-full lg:h-screen flex flex-col justify-center items-center">
			{/* <ParticlesBg id='bg' type="cobweb" color="#ffffff" bg={true}/> */}
			<Header />
			<div className="w-96 md:w-11/12 xl:w-9/12 h-full flex flex-col lg:flex-row justify-between bg-black bg-opacity-50 ">
				<List />
				<Graph />
			</div>
		</div>
	);
}
