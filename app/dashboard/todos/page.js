"use client";
import TodoApp from "@/components/todo-app/todoapp.component";
import withAuth from "@/components/hoc/protected";

const Todos = () => {
  return <TodoApp />;
};

export default withAuth(Todos);
