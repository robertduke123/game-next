"use client";
import {
	getAccessToken,
	getUsers,
	refreshLogin,
	signIn,
	logOutUser,
	verify,
	logDataChange,
	registerUser,
	getId,
} from "@/firebase.config";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

const urlApiKey = process.env.NEXT_PUBLIC_URL_API_KEY;

const xRapidKey = process.env.NEXT_PUBLIC_X_RAPID_API;

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [userList, setUserList] = useState([]);
	const [found, setFound] = useState(true);
	const [register, setRegister] = useState(false);

	const setUserData = async (data) => {
		const { id, name, email, log, image, completion } = data;
		setUser({
			id: id,
			name: name,
			email: email,
		});

		const newList = [];
		log?.forEach((item, indx) => {
			newList.push({
				name: item,
				img: image[indx],
				completion: completion[indx],
			});
		});
		setUserList(newList);
	};

	const submitUser = async (name, email, password) => {
		if (!register) {
			await signIn(email, password).then((data) => {
				if (data) {
					getAccessToken(email).then((data) => {
						localStorage.setItem("refreshToken", data.refresh);
						verify(data.access).then((data) => {
							if (data) {
								getUsers(email).then((data) => {
									setUserData(data);
								});
							}
						});
					});
				}
			});
		} else {
			await registerUser({ email, name, password }).then((data) => {
				localStorage.setItem("refreshToken", data.refreshToken);
				const { id, name, email } = data;
				setUser({
					id,
					name,
					email,
				});
			});
		}
	};

	const logOut = async () => {
		await logOutUser(user.email).then((data) => {
			setUser({});
			setUserList([]);
			localStorage.removeItem("refreshToken");
		});
	};

	useEffect(() => {
		const refresh = localStorage.getItem("refreshToken");
		if (refresh) {
			refreshLogin(refresh).then((data) => {
				verify(data).then((data) => {
					if (data) {
						getUsers(data.email).then((data) => {
							setUserData(data);
						});
					}
				});
			});
		}
	}, []);

	const logData = async (list) => {
		if (user?.email) {
			const log = [];
			const image = [];
			const completion = [];
			list.forEach((item) => {
				log.push(item.name);
				image.push(item.img);
				completion.push(item.completion);
			});
			logDataChange(user.email, log, image, completion);
		}
	};

	useEffect(() => {
		logData(userList);
	}, [userList]);

	async function gameSearch(search) {
		const itemSearch = search.replaceAll(" ", "-").toLowerCase();

		const url = `https://rawg-video-games-database.p.rapidapi.com/games/${itemSearch}?key=${urlApiKey}`;

		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": `${xRapidKey}`,
				"X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
			},
		};

		await fetch(url, options)
			.then((res) => res.json())
			.then((data) => {
				if (data?.name) {
					setFound(true);
					if (userList.some((item) => item.name === data.name)) {
						return;
					}
					setUserList((prevList) => [
						...prevList,
						{
							name: data.name,
							img: data.background_image,
							completion: "start",
						},
					]);
					logData(userList);
				} else {
					setFound(false);
				}
			})
			.catch((err) => console.error("error:" + err));
	}

	const value = {
		user,
		setUser,
		submitUser,
		userList,
		setUserList,
		gameSearch,
		found,
		register,
		setRegister,
		logOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
