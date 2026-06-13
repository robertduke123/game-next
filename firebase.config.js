"use server";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const access = `${process.env.ACCESS_TOKEN_SECRET}`;
const refresh = `${process.env.REFRESH_TOKEN_SECRET}`;

let db;

if (!getApps().length) {
	let serviceAccount;

	if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
		const cleanBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64.replace(
			/\s/g,
			"",
		);
		const decodedKey = Buffer.from(cleanBase64, "base64").toString("utf8");
		serviceAccount = JSON.parse(decodedKey);
	} else {
		try {
			const keyPath = "./serviceAccountKey.json";
			serviceAccount = require(`${keyPath}`);
		} catch (e) {
			console.warn(
				"Service account key missing. This is normal during production builds.",
			);
		}
	}

	if (serviceAccount) {
		initializeApp({
			credential: cert(serviceAccount),
		});
	}
}

db = getFirestore();

// --- AUTH UTILITIES ---

const generateAccess = (user) => jwt.sign(user, access, { expiresIn: "5m" });

const verify = async (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, access, (err, decoded) => {
			if (err) {
				reject(new Error("bad token"));
			} else {
				resolve(decoded);
			}
		});
	});
};

// --- DATABASE UTILITIES ---

const getId = async () => {
	const snapshot = await db.collection("users").get();
	const data = snapshot.docs.map((doc) => doc.id);
	return (parseInt(data[data.length - 1]) || 0) + 1;
};

const signIn = async (email, password) => {
	const snapshot = await db
		.collection("login")
		.where("email", "==", email)
		.get();

	const userDoc = snapshot.docs.find((doc) => {
		return bcrypt.compareSync(password, doc.data().hash);
	});

	return !!userDoc;
};

const registerUser = async (data) => {
	const { email, name, password } = data;

	if (!name || !email || !password) {
		throw new Error("please fill in info");
	}

	const hash = bcrypt.hashSync(password, 10);
	const id = String(await getId());
	const refreshToken = jwt.sign({ email }, refresh, { expiresIn: "6h" });

	await db
		.collection("login")
		.doc(id)
		.set({ email, hash, refresh: refreshToken });
	await db.collection("users").doc(id).set({
		email,
		name,
		log: [],
		image: [],
		completion: [],
	});

	return { id, name, email, refreshToken };
};

const logOutUser = async (email) => {
	await updateData("login", email, { refresh: null });
	return;
};

const getUsers = async (email) => {
	try {
		const snapshot = await db
			.collection("users")
			.where("email", "==", email)
			.get();
		const data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return data[0];
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const getAccessToken = async (email) => {
	const user = { email: email };
	const accessToken = generateAccess(user);
	const refreshToken = jwt.sign(user, refresh, { expiresIn: "6h" });

	await updateData("login", email, { refresh: refreshToken });
	return { access: accessToken, refresh: refreshToken };
};

const refreshLogin = async (token) => {
	const snapshot = await db
		.collection("login")
		.where("refresh", "==", token)
		.get();

	if (snapshot.empty) {
		throw new Error("refresh token is incorrect");
	}

	const loginDoc = snapshot.docs[0];

	try {
		jwt.verify(token, refresh);
		const accessToken = generateAccess({ email: loginDoc.data().email });
		return accessToken;
	} catch (err) {
		await loginDoc.ref.update({ refresh: null });
		throw new Error("refresh token expired");
	}
};

const updateData = async (collectionName, email, data) => {
	const updateQuerySnapshot = await db
		.collection(collectionName)
		.where("email", "==", email)
		.get();

	const promises = updateQuerySnapshot.docs.map((document) => {
		return db.collection(collectionName).doc(document.id).update(data);
	});

	await Promise.all(promises);
};

const logDataChange = async (email, log, image, completion) => {
	await updateData("users", email, { log, image, completion });
	return;
};

export {
	verify,
	signIn,
	registerUser,
	logOutUser,
	getUsers,
	getAccessToken,
	refreshLogin,
	updateData,
	logDataChange,
	getId,
};
