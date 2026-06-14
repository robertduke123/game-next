import "./globals.css";
import AuthProvider from "@/context/AuthContext";

export const metadata = {
	title: "Game List",
	description: "Keep track of your rate of completion on various games.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				style={{
					fontFamily:
						'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				}}
				className="bg-neutral-800">
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
