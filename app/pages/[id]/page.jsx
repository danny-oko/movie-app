"use client";
import React, { useEffect, useState } from "react";

import MovieDetails from "../../../components/ui/MovieDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useParams } from "next/navigation";
import axios from "axios";

export default function Page() {
  const { id } = useParams();

  const [crew, setCrew] = useState([]);
  const [casts, setCasts] = useState([]);
  const [details, setDetails] = useState([]);
  const [similiar, setSimiliar] = useState([]);

  const [video, setVideo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/credits`);

        setCrew(res.data.crew);
        setCasts(res.data.cast);
      } catch (err) {
        setError("failed:", err);
      }
    };
    getCredits();

    const getMovDetails = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/details`);
        setDetails(res.data ?? []);
      } catch (e) {
        setError(e);
        setDetails([]);
      }
    };
    getMovDetails();

    const getVideo = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/trailer`);

        setVideo(res.data.results ?? []);
      } catch (err) {
        setError(err);
        setVideo([]);
      }
    };
    getVideo();

    const getSimiliar = async () => {
      try {
        const res = await axios.get(`/api/tmdb/movies/${id}/similiar`);
        setSimiliar(res.data.results ?? []);
      } catch (err) {
        setError(err);
        setSimiliar([]);
      }
    };
    getSimiliar();
  }, [id]);

  return (
    <div>
      <Header />
      <MovieDetails
        id={id}
        movie={details}
        crew={crew}
        casts={casts}
        similiarData={similiar}
        trailer={video}
      />
      <Footer />
    </div>
  );
}
