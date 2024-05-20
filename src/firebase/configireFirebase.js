// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const key = process.env.REACT_APP_FIREBASE_API_KEY;
const id1 = process.env.REACT_APP_FIREBASE_API_ID;
const id2 = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;

const firebaseConfig = {
  apiKey: key,
  authDomain: "blogsite-f53b1.firebaseapp.com",
  projectId: "blogsite-f53b1",
  storageBucket: "blogsite-f53b1.appspot.com",
  messagingSenderId: id2,
  appId: id1,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
