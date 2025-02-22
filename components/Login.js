"use client";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { register, setRegister, submitUser } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		submitUser(name, email, password);
		setRegister(false);
	};

	return (
		<div className=" flex flex-col flex-1 justify-center items-center gap-4 m-12 p-12 py-24 border border-solid border-white rounded-lg max-w-lg">
			<h3 className="text-3xl sm:text-4xl md:text-5xl text-indigo-500">
				{register ? "Register" : "Log In"}
			</h3>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col flex-1 justify-center items-center gap-4 w-full">
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
					// type="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none"
					placeholder="Password"
					type="password"
				/>
				<div className="max-w-[400px] w-full mx-auto">
					<Button text="Submit" full dark type="submit" />
				</div>
			</form>
			{!register && (
				<div className="max-w-[400px] w-full mx-auto">
					<Button
						clickHandler={() => {
							console.log("test");
							submitUser("", "demo", "demo");
						}}
						text="Demo"
						full
						dark
					/>
				</div>
			)}
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
