// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsav3-9H03GfaNT3gbcfBZxAsvicKDaMI",
  authDomain: "next-auth-games.firebaseapp.com",
  projectId: "next-auth-games",
  storageBucket: "next-auth-games.appspot.com",
  messagingSenderId: "105346228124",
  appId: "1:105346228124:web:654988e215006d2eeeb259",
  measurementId: "G-LNRV1YHPHD",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
