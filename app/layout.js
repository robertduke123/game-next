import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Game List",
	description: "Keep track of your rate of completion on various games.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={"bg-neutral-800 " + inter.className}>{children}</body>
			</AuthProvider>
		</html>
	);
}
