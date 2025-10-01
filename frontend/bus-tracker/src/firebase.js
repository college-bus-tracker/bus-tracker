// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpn-N9oL-di9zu3OWFmr7jrxK2d_OhmMQ",
  authDomain: "bus-tracker-ad3dc.firebaseapp.com",
  projectId: "bus-tracker-ad3dc",
  storageBucket: "bus-tracker-ad3dc.firebasestorage.app",
  messagingSenderId: "700657190481",
  appId: "1:700657190481:web:d1bd821c8a924523099a70",
  measurementId: "G-S4KR4B5C64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
