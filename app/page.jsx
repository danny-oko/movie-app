"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import UpcomingHero from "@/app/components/UpcomingHero";
import Popular from "@/app/movies/popular/page";
import Top from "@/app/movies/top-rated/page";
import Upcoming from "@/app/movies/upcoming/page";

const page = () => {
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
