import React from "react";

export default function Main({ children }) {
	return (
		<main className="flex flex-1  justify-center items-center lg:h-screen">
			{children}
		</main>
	);
}
