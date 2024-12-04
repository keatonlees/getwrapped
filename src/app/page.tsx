"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase/config";
import Navbar from "@/components/Navbar";

// import { createNewWrap } from "./actions";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [userSession, setUserSession] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) setUserSession(session);
  }, []);

  const handleLanding = () => {
    if (user || userSession) {
      router.push("/wraps");
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center bg-base-100">
      <div className=" w-[90%] md:w-[70%]">
        {/* nav */}
        <Navbar />

        {/* landing */}
        <div className="w-full h-[90dvh] flex items-center justify-center gap-2">
          <button className="btn btn-outline">See Demo</button>
          <button className="btn btn-primary" onClick={handleLanding}>
            Try it out!
          </button>
        </div>

        <div>
          <h1>Footer</h1>
        </div>
      </div>
    </main>
  );
}
