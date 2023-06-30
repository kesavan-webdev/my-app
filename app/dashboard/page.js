"use client";
import { useRouter } from "next/navigation";
import withAuth from "@/components/hoc/protected";
import Navbar from "@/components/navbar/navbar.component";
const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 p-5"
          onClick={() => router.push("/dashboard/todos")}
        >
          Add Todos
        </button>
      </div>
    </>
  );
};

export default withAuth(Dashboard);
