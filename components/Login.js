"use client";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { register, setRegister, submitUser } = useAuth();

	return (
		<div className="mt-28 lg:mt-0 flex flex-col flex-1 justify-center items-center gap-4 mx-12 p-12 py-24 border border-solid border-white rounded-lg max-w-lg">
			<h3 className="text-3xl sm:text-4xl md:text-5xl text-indigo-500">
				{register ? "Register" : "Log In"}
			</h3>
			{register && (
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none"
					placeholder="Name"
				/>
			)}

			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none"
				placeholder="Email"
			/>
			<input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none"
				placeholder="Password"
				type="password"
			/>
			<div className="max-w-[400px] w-full mx-auto">
				<Button
					clickHandler={() => {
						submitUser(name, email, password)
						setRegister(false)
					}}
					text="Submit"
					full
					dark
				/>
			</div>
			<p className="text-center text-white">
				{register ? "Already have an account?" : "Don't have an account?"}
				<button
					className="text-indigo-600"
					onClick={() => setRegister(!register)}>
					{register ? "Sign In" : "Sign Up"}
				</button>
			</p>
		</div>
	);
}
