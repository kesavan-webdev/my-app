// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPuI2KhiqM_VMlvj_n0VUfLSkpRGPrN2M",
  authDomain: "next-todos-8ad7d.firebaseapp.com",
  projectId: "next-todos-8ad7d",
  storageBucket: "next-todos-8ad7d.appspot.com",
  messagingSenderId: "753765540554",
  appId: "1:753765540554:web:9ddfcc2fd2c818f8368a33",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
