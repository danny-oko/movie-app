"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import UpcomingHero from "@/app/components/UpcomingHero";
import Popular from "@/app/movies/popular/page";
import Top from "@/app/movies/top-rated/page";
import Upcoming from "@/app/movies/upcoming/page";
import axios from "axios";

const page = () => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/account/22627464",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    },
  };


  axios.request(options).catch((err) => console.error(err));

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
