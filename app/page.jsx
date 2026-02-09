"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Hero from "@/app/components/hero/HeroWrapper";
import Popular from "@/app/homePageMoviesGrid/popular/page";
import Top from "@/app/homePageMoviesGrid/top-rated/page";
import Upcoming from "@/app/homePageMoviesGrid/upcoming/page";

const page = () => {
  return (
    <>
      <Header />
      <Hero />
      <Upcoming />
      <Popular />
      <Top />
      <Footer />
    </>
  );
};

export default page;
