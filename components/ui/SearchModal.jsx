"use client";

import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const SearchModal = ({ movie, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="relative overflow-hidden">
          <Skeleton className="w-full aspect-[1/3] rounded-none" />
          <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        <div className="p-3 space-y-2">
          <div className="relative overflow-hidden rounded">
            <Skeleton className="h-4 w-20" />
            <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          <div className="relative overflow-hidden rounded">
            <Skeleton className="h-2 w-3/4" />
            <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
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
      href={`/pages/${movie.id}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white hover:shadow-sm transition"
    >
      <figure className="overflow-hidden">
        {poster ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="w-full object-cover aspect-[2/3]"
          />
        ) : (
          <div className="aspect-[2/3] w-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
            No poster
          </div>
        )}
      </figure>

      <div className="p-3">
        <p className="text-sm text-zinc-700">
          ⭐ {movie?.vote_average?.toFixed(1) ?? "--"}{" "}
          <span className="text-zinc-400">/ 10</span>
        </p>
        <p className="mt-1 text-sm font-semibold text-zinc-900 truncate">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default SearchModal;
