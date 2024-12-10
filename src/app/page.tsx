"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import { auth } from "@/lib/firebase/config";

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
      <div className="w-[90%] md:w-[70%]">
        {/* nav */}
        <Navbar />

        {/* landing */}
        <div className="w-full h-[100dvh] flex flex-col items-center justify-center gap-2">
          <h1 className="font-yeseva text-4xl md:text-8xl font-bold mb-4 text-center">
            Your Wrapped. Your Story. Any Occasion.
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-center">
            Create and view custom wraps for couples, trips, families and more!
          </p>

          <div className="flex gap-2">
            {/* <button className="btn btn-outline">See Demo</button> */}
            <button className="btn btn-primary" onClick={handleLanding}>
              Try it out!
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-40 md:h-24 flex items-center justify-center bg-primary">
        <div className="w-[90%] md:w-[70%] flex flex-col md:flex-row gap-2 items-center justify-between">
          <h1 className="font-yeseva text-neutral font-bold text-md md:text-xl">
            Get Wrapped
          </h1>
          <div className="flex justify-center items-center gap-2">
            <a
              className="btn btn-primary btn-circle"
              href="mailto:klees@uwaterloo.ca"
            >
              <FaEnvelope className="text-neutral text-3xl" />
            </a>
            <button
              className="btn btn-primary btn-circle"
              onClick={() =>
                window.open("https://www.linkedin.com/in/keatonlees/", "_blank")
              }
            >
              <FaLinkedin className="text-neutral text-3xl" />
            </button>
            <button
              className="btn btn-primary btn-circle"
              onClick={() =>
                window.open(
                  "https://github.com/keatonlees/getwrapped",
                  "_blank"
                )
              }
            >
              <FaGithub className="text-neutral text-3xl" />
            </button>
          </div>
          <h1 className="font-yeseva text-neutral font-bold text-md md:text-xl text-right">
            2024 Keaton Lees
          </h1>
        </div>
      </div>
    </main>
  );
}
