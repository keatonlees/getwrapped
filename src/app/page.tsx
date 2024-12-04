"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase/config";

// import { createNewWrap } from "./actions";

export default function Home() {
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");
  const [user] = useAuthState(auth);

  console.log(userSession);

  // useEffect(() => {
  //   if (!user && !userSessionID) router.push("/login");
  // }, [user, router, userSessionID]);

  // const handleCreate = async () => {
  //   const wrap = await createNewWrap("New Wrap");
  //   console.log(wrap.insertedId);
  //   redirect(`/make/${wrap.insertedId}`);
  // };

  const handleLogout = () => {
    auth.signOut();
    sessionStorage.setItem("user", "");
  };

  return (
    <main>
      <h1>Get Wrapped</h1>
      <h1>{user || userSession ? user?.email : "Not signed in"}</h1>

      {/* <button className="btn btn-primary" onClick={handleCreate}>
        Create New Wrapped
      </button> */}

      {user || userSession ? (
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => router.push("/login")}
        >
          Sign In
        </button>
      )}
    </main>
  );
}
