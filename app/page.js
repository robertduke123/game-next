"use client";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
	const { user } = useAuth();

	return <Main>{user?.id ? <Dashboard /> : <Login />}</Main>;
}
