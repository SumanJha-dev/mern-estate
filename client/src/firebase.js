// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c6950.firebaseapp.com",
  projectId: "mern-estate-c6950",
  storageBucket: "mern-estate-c6950.firebasestorage.app",
  messagingSenderId: "212204537012",
  appId: "1:212204537012:web:d668b25164818f694c03e1",
  measurementId: "G-TZCL1K9SH6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);