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

const TodoApp = () => {
  //context api

  //usestate
  const [todos, setTodos] = useState("");

  const [id, setId] = useState("");

  const [show, setShow] = useState(false);

  const [val, setVal] = useState([]);

  const [uid, setUid] = useState("");

  //firbase functions

  const getData = async () => {
    const q = query(collection(db, "todos"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setVal(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    const getUserUid = localStorage.getItem("userUid");
    setUid(getUserUid);
    console.log("hello");
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (todos === "") {
      alert("plz enter a value");
    } else {
      await addDoc(collection(db, "todos"), { todo: todos, uid: uid });
      setTodos("");
      getData();
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = doc(db, "todos", id);
    await updateDoc(updateData, { todo: todos });

    setShow(false);
    setTodos("");
    getData();
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

  return (
    <div className="container flex flex-col gap-5 items-center justify-center">
      <form>
        <input
          className="border-2 border-slate-700"
          value={todos}
          onChange={(e) => setTodos(e.target.value)}
        />

        {!show ? (
          <button
            className="bg-green-600 p-5 text-white"
            onClick={handleCreate}
          >
            Create
          </button>
        ) : (
          <button
            className="bg-green-300 p-5 text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </form>
      {val.map((values) => (
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
