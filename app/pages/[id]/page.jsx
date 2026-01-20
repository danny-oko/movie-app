"use client";
import React, { useEffect, useState } from "react";
import MovieDetails from "../../../components/ui/MovieDetails";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const { id } = useParams();

  const [casts, setCasts] = useState([]);
  const [details, setDetails] = useState([]);
  const [video, setVideo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCasts = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);

        console.log("casts data:", res.data);
        setCasts(res.data);
      } catch (err) {
        setError("failed:", err);
      }
    };
    getCasts();

    const getMovDetails = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/details`);
        setDetails(res.data);
        console.log(res.data);
      } catch (e) {
        setError(e);
      }
    };
    getMovDetails();

    const getVideo = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/video`);
        console.log(res.data);
        setVideo(res.data);
      } catch (err) {
        setError(err);
        setVideo([]);
      }
    };
    getVideo();
  }, [id]);
  return (
    <div>
      <MovieDetails id={id} movie={details} />
    </div>
  );
}
