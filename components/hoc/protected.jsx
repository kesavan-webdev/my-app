"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("user"));
    const userIsAuthenticated = user !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/signin");
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
