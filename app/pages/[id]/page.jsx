"use client";
import React, { useEffect, useState } from "react";
import MovieDetails from "../../../components/ui/MovieDetails";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const { id } = useParams();

  const [crew, setCrew] = useState([]);
  const [casts, setCasts] = useState([]);
  const [details, setDetails] = useState([]);

  const [video, setVideo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);

        setCrew(res.data.crew);
        setCasts(res.data.cast);
        console.log(res.data.crew);
      } catch (err) {
        setError("failed:", err);
      }
    };
    getCredits();

    const getMovDetails = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/details`);
        setDetails(res.data);
        // console.log(res.data);
      } catch (e) {
        setError(e);
      }
    };
    getMovDetails();

    const getVideo = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/trailer`);
        // console.log(res);
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
      <MovieDetails id={id} movie={details} crew={crew} casts={casts} />
    </div>
  );
}
