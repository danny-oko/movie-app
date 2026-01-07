"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchData = (presets) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://www.omdbapi.com/?i=tt3896198&apikey=1f7a0525"
        );
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Ratings = {
      Source,
      Value,
    },
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    DVD,
    BoxOffice,
    Production,
    Website,
    Response,
  } = data;

  return (
    <div>
      <img src={Poster} alt="" />
      <p>{Title}</p>
      <p>⭐{imdbRating}</p>
      <p>{Plot}</p>
      {/* <p>{Title}</p> */}
    </div>
  );
};
export default FetchData;
