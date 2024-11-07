"use client";

import { Wrap } from "@/lib/utils/interfaces";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/wraps");
      const resJson = await res.json();
      setData(resJson);
    })();
  }, []);

  return (
    <main>
      <h1>Get Wrapped</h1>

      {data.map((wrap: Wrap) => (
        <div className="bg-slate-500" key={wrap._id}>
          {wrap.title}
        </div>
      ))}
    </main>
  );
}
