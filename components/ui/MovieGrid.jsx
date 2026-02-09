"use client";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "./MovieCard";

function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg sm:rounded-xl border border-border">
      <Skeleton className="w-full aspect-2/3 rounded-none" />
      <div className="p-2 sm:p-3 space-y-2">
        <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
        <Skeleton className="h-3 sm:h-4 w-3/4" />
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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:gap-5 md:grid-cols-4 lg:gap-6 lg:grid-cols-5">
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
