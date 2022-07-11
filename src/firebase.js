import { initializeApp } from "firebase/app";
import { getFirestore, collection, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
  authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
  appId: process.env["REACT_APP_FIREBASE_APP_ID"],
  measurementId: process.env["REACT_APP_FIREBASE_MEASUREMENT_ID"],
};

const app = initializeApp(config);

const db = getFirestore();

const matchesRef = collection(db, "/matches");
const playersRef = collection(db, "/players");
const positionsRef = collection(db, "/positions");
export const promotionsRef = collection(db, "/promotions");
const teamsRef = collection(db, "/teams");

export const matchesQuery = query(matchesRef);

export const auth = getAuth(app);
