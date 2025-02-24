(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
	[185],
	{
		3798: function (e, t, n) {
			Promise.resolve().then(n.bind(n, 4263)),
				Promise.resolve().then(n.t.bind(n, 4321, 23)),
				Promise.resolve().then(n.t.bind(n, 8877, 23));
		},
		4263: function (e, t, n) {
			"use strict";
			n.d(t, {
				a: function () {
					return i;
				},
				default: function () {
					return c;
				},
			});
			var o = n(7437),
				a = n(2265);
			let s = a.createContext();
			function i() {
				return (0, a.useContext)(s);
			}
			function c(e) {
				let { children: t } = e,
					[n, i] = (0, a.useState)({}),
					[c, l] = (0, a.useState)([]),
					[r, h] = (0, a.useState)(!0),
					[p, d] = (0, a.useState)(!1),
					m = async (e) => {
						let {
							id: t,
							name: n,
							email: o,
							log: a,
							image: s,
							completion: c,
						} = e[0];
						i({ id: t, name: n, email: o });
						let r = [];
						a.forEach((e, t) => {
							r.push({ name: e, img: s[t], completion: c[t] });
						}),
							l(r);
					},
					f = async (e, t, n) => {
						p
							? await fetch("https://game-next-api.onrender.com/register", {
									method: "POST",
									headers: { "Content-Type": "application/Json" },
									body: JSON.stringify({ name: e, email: t, password: n }),
							  })
									.then((e) => e.json())
									.then((e) => {
										let { id: t, name: n, email: o } = e;
										i({ id: t, name: n, email: o });
									})
							: await fetch("https://game-next-api.onrender.com/signin", {
									method: "POST",
									headers: { "Content-Type": "application/Json" },
									body: JSON.stringify({ email: t, password: n }),
							  })
									.then((e) => e.json())
									.then((e) => {
										localStorage.setItem("refreshToken", e.refreshToken),
											fetch("https://game-next-api.onrender.com/post", {
												headers: {
													Authorization: "Bearer ".concat(e.accessToken),
													"Content-Type": "application/json",
												},
											})
												.then((e) => e.json())
												.then((e) => {
													console.log(e), m(e);
												});
									});
					},
					u = async () => {
						await fetch("https://game-next-api.onrender.com/token", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ email: n.email }),
						})
							.then((e) => e.json())
							.then((e) => {
								i({}), l([]), localStorage.removeItem("refreshToken");
							});
					};
				(0, a.useEffect)(() => {
					fetch("https://game-next-api.onrender.com/token", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							token: localStorage.getItem("refreshToken"),
						}),
					})
						.then((e) => {
							if (403 !== e.status) return e.json();
						})
						.then((e) => {
							(null == e ? void 0 : e.length) > 15 &&
								fetch("https://game-next-api.onrender.com/post", {
									headers: {
										Authorization: "Bearer ".concat(e),
										"Content-Type": "application/json",
									},
								})
									.then((e) => e.json())
									.then((e) => {
										m(e);
									});
						});
				}, []);
				let g = async (e) => {
					null == n || n.id;
					let t = [],
						o = [],
						a = [];
					e.forEach((e) => {
						t.push(e.name), o.push(e.img), a.push(e.completion);
					}),
						await fetch("https://game-next-api.onrender.com/log", {
							method: "PUT",
							headers: { "Content-Type": "application/Json" },
							body: JSON.stringify({
								user: n.name,
								log: t,
								image: o,
								completion: a,
							}),
						}).then((e) => e.json());
				};
				async function y(e) {
					let t = e.replaceAll(" ", "-").toLowerCase();
					console.log(t);
					let n = "https://rawg-video-games-database.p.rapidapi.com/games/"
						.concat(t, "?key=")
						.concat("a8d817fa172443748735ff2d10862681");
					await fetch(n, {
						method: "GET",
						headers: {
							"X-RapidAPI-Key":
								"48bcd47c97msh29aeb9d40c8bed9p1b117bjsn539a69073325",
							"X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
						},
					})
						.then((e) => e.json())
						.then((e) => {
							console.log(e),
								(null == e ? void 0 : e.name)
									? (h(!0),
									  l((t) => [
											...t,
											{
												name: e.name,
												img: e.background_image,
												completion: "start",
											},
									  ]))
									: h(!1);
						})
						.catch((e) => console.error("error:" + e));
				}
				return (
					(0, a.useEffect)(() => {
						c.length > 0 && g(c);
					}, [c]),
					(0, o.jsx)(s.Provider, {
						value: {
							user: n,
							setUser: i,
							submitUser: f,
							userList: c,
							setUserList: l,
							gameSearch: y,
							found: r,
							register: p,
							setRegister: d,
							logOut: u,
						},
						children: t,
					})
				);
			}
		},
		8877: function () {},
		4321: function (e) {
			e.exports = {
				style: {
					fontFamily: "'__Inter_d65c78', '__Inter_Fallback_d65c78'",
					fontStyle: "normal",
				},
				className: "__className_d65c78",
			};
		},
	},
	function (e) {
		e.O(0, [183, 971, 23, 744], function () {
			return e((e.s = 3798));
		}),
			(_N_E = e.O());
	},
]);
