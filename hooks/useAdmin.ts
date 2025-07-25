
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token in useAdmin:", token);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log("Decoded:", decoded);
      if (decoded.role.toLowerCase() === "admin") {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error("Invalid token:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { isAdmin, loading };
}
