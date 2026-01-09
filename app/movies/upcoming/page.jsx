import React, { useState, useEffect } from "react";
import axios from "axios";
import loadConfig from "next/dist/server/config";

const Upcoming = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        const res = await axios.get("/api/tmdb/upcoming");
        if (!alive) return;

        setMovies(res.data?.results ?? []);
        console.log(res.data);
      } catch (error) {
        setError("internal server error");
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="w-full">
      {isLoading && <p>Loading...</p>}
      {error}
    </div>
  );
};

export default Upcoming;
