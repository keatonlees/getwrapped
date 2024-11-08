import React from "react";

import { baseURL } from "@/lib/utils/constants";
import { Wrap } from "@/lib/utils/interfaces";

export default async function Home() {
  const res = await fetch(`${baseURL}/api/wraps`, {
    method: "GET",
  });
  const wraps = await res.json();

  return (
    <main>
      <h1>Get Wrapped</h1>

      {wraps.map((wrap: Wrap) => (
        <div className="bg-slate-500" key={wrap._id}>
          {wrap.title}
        </div>
      ))}
    </main>
  );
}
