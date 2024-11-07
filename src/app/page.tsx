"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

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

      {data
        ? data.map((wrap) => (
            <div className="bg-slate-500" key={wrap._id}>
              {wrap.title}
            </div>
          ))
        : "Loading..."}
    </main>
  );
}
