// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCowl4X3GXlEKoUkIv5NXWjWelqizXq4Ak",
  authDomain: "pmr-connections.firebaseapp.com",
  projectId: "pmr-connections",
  storageBucket: "pmr-connections.firebasestorage.app",
  messagingSenderId: "420962607676",
  appId: "1:420962607676:web:346eb2de01bc587dda9939",
  measurementId: "G-QYY8PCPTWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let database = getFirestore(app);

export {app as firebase_app, database};