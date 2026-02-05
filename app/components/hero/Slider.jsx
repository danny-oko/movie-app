"use client";

import { Button } from "@/components/ui/button";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function Slider({ movie, onWatchTrailer }) {
  const backdrop = movie?.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : `Failed to load image ${movie.original_title}`;

  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
      {backdrop ? (
        <img
          src={backdrop}
          alt={movie?.title ?? "Movie"}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="absolute left-32 top-1/2 z-10 w-[520px] -translate-y-1/2 text-white max-md:left-6 max-md:w-[85%]">
        <p className="text-sm opacity-80">Now Playing:</p>

        <h2 className="mt-2 text-4xl font-bold leading-tight max-md:text-3xl">
          {movie?.title}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-sm opacity-90">
          <span className="text-yellow-400">★</span>
          <span className="font-medium">
            {Number(movie?.vote_average ?? 0).toFixed(1)}
          </span>
          <span className="opacity-60">/ 10</span>
        </div>

        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-white/80">
          {movie?.overview}
        </p>

        <div className="mt-6">
          <Button
            variant="default"
            size="lg"
            onClick={() => onWatchTrailer(movie.id)}
          >
            Watch trailer
          </Button>
        </div>
      </div>
    </div>
  );
}
