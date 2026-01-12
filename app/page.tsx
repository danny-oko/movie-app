"use client";
import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import UpcomingHero from "@/app/components/UpcomingHero";
import Upcoming from "@/app/movies/upcoming/page";
import Popular from "@/app/movies/popular/page";
import Top from "@/app/movies/top-rated/page";
import axios from "axios";

const page = () => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/account/22627464",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjRhZTgxN2Y1MTQ4ZTkyMDIzMWM1OTBmNTZjZWE1YyIsIm5iZiI6MTc2NzY4ODIyMi4wNzksInN1YiI6IjY5NWNjODFlODI2NmNmOGUyMWRjMmM4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CefpI5lXcMjzRN2Zm-Ap3g5nGh8x2swrJ4Y1MME_HzM",
    },
  };

  axios
    .request(options)
    // .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
  return (
    <>
      <Header />
      <UpcomingHero />
      <Upcoming />
      <Popular />
      <Top />
      <Footer />
    </>
  );
};

export default page;
