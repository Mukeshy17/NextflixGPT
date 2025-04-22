// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoZS2gDcgq6VsKD0JC0Mp6Y2NkMMDRDAI",
  authDomain: "netflixgpt-71bac.firebaseapp.com",
  projectId: "netflixgpt-71bac",
  storageBucket: "netflixgpt-71bac.firebasestorage.app",
  messagingSenderId: "872668810906",
  appId: "1:872668810906:web:ef448b3a52f246d6591923",
  measurementId: "G-79F58JZ74J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
