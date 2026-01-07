"use client";
import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
// import DisplayMovInfo from "@/app/movies/DisplayMovInfo";
import FetchData from "@/app/movies/FetchData";
import UpcomingHero from "@/app/movies/UpcomingHero";
const page = () => {
  return (
    <>
      <Header />
      {/* <FetchData /> */}
      <UpcomingHero />
      <Footer />
    </>
  );
};

export default page;
