"use client";
import React, { useEffect, useState } from "react";
import MovieDetails from "../../../components/ui/MovieDetails";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCasts = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);

        // console.log("casts data:", res.data);
        setData(res.data);
      } catch (err) {
        setError("failed:", err);
      }
    };
    getCasts();

    const getMovDetails = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/details`);
        setData(res.data);
        console.log(res.data);
      } catch (e) {
        setError(e);
      }
    };
    getMovDetails();
  }, [id]);
  return (
    <div>
      <MovieDetails id={id} movie={data} />
    </div>
  );
}
