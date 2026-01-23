"use client";
import React from "react";
import Link from "next/link";

const MovieCard = ({ movie }) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const poster = `${imgBaseUrl}${movie.poster_path}`;
  const title = movie.title || "Untitled";

  return (
    <Link
      href={`/pages/${movie.id}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white hover:shadow-sm transition"
    >
      <figure className="overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="h-auto w-full object-cover aspect-[2/3]"
        />
      </figure>

      <div className="p-3">
        <p className="text-sm text-zinc-700">
          ⭐ {movie.vote_average?.toFixed(1) ?? "--"}{" "}
          <span className="text-zinc-400">/ 10</span>
        </p>
        <p className="mt-1 text-sm font-semibold text-zinc-900 truncate">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
