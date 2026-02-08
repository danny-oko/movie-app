"use client";
import { Skeleton } from "./skeleton";
import { Separator } from "./separator";
import MovieGrid from "./MovieGrid";

export default function MovieDetailsSkeleton({ isLoading }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="space-y-3 min-w-0 flex-1">
            <Skeleton className="h-8 w-full max-w-[360px] sm:h-10" />
            <Skeleton className="h-4 w-full max-w-[260px]" />
          </div>
          <div className="flex gap-4 sm:flex-col sm:items-end sm:gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[minmax(200px,290px)_1fr]">
          <Skeleton className="w-full max-w-[290px] mx-auto aspect-2/3 rounded-xl lg:mx-0" />
          <Skeleton className="w-full aspect-video sm:min-h-[320px] md:h-[428px] rounded-xl" />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>

        <div className="mt-4 space-y-2 max-w-5xl">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>

        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-0 py-4 sm:py-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full max-w-[280px] sm:max-w-[18rem]" />
              </div>
              <Separator />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-36 rounded-md" />
          </div>

          <div className="mt-4 sm:mt-5">
            <MovieGrid isLoading limit={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
