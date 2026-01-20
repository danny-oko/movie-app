"use client";
import React from "react";

const MovieDetails = ({ id, movie }) => {
  const genres = movie?.genres ?? [];
  const hour = Math.floor(movie?.runtime / 60);
  const minute = movie?.runtime % 60;

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const posterUrl = `${imgBaseUrl}${movie.poster_path}`;

  return (
    <div>
      {/* Title and rating */}
      <aside className="rating w-full border">
        <h1>{movie?.original_title}</h1>

        <p>
          {movie.release_date} PG {hour > 1 ? `${hour} Hours` : `${hour} Hour`}{" "}
          {minute} Minutes
        </p>
        <div className="rating">
          <p>
            Rating:{" "}
            <label>⭐ {movie.vote_average?.toFixed(1) ?? "--"} / 10 </label>
          </p>
          <p>{movie.vote_count} votes</p>
        </div>
      </aside>

      {/* poster and trailer video */}
      <figure className="poster-trailer">
        <img
          src={posterUrl}
          alt={movie.original_title}
          className="w-[290px] h-[428px]"
        />
      </figure>
    </div>
  );
};

export default MovieDetails;
