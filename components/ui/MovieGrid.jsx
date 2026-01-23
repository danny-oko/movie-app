"use client";
import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.slice(0, 10).map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieGrid;
