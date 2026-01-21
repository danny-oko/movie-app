"use client";
import React from "react";
import MovieGridSimiliar from "./MovieGridSimiliar";

const MovieDetails = ({
  id,
  movie = null,
  crew = [],
  casts = [],
  similiarData = [],
  trailer = [],
}) => {
  if (!movie) return null;

  const genres = movie.genres || [];

  // simple filters
  const director = crew.filter((p) => p.job === "Director");
  const writers = crew.filter((p) => p.department === "Writing");
  const stars = casts.filter((p) => p.known_for_department === "Acting");

  // trailer key
  const trailerList = Array.isArray(trailer) ? trailer : trailer?.results || [];
  const bestTrailer =
    trailerList.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    trailerList.find((v) => v.site === "YouTube");
  const trailerKey = bestTrailer ? bestTrailer.key : null;

  // runtime
  const hour = Math.floor((movie.runtime || 0) / 60);
  const minute = (movie.runtime || 0) % 60;

  // poster (IMPORTANT: null, not "")
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const posterUrl = movie?.poster_path
    ? `${imgBaseUrl}${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        {/* HEADER */}
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

        {/* POSTER + TRAILER */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[290px_1fr]">
          {/* Poster */}
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

          {/* Trailer */}
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

        {/* GENRES */}
        <div className="mt-5 flex flex-wrap gap-2">
          {genres.map((g) => (
            <span
              key={g.id}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700"
            >
              {g.name}
            </span>
          ))}
        </div>

        {/* OVERVIEW */}
        <p className="mt-4 max-w-5xl text-sm leading-6 text-zinc-700">
          {movie.overview}
        </p>

        {/* CREDITS (no surrounding border) */}
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

        {/* SIMILIAR */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">More like this</h2>
            <button className="text-sm font-medium text-zinc-700 hover:text-zinc-900">
              See more →
            </button>
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
      <p className="text-xl font-bold text-zinc-900">{label}</p>
      <p className="text-xl text-zinc-800">
        {values.length ? values.join(" · ") : "--"}
      </p>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-zinc-200" />;
}

export default MovieDetails;
