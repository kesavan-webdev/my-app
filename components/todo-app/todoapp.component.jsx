"use client";
import { useEffect, useState } from "react";

import { db } from "@/firebase/firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

const TodoApp = () => {
  const { uid, setUid } = useContext(UserContext);
  const [todos, setTodos] = useState("");
  const getUserUid = localStorage.getItem("userUid");
  setUid(getUserUid);

  const [id, setId] = useState("");

  const [show, setShow] = useState(false);

  const [val, setVal] = useState([]);

  const value = collection(db, "todos");
  const getData = async () => {
    const dbVal = await getDocs(value);
    console.log(dbVal.docs);
    dbVal.docs.length > 0 &&
      // setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(dbVal.docs.map((doc) => doc.data().email));
    console.log(dbVal.docs.map((doc) => doc.data()));
    console.log(val);

    const q = query(value, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setVal(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setFilteredData((prev) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    getData();
  };

  const handleCreate = async () => {
    if (todos === "") {
      alert("plz enter a value");
    } else {
      await addDoc(value, { todo: todos, uid: uid });
      setTodos("");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const deleteVal = doc(db, "todos", id);
    await deleteDoc(deleteVal);
    getData();
  };

  const handleEdit = async (id, todos) => {
    setTodos(todos);
    setId(id);
    setShow(true);
  };

  const handleUpdate = async () => {
    const updateData = doc(db, "todos", id);
    await updateDoc(updateData, { todo: todos });
    setShow(false);
    setTodos("");
  };

  return (
    <div className="container flex flex-col gap-5 items-center justify-center">
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-slate-700"
          value={todos}
          onChange={(e) => setTodos(e.target.value)}
        />

        {!show ? (
          <button
            type="submit"
            className="bg-green-600 p-5 text-white"
            onClick={handleCreate}
          >
            Create
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-300 p-5 text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </form>
      {val.length >= 1 &&
        val.map((values) => (
          <div
            key={values.id}
            className="flex bg-slate-400 w-96 justify-between px-5 py-2 items-center"
          >
            <h1>{values.todo}</h1>

            <div className="flex gap-3">
              <button
                className="bg-red-800 p-2 text-white"
                onClick={() => handleDelete(values.id)}
              >
                Delete
              </button>
              <button
                className="bg-orange-500 p-2 text-white"
                onClick={() => handleEdit(values.id, values.todo)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default TodoApp;
