"use client";
import React from "react";

const MovieCard = ({ movie }) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const poster = `${imgBaseUrl}${movie.poster_path}`;
  const title = movie.title || "Untitled";
  return (
    <a href={movie.id} className="bg-bg-gray rounded-xl ">
      <figure className="overflow-hidden">
        <img src={poster} alt={title} className="rounded-t-xl" />
      </figure>
      <div className="info p-3">
        <p className="text-md">
          ⭐ {movie.vote_average?.toFixed(1) ?? "--"} / 10
        </p>
        <p>{title}</p>
      </div>
    </a>
  );
};

export default MovieCard;
