"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userIsAuthenticated = user !== null;
      if (!userIsAuthenticated) {
        router.push("/");
      }
    }, []);

    return <Component {...props} />;
  };
}
