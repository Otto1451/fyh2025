// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "fyh2025.firebaseapp.com",
  projectId: "fyh2025",
  storageBucket: "fyh2025.firebasestorage.app",
  messagingSenderId: "1034395158342",
  appId: "1:1034395158342:web:f1e69fd68acabafdf34747",
  measurementId: "G-6EW29VEC6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);