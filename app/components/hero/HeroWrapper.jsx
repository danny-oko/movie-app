"use client";

import React, { useEffect, useState } from "react";
import { moviesService } from "@/lib/services/movies";
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
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await moviesService.nowPlaying(page);
        if (!alive) return;

        setMovies(data?.results || []);
      } catch (err) {
        if (alive) {
          setError(err?.message || "Failed to load");
          setMovies([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
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
    <section className="w-full">
      <div className="mx-auto w-[98%] max-w-none px-4 sm:px-6 md:px-8">
        {error && <p className="text-destructive mb-3">{error}</p>}

        <div className="w-full">
          <HeroCarousel
            movies={movies}
            onWatchTrailer={handleWatchTrailer}
            loading={loading}
          />
        </div>
      </div>

      <TrailerDialog
        onClose={handleCloseTrailer}
        open={trailerOpen}
        movieId={activeMovieId}
      />
    </section>
  );
};

export default Hero;
