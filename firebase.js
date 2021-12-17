// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCImMGbTVcoqLqDseon5TAGy5_GHfKGx4U",
  authDomain: "personal-website-raceme.firebaseapp.com",
  projectId: "personal-website-raceme",
  storageBucket: "personal-website-raceme.appspot.com",
  messagingSenderId: "74355242276",
  appId: "1:74355242276:web:59bc0dd042cfebebc5afb1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { app, db };
