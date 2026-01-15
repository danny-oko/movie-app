"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let alive = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);
        if (!alive) return;

        console.log("API DATA:", res.data);
        setData(res.data);
      } catch (e) {
        if (!alive) return;
        console.error("API ERROR:", e);
        setError(e?.response?.data?.error || "Failed to fetch");
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold">Credits test: {id}</h1>

      {loading && <p className="mt-3">Loading...</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}

      {!loading && !error && (
        <pre className="mt-4 text-xs bg-black/10 p-4 rounded-xl overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
