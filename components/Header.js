'use client'
import { useAuth } from "@/context/AuthContext";
import { Righteous } from "next/font/google";
import React from "react";
import Button from "./Button";

const righteous = Righteous({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	style: ["normal"],
});

export default function Header() {
	const {user, logOut} = useAuth()

	return (
		<div className={"md:w-4/6 h-24 flex justify-around items-center text-white " + righteous.className}>
			<h1 className="mr-5 xl:mx-12 text-4xl lg:text-7xl text-nowrap">
				Game Tracker
			</h1>
			<h1 className=' hidden md:block mx-8 text-lg lg:text-xl'>{'Welcome ' + user.name}</h1>
			<Button clickHandler={logOut} text='Sign Out'/>
		</div>
	);
}
