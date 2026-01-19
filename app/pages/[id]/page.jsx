"use client";
import React, { useEffect, useState } from "react";
import Credits from "../../../components/ui/Credits";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page({ params }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);
        console.log("res data:", res.data);
        setData(res.data);
        // setCasts(res.data.cast);
        // console.log(res.data.cast);
      } catch (err) {
        setError("failed:", err);
      }
    };
    run();
  }, [id]);
  return (
    <div>
      <Credits id={id} />
    </div>
  );
}
