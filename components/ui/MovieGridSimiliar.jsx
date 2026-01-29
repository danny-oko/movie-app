"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import MovieCard from "./MovieCard";

function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg sm:rounded-xl border border-border bg-card">
      <Skeleton className="w-full aspect-2/3 rounded-none" />
      <div className="p-2 sm:p-3 space-y-2">
        <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
        <Skeleton className="h-3 sm:h-4 w-3/4" />
      </div>
    </div>
  );
}

const MovieGridSimiliar = ({
  movies = [],
  isLoading = false,
  limit = 5,
  skeletonCount = 5,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:gap-6 lg:grid-cols-5">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:gap-6 lg:grid-cols-5">
      {(movies || []).slice(0, limit).map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieGridSimiliar;
