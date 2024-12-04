"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase/config";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();
  const [user] = useAuthState(auth);
  const [userSession, setUserSession] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) setUserSession(session);
  }, []);

  const handleHome = () => {
    if (path === "/") return;
    router.push("/");
  };

  const handleRegister = () => {
    router.push("/register");
  };
  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    auth.signOut();
    setUserSession("");
  };

  return (
    <div className="w-full h-full flex items-center justify-between py-2 sticky top-0 ">
      <div
        className="font-yeseva text-3xl md:text-5xl font-bold text-primary text-shadow-psm shadow-white hover:cursor-pointer"
        onClick={handleHome}
      >
        GW
      </div>
      <div className="flex items-center gap-2">
        {user || userSession ? (
          <>
            <h1>{user?.email?.split("@")[0]}</h1>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={handleRegister}>
              Sign Up
            </button>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
