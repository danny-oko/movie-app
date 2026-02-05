"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const MovieCard = ({ movie, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="relative overflow-hidden">
          <Skeleton className="w-full aspect-2/3 rounded-none" />
          <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-muted/40 to-transparent" />
        </div>

        <div className="p-3 space-y-2">
          <div className="relative overflow-hidden rounded">
            <Skeleton className="h-4 w-20" />
            <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-muted/40 to-transparent" />
          </div>

          <div className="relative overflow-hidden rounded">
            <Skeleton className="h-4 w-3/4" />
            <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-muted/40 to-transparent" />
          </div>
        </div>
      </div>
    );
  }

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const poster = movie?.poster_path
    ? `${imgBaseUrl}${movie.poster_path}`
    : null;
  const title = movie?.title || movie?.original_title || "Untitled";

  return (
    <Link
      href={`/${movie.id}`}
      className="group overflow-hidden rounded-lg sm:rounded-xl border border-border bg-card hover:shadow-sm transition text-card-foreground block touch-manipulation"
    >
      <figure className="overflow-hidden">
        {poster ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="w-full object-cover aspect-2/3"
          />
        ) : (
          <div className="aspect-2/3 w-full bg-muted flex items-center justify-center text-muted-foreground text-xs sm:text-sm">
            No poster
          </div>
        )}
      </figure>

      <div className="p-2 sm:p-3">
        <p className="text-xs sm:text-sm text-foreground">
          ⭐ {movie?.vote_average?.toFixed(1) ?? "--"}{" "}
          <span className="text-muted-foreground">/ 10</span>
        </p>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-foreground truncate">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
