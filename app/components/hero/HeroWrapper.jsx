"use client";

import React, { useEffect, useState } from "react";
import { moviesService } from "@/lib/services/movies";
import { useParams } from "next/navigation";
import HeroSkeleton from "@/components/ui/HeroSkeleton";
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

        moviesService.nowPlaying(page).then((data) => {
          setMovies(data?.results);
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

  return (
    <div>
      <HeroCarousel
        movies={movies}
        onWatchTrailer={handleWatchTrailer}
        loading={loading}
      />
      <TrailerDialog
        onClose={handleCloseTrailer}
        open={trailerOpen}
        movieId={activeMovieId}
      />
    </div>
  );
};

export default Hero;
