"use client";
//libraries
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

//firebase config file
import { auth } from "@/firebase/firebase.config";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [uid, setUid] = useState("");
  const router = useRouter();

  //create new user using firebase authentication
  const createUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user.uid);
        console.log(userCredential.user.refreshToken);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  //login with existing user using firebase authentication
  const loginUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const setUserUid = localStorage.setItem("userUid", user.uid);

        router.push("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log("An sign-out error happened");
      });
  };
  const user = auth.currentUser;

  return (
    <UserContext.Provider
      value={{
        loginUser,
        uid,
        setUid,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
