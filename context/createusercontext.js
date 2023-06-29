// "use client";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { createContext, useState, useEffect } from "react";
// import { auth } from "@/firebase/firebase.config";

// const RegisterUserContext = createContext();

// export function UserProvider({ children }) {
//   const [error, setError] = useState("");
//   const [user, setUser] = useState("guest");

//   const signInWithGoogle = async () => {
//     await signInWithPopup(auth, provider).then((result) => {
//       const user = result.user;
//       console.log(user);
//       setUser(user.displayName);
//     });
//   };

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         console.log(uid);
//         // ...
//       } else {
//         // User is signed out
//         // ...
//       }
//     });
//   });

//   const register = async (email, password) => {
//     try {
//       const user = await createUserWithEmailAndPassword(auth, email, password);
//       console.log(user);
//     } catch (error) {
//       console.log(error.msg);
//       setError(error.msg);
//     }
//   };

//   const signOutUser = () => {
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//         console.log("signed out");
//         toast("signed Out");
//         setUser("guest");
//       })
//       .catch((error) => {
//         // An error happened.
//       });
//   };

//   return (
//     <RegisterUserContext.Provider
//       value={{
//         user,
//         setUser,
//         error,
//         setError,
//         register,
//         signInWithGoogle,
//         signOutUser,
//       }}
//     >
//       {children}
//     </RegisterUserContext.Provider>
//   );
// }

// export default RegisterUserContext;
