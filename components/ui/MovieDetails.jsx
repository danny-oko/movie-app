"use client";
import React from "react";

const MovieDetails = ({ id, movie, crew, casts }) => {
  const genres = movie?.genres ?? [];

  const director = crew.find((dir) => dir.job === "Director");
  const writer = crew.find((c) => c.department === "Writing");
  // console.log(writer);

  const hour = Math.floor(movie?.runtime / 60);
  const minute = movie?.runtime % 60;

  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const posterUrl = `${imgBaseUrl}${movie.poster_path}`;

  return (
    <div className="">
      {/* Title and rating */}
      <aside className="rating w-full border">
        <h1>{movie?.original_title}</h1>

        <p>
          {movie.release_date} PG {hour > 1 ? `${hour} Hours` : `${hour} Hour`}{" "}
          {minute} Minutes
        </p>
        <div className="rating">
          <p>
            Rating:
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

        <iframe
          src={`https://www.youtube.com/embed/BqWH0KDqm3U`}
          title="YouTube trailer"
          style={{
            position: "relative",
            width: "760px",
            height: "428px",
            borderRadius: 12,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </figure>

      <section className="genres">
        {genres.map((g) => (
          <div key={g.id}>
            <p>{g.name}</p>
          </div>
        ))}
      </section>

      <section className="description">
        <p>{movie.overview}</p>
      </section>

      <section className="casts ">
        <h1>Director:</h1>
        {director?.name}
        <h1>
          {/* {writer.map((w) => (
            <div key={w.id}>
              <p>{w.name}</p>
            </div>
          ))} */}
        </h1>
      </section>
    </div>
  );
};

export default MovieDetails;
