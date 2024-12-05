// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbf0XBPUyL5Xg_WZvdWFtHgDZP7OzhCak",
  authDomain: "wefit-e7d07.firebaseapp.com",
  projectId: "wefit-e7d07",
  storageBucket: "wefit-e7d07.firebasestorage.app",
  messagingSenderId: "542418473844",
  appId: "1:542418473844:web:d0a59eb0035ffcad591221",
  measurementId: "G-4X5Y33ZE8S",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
