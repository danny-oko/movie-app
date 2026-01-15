"use client";
import React from "react";
import MovieCard from "./MovieCard";

const MovieGridPages = ({ movies = [] }) => {
  return (
    <div className="grid grid-cols-5 gap-6 ">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieGridPages;
