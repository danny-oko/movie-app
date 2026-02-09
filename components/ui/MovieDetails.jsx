"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Button } from "../ui/button";
import GenreChips from "./GenreChips";
import MovieGrid from "./MovieGrid";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import Credits from "./Credits";

const MovieDetails = ({
  movie,
  crew = [],
  casts = [],
  similarMovies = [],
  trailer = [],
  id,
  pushToSimilarMoviesPage,
  loading = false,
}) => {
  if (loading) return <MovieDetailsSkeleton isLoading={loading} />;

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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold text-foreground leading-tight sm:text-3xl md:text-4xl">
              {movie.original_title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span>{movie.release_date}</span>
              <span>•</span>
              <span>PG</span>
              <span>•</span>
              <span>
                {hour}h {minute}m
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-0 sm:text-right shrink-0">
            <p className="text-xs font-medium text-muted-foreground">Rating</p>
            <div className="flex items-center gap-2 sm:mt-1 sm:justify-end">
              <span className="text-base sm:text-lg">⭐</span>
              <span className="text-lg font-semibold text-foreground sm:text-xl">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "--"}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                /10
              </span>
            </div>
            <p className="text-xs text-muted-foreground sm:mt-1">
              {movie.vote_count} votes
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[minmax(200px,290px)_1fr]">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie?.original_title || "Poster"}
              className="w-full max-w-[290px] mx-auto lg:mx-0 aspect-2/3 object-cover rounded-xl"
            />
          ) : (
            <div className="w-full max-w-[290px] mx-auto lg:mx-0 aspect-2/3 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
              No poster
            </div>
          )}

          <div className="overflow-hidden rounded-xl min-h-[200px] sm:min-h-[320px] md:min-h-[428px]">
            {trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube trailer"
                className="w-full aspect-video min-h-[200px] sm:min-h-[320px] md:h-[428px] md:min-h-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex min-h-[200px] sm:min-h-[320px] md:min-h-[428px] w-full items-center justify-center bg-muted text-muted-foreground text-sm">
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
            baseHref="/genres"
          />
        </div>

        <p className="mt-4 max-w-5xl text-sm leading-6 text-foreground">
          {movie.overview}
        </p>

        <Credits director={director} writers={writers} stars={stars} />

        <div className="mt-8 sm:mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              More like this
            </h2>
            <Button
              variant="seeMore"
              className="touch-manipulation w-fit"
              onClick={() => pushToSimilarMoviesPage(id)}
            >
              More like this →
            </Button>
          </div>

          <div className="mt-4 sm:mt-5">
            <MovieGrid movies={similarMovies} limit={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
