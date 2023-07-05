// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpyvLbHL2SDNR0k59I1CCxPsNYuONWKAs",
  authDomain: "my-next-auth-390511.firebaseapp.com",
  projectId: "my-next-auth-390511",
  storageBucket: "my-next-auth-390511.appspot.com",
  messagingSenderId: "492315810072",
  appId: "1:492315810072:web:fdaafbea203ca811f9a66d",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
