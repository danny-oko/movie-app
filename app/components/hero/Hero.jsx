"use client";
import React, { useEffect, useState } from "react";
import { MoviesService } from "@/lib/services/movies";
import { useParams } from "next/navigation";

const Hero = () => {
  const { id } = useParams;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [movieId, setMovieId] = useState("");
  useEffect(() => {
    const getMovies = async () => {
      try {
        MoviesService.nowPlaying(page).then((data) => {
          setMovies(data?.results);
          console.log(data.results);

          setMovieId(movies.map((movie) => movie.id));
          console.log(movieId);
        });
      } catch (error) {
        setError(error.message);
      }
    };
    getMovies();
  }, [page]);

  useEffect(() => {
    const getTrailer = async () => {
      MoviesService.trailer(id).then((data) => {
        console.log(data);
      });
    };
    getTrailer();
  }, [id]);

  return (
    <div className="w-full border h-screen flex items-center justify-center">
      hello world
    </div>
  );
};

export default Hero;
