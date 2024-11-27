"use client";

import { redirect } from "next/navigation";
import React from "react";

import { createNewWrap } from "./actions";

export default function Home() {
  const handleCreate = async () => {
    const wrap = await createNewWrap("New Wrap");
    console.log(wrap.insertedId);
    redirect(`/make/${wrap.insertedId}`);
  };

  return (
    <main>
      <h1>Get Wrapped</h1>
      <button className="btn btn-primary" onClick={handleCreate}>
        Create New Wrapped
      </button>
    </main>
  );
}
