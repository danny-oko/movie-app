"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MovieGrid from "../../../../components/ui/MovieGrid";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { id } = useParams();

  const router = useRouter();

  const [error, setError] = useState(null);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    if (!id) return;

    const getSimiliarMovies = async () => {
      try {
        setError(null);
        const res = await axios.get(`/api/tmdb/movies/${id}/similiar`);
        setMoviesData(res.data?.results ?? []);
      } catch (err) {
        setMoviesData([]);
        setError(err?.message || "Failed to fetch similar movies");
      }
    };

    getSimiliarMovies();
  }, [id]);

  return (
    <div>
      {error && <p>{error}</p>}
      <Header />
      <div className="buttons pr-36 pl-36 w-full flex items-center justify-between mt-16">
        <h1 className="text-2xl font-bold">Similiar</h1>
        <Button variant="seeMore" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <div className="grid-holder pl-36 pr-36 pb-36 mt-12">
        <MovieGrid movies={moviesData} />
      </div>
      <Footer />
    </div>
  );
}
