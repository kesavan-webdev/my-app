"use client";

//hooks
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//firebase
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

const SignIn = () => {
  //hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [val, setVal] = useState([]);
  const router = useRouter();

  const { loginUser } = useContext(UserContext);
  //---------functions------

  // //login with existing user using firebase authentication
  // const loginUser = async (email, password) => {
  //   await signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       router.push("/dashboard");
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // };

  //get all the users data from firestore in firebase
  const value = collection(db, "users");
  const getData = async () => {
    const dbVal = await getDocs(value);
    await setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(val);
  };

  useEffect(() => {
    getData();
  }, []);

  //--------event based functions----------

  //this function will go check the data got from firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    val.forEach((value) => {
      if (value.email === email && value.password === password) {
        localStorage.setItem("user", JSON.stringify({ email }));
      } else {
        console.log("signed in failed");
        setError("Password Not Match or User Not Found");
      }
    });
    loginUser(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      {error && <div className="text-lg">{error}</div>}
      <div className="mb-6">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Enter Email"
          name="email"
          required
        />
      </div>
      <div className="mb-6">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter Password"
          name="psw"
          required
        />
      </div>

      <div className="flex justify-between gap-8">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SignUp
        </button>
      </div>
    </form>
  );
};

export default SignIn;
