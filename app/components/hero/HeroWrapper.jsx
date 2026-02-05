"use client";

import React, { useEffect, useState } from "react";
import { MoviesService } from "@/lib/services/movies";
import { useParams } from "next/navigation";

import Slider from "./Slider";
import TrailerDialog from "./Dialog";
import HeroCarousel from "./Carousel";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [activeMovieId, setActiveMovieId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        MoviesService.nowPlaying(page).then((data) => {
          setMovies(data?.results);
          console.log(data.results);
        });
      } catch (error) {
        setError(error.message || "Failed to load");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const handleWatchTrailer = (movieId) => {
    setActiveMovieId(movieId);
    setTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setTrailerOpen(false);
    setActiveMovieId(null);
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <HeroCarousel movies={movies} onWatchTrailer={handleWatchTrailer} />
      <TrailerDialog
        onClose={handleCloseTrailer}
        open={trailerOpen}
        movieId={activeMovieId}
      />
    </div>
  );
};

export default Hero;
