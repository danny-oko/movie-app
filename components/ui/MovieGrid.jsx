"use client";
import React from "react";
import MovieCard from "./MovieCard";
const MovieGrid = ({ movies = [] }) => {
  return (
    <div className="grid grid-cols-5 gap-8">
      {movies.slice(0, 20).map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieGrid;
