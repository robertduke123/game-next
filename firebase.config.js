"use server";
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
	setDoc,
} from "firebase/firestore";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const access = `${process.env.ACCESS_TOKEN_SECRET}`;
const refresh = `${process.env.REFRESH_TOKEN_SECRET}`;

const firebaseConfig = {
	apiKey: `${process.env.FIREBASE_API_KEY}`,
	authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
	databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
	projectId: `${process.env.FIREBASE_PROJECT_ID}`,
	storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
	appId: `${process.env.FIREBASE_APP_ID}`,
	measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

const getId = async () => {
	const snapshot = await getDocs(collection(db, "users"));
	const data = await snapshot.docs.map((doc) => {
		return doc.id;
	});
	return parseInt(data[data.length - 1]) + 1;
};

const signIn = async (email, password) => {
	const snapshot = await getDocs(
		query(collection(db, "login"), where("email", "==", email)),
	);

	const userDoc = snapshot.docs.find((doc) => {
		return bcrypt.compareSync(password, doc.data().hash);
	});

	return !!userDoc;
};

const registerUser = async (data) => {
	const { email, name, password } = data;
	const hash = bcrypt.hashSync(password, 10);
	const id = String(await getId("login"));
	const refreshToken = jwt.sign({ email }, refresh, { expiresIn: "6h" });

	if (!name || !email || !password) {
		throw new Error("please fill in info");
	} else {
		await setDoc(doc(db, "login", id), { email, hash, refresh: refreshToken });
		await setDoc(doc(db, "users", id), {
			email,
			name,
			log: [],
			image: [],
			completion: [],
		});
		return { id, name, email, refreshToken };
	}
};

const logOutUser = async (email) => {
	updateData("login", email, { refresh: null });
	return;
};

const getUsers = async (email) => {
	try {
		const userQ = query(collection(db, "users"), where("email", "==", email));
		const snapshot = await getDocs(userQ);
		const data = await snapshot.docs.map((doc) => ({
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

	updateData("login", email, { refresh: refreshToken });
	return { access: accessToken, refresh: refreshToken };
};

const refreshLogin = async (token) => {
	const snapshot = await getDocs(
		query(collection(db, "login"), where("refresh", "==", token)),
	);

	if (snapshot.empty) {
		throw new Error("refresh token is incorrect");
	}

	const doc = snapshot.docs[0];

	jwt.verify(token, refresh);

	const accessToken = generateAccess({ email: doc.data().email });
	return accessToken;
};

const updateData = async (collectionName, email, data) => {
	const updateQuery = query(
		collection(db, collectionName),
		where("email", "==", email),
	);
	const updateQuerySnapshot = await getDocs(updateQuery);
	await updateQuerySnapshot.docs.map((document) => {
		const docRef = doc(db, collectionName, document.id);
		updateDoc(docRef, data);
	});
};

const logDataChange = async (email, log, image, completion) => {
	updateData("users", email, { log, image, completion });
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
