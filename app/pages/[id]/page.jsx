"use client";
import React, { useEffect, useState } from "react";
import Credits from "../../../components/ui/Credits";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        setError(null);

        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);

        if (!alive) return;

        setData(res.data);
        console.log("movie details:", res.data);
      } catch (err) {
        if (!alive) return;

        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const { id } = useParams();
  return <Credits id={id} />;
}
