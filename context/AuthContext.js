"use client";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [userList, setUserList] = useState([]);
	const [found, setFound] = useState(true);
	const [register, setRegister] = useState(false);

	const setUserData = async (data) => {
		const { id, name, email, log, image, completion } = data[0];
		setUser({
			id: id,
			name: name,
			email: email,
		});
		const newList = [];
		log.forEach((item, indx) => {
			newList.push({
				name: item,
				img: image[indx],
				completion: completion[indx],
			});
		});
		setUserList(newList);	
	}

	const submitUser = async (name, email, password) => {
		if(!register){
			await fetch("http://localhost:4000/signin", {
			method: 'POST',
			headers: {'Content-Type' : 'application/Json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			localStorage.setItem('refreshToken', data.refreshToken)
			fetch("http://localhost:4000/post",
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
						"Content-Type": "application/json",
					},
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);
				setUserData(data)			
		})
		})		
		} else {
			await fetch("http://localhost:4000/register", {
				method: "POST",
				headers: { "Content-Type": "application/Json" },
				body: JSON.stringify({
					name: name,
					email: email,
					password: password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					const { id, name, email } = data;
					setUser({
						id: id,
						name: name,
						email: email,
					});
				});
		}
	};

	const logOut = async() => {
		await fetch("http://localhost:4000/token", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: user.email,
			}),
		})
		.then(res => res.json())
		.then(data => {
			console.log(data[0]);
			setUser({})
			setUserList([])		
			localStorage.removeItem('refreshToken')	
		})
	}  

	useEffect(() =>  {
		const refresh = localStorage.getItem("refreshToken");
		fetch(
			"http://localhost:4000/token",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token: refresh,
				}),
			}
		)
			.then((response) => {
				if (response.status !== 403) {
					return response.json();
				}
			})
			.then((data) => {
				if (data?.length > 15) {
					fetch(
						"http://localhost:4000/post",
						{
							headers: {
								Authorization: `Bearer ${data}`,
								"Content-Type": "application/json",
							},
						}
					)
						.then((response) => response.json())
						.then((data) => {
							setUserData(data)
						})
					}})
	}, [])

	const logData = async (list) => {
		if(user?.id) {
			
		}
		const log = []
		const image = [];
		const completion = [];
		list.forEach((item) => {
			log.push(item.name)
			image.push(item.img)
			completion.push(item.completion)
		})
		await fetch("http://localhost:4000/log", {
			method: "PUT",
			headers: { "Content-Type": "application/Json" },
			body: JSON.stringify({
				user: user.name,
				log: log,
				image: image,
				completion: completion
			})
		})
		.then(res => res.json())
	}
	useEffect(() => {
		if(userList.length > 0) {
			logData(userList)
		}		
	}, [userList])

	// useEffect(() => {
	// 	async function fetchApi() {
	// 		const url = `https://rawg-video-games-database.p.rapidapi.com/games?key=${process.env.NEXT_PUBLIC_URL_API_KEY}`;

	// 		const options = {
	// 			method: "GET",
	// 			headers: {
	// 				"X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API,
	// 				"X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
	// 			},
	// 		};

	// 		await fetch(url, options)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				setList(data.results);
	// 				setUserList([]);
	// 				data.results.map((item) => {
	// 					setUserList((prevList) => [
	// 						...prevList,
	// 						{
	// 							name: item.name,
	// 							img: item.background_image,
	// 							completion: "start",
	// 						},
	// 					]);
	// 				});
	// 			})
	// 			.catch((err) => console.error("error:" + err));
	// 	}
	// 	fetchApi();
	// }, []);

	async function gameSearch(search) {
		const itemSearch = search.replaceAll(" ", "-").toLowerCase();
		console.log(itemSearch);

		const url = `https://rawg-video-games-database.p.rapidapi.com/games/${itemSearch}?key=${process.env.NEXT_PUBLIC_URL_API_KEY}`;

		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API,
				"X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
			},
		};

		await fetch(url, options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data?.name) {
					setFound(true);
					setUserList((prevList) => [
						...prevList,
						{
							name: data.name,
							img: data.background_image,
							completion: "start",
						},
					]);
					// logData(userList)
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
		logOut
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
