"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import HeroSection from "@/app/components/hero/page";
import Popular from "@/app/homePageMoviesGrid/popular/page";
import Top from "@/app/homePageMoviesGrid/top-rated/page";
import Upcoming from "@/app/homePageMoviesGrid/upcoming/page";

const page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Upcoming />
      <Popular />
      <Top />
      <Footer />
    </>
  );
};

export default page;
