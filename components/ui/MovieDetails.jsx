"use client";

import React from "react";
import MovieGridSimiliar from "./MovieGridSimiliar";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import GenreChips from "./GenreChips";

const MovieDetails = ({
  movie = null,
  crew = [],
  casts = [],
  similiarData = [],
  trailer = [],
  id,
  pushToSimilarMoviePage,
  loading = false,
}) => {
  if (loading) return <MovieDetailsSkeleton />;

  if (!movie) return null;

  const genres = movie.genres || [];

  const director = crew.filter((p) => p.job === "Director");
  const writers = crew.filter((p) => p.department === "Writing");
  const stars = casts.filter((p) => p.known_for_department === "Acting");

  const trailerList = Array.isArray(trailer) ? trailer : trailer?.results || [];
  const bestTrailer =
    trailerList.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    trailerList.find((v) => v.site === "YouTube");

  const trailerKey = bestTrailer ? bestTrailer.key : null;

  const hour = Math.floor((movie.runtime || 0) / 60);
  const minute = (movie.runtime || 0) % 60;

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const posterUrl = movie?.poster_path
    ? `${imgBaseUrl}${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold">{movie.original_title}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
              <span>{movie.release_date}</span>
              <span>•</span>
              <span>PG</span>
              <span>•</span>
              <span>
                {hour}h {minute}m
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-zinc-500">Rating</p>
            <div className="mt-1 flex items-center justify-end gap-2">
              <span className="text-lg">⭐</span>
              <span className="text-xl font-semibold">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "--"}
              </span>
              <span className="text-sm text-zinc-500">/10</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              {movie.vote_count} votes
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr]">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie?.original_title || "Poster"}
              className="h-[428px] w-[290px] rounded-xl object-cover"
            />
          ) : (
            <div className="h-[428px] w-[290px] rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500">
              No poster
            </div>
          )}

          <div className="overflow-hidden rounded-xl">
            {trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube trailer"
                className="h-[428px] w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-[428px] w-full items-center justify-center bg-zinc-100 text-zinc-500">
                No trailer available
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <GenreChips
            genres={genres}
            activeId={id}
            isLoading={loading}
            baseHref="/pages/genres"
          />
        </div>

        <p className="mt-4 max-w-5xl text-sm leading-6 text-zinc-700">
          {movie.overview}
        </p>

        <div className="mt-8">
          <CreditRow
            label="Director"
            values={director.slice(0, 2).map((d) => d.name)}
          />
          <Divider />
          <CreditRow
            label="Writers"
            values={writers.slice(0, 3).map((w) => w.name)}
          />
          <Divider />
          <CreditRow
            label="Stars"
            values={stars.slice(0, 3).map((s) => s.name)}
          />
          <Divider />
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">More like this</h2>
            <Button
              variant="seeMore"
              onClick={() => pushToSimilarMoviePage(id)}
            >
              More like this →
            </Button>
          </div>

          <div className="mt-5">
            <MovieGridSimiliar movies={similiarData} />
          </div>
        </div>
      </div>
    </div>
  );
};

function CreditRow({ label, values = [] }) {
  return (
    <div className="grid grid-cols-[180px_1fr] items-center py-6">
      <p className="text-md font-bold text-zinc-900">{label}</p>
      <p className="text-md text-zinc-800">
        {values.length ? values.join(" · ") : "--"}
      </p>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-zinc-200" />;
}

function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <Skeleton className="h-10 w-[360px]" />
            <Skeleton className="h-4 w-[260px]" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-3 w-20 ml-auto" />
            <Skeleton className="h-8 w-24 ml-auto" />
            <Skeleton className="h-3 w-28 ml-auto" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr]">
          <Skeleton className="h-[428px] w-[290px] rounded-xl" />
          <Skeleton className="h-[428px] w-full rounded-xl" />
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

        <div className="mt-8 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="grid grid-cols-[180px_1fr] items-center py-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-72" />
              </div>
              <Divider />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-36 rounded-md" />
          </div>

          <div className="mt-5">
            <MovieGridSimiliar isLoading />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
