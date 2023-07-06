"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const { setuserEmail } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userIsAuthenticated = user !== null;
      setuserEmail(user.email);
      if (!userIsAuthenticated) {
        router.push("/");
      }
    }, []);

    return <Component {...props} />;
  };
}
