"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);
        console.log("API DATA:", res.data);
        setData(res.data);
      } catch (e) {
        console.error("API ERROR:", e);
      }
    };

    run();
  }, []);

  return (
    <div className="p-6">
      <h1>API test</h1>
      <pre className="mt-4 text-xs bg-black/10 p-4 rounded-xl overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
