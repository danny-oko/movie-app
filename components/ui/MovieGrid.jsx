"use client";

import React from "react";
import MovieCard from "./MovieCard";
import { Skeleton } from "@/components/ui/skeleton";

function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <Skeleton className="w-full aspect-[2/3] rounded-none" />

      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-3/4" />{" "}
      </div>
    </div>
  );
}

const MovieGrid = ({
  movies = [],
  isLoading,
  limit = 10,
  skeletonCount = 10,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))
        : (movies || [])
            .slice(0, limit)
            .map((m) => <MovieCard key={m.id} movie={m} />)}
    </div>
  );
};

export default MovieGrid;
