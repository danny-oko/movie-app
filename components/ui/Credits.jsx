"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Credits({ id }) {
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const run = async () => {
      try {
        setError(null);
        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);
        setCredits(res.data);
      } catch (e) {
        setError("failed to grab data");
        setCredits(null);
      }
    };

    run();
  }, [id]);

  return (
    <div>
      <p>The Movie ID: {id}</p>
      {error && <p>{error}</p>}
      {credits?.cast?.slice(0, 10).map((p) => (
        <div key={p.credit_id}>{p.name}</div>
      ))}
    </div>
  );
}
