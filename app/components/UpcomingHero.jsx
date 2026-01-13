"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const imageUrl = "https://image.tmdb.org/t/p/original";

export default function UpcomingHero() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trailer modal states
  const [open, setOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setEmbedUrl(null);
    setTrailerLoading(false);
  };

  // ESC close + body scroll lock
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fetch trailer for a specific movie and open modal
  const openTrailer = async (movieId) => {
    try {
      setTrailerLoading(true);
      setOpen(true);
      setEmbedUrl(null);

      const res = await axios.get(`/api/tmdb/movie/${movieId}/videos`);
      const videos = res.data?.results ?? [];

      const trailer =
        videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
        videos.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
        videos.find((v) => v.site === "YouTube");

      if (!trailer?.key) {
        setEmbedUrl(null);
        return;
      }

      setEmbedUrl(
        `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`
      );
    } catch (err) {
      setEmbedUrl(null);
    } finally {
      setTrailerLoading(false);
    }
  };

  // Fetch now playing movies
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get("/api/tmdb/nowPlaying");
        if (!alive) return;
        console.log("tmdb data for hero section:", res.data);
        setMovies(res.data?.results ?? []);
      } catch (e) {
        if (!alive) return;
        setError("Internal Server Error");
        setMovies([]);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-[60vh] relative overflow-hidden rounded-lg">
      <Carousel>
        <CarouselContent>
          {movies.slice(0, 10).map((m) => (
            <CarouselItem key={m.id}>
              <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
                {/* Background image */}
                <img
                  src={`${imageUrl}${m.backdrop_path}`}
                  alt={m.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark fade overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="ml-[140px] absolute left-10 top-1/2 z-10 w-[520px] -translate-y-1/2 text-white">
                  <p className="text-sm opacity-80">Now Playing:</p>

                  <h2 className="mt-2 text-4xl font-bold leading-tight">
                    {m.title}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm opacity-90">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">
                      {m.vote_average?.toFixed(1)}
                    </span>
                    <span className="opacity-60">/ 10</span>
                  </div>

                  <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-white/80">
                    {m.overview}
                  </p>

                  <button
                    onClick={() => openTrailer(m.id)}
                    className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/15"
                    type="button"
                  >
                    <span className="text-lg">▶</span>
                    Watch Trailer
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* ===== Trailer Modal ===== */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
          onMouseDown={closeModal}
        >
          <div
            className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden relative"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-black rounded-full w-9 h-9 flex items-center justify-center"
              aria-label="Close"
              type="button"
            >
              ✕
            </button>

            {trailerLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Loading trailer...
              </div>
            )}

            {!trailerLoading && !embedUrl && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6">
                Trailer not available for this movie 😭
              </div>
            )}

            {!trailerLoading && embedUrl && (
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title="YouTube trailer"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
