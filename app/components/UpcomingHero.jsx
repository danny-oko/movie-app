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
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await axios.get("/api/tmdb/nowPlaying");
        if (!alive) return;
        console.log("hero section data:", res.data);
        setMovies(res.data?.results ?? []);
      } catch {
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

                {/* Dark fade overlay (left heavy) */}
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

                  <button className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur hover:bg-white/15">
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
    </div>
  );
}
