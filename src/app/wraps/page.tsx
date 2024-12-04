"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";

import WrapsGrid from "@/components/WrapsGrid";

const Wraps = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return router.push("/login");
  }, [user, router]);

  return (
    <div className="w-full h-full flex flex-col items-center bg-base-100">
      <div className="flex flex-col w-[90%] md:w-[70%]">
        <Navbar />

        <WrapsGrid />
      </div>
    </div>
  );
};

export default Wraps;
