"use client";
import React from "react";
import MovieCard from "./MovieCard";

const MovieGridSimiliar = ({ movies = [] }) => {
  return (
    <div className="grid grid-cols-5 gap-8">
      {movies.slice(0, 5).map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieGridSimiliar;
