"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import HeroSection from "@/app/components/hero/page";
import Popular from "@/app/movies/popular/page";
import Top from "@/app/movies/top-rated/page";
import Upcoming from "@/app/movies/upcoming/page";

const page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <Upcoming />
      <Popular />
      <Top /> */}
      {/* <Footer /> */}
    </>
  );
};

export default page;
