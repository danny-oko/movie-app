"use client";
import React, { useState, useEffect } from "react";

const MovieDetails = ({ id, movie }) => {
  // const poster = `${imgBaseUrl}${movie.poster_path}`;
  return (
    <div>
      {id}
      {/* <figure><img src={poster} alt="" /></figure> */}
      <p>{movie.original_title}</p>
      <p>{movie.overview}</p>
      <div>{genres[0]}</div>
      {/* {genres.map((g) => (
        <p>{g.name}</p>
      ))} */}
    </div>
  );
};

export default MovieDetails;
