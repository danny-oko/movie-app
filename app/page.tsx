"use client";
import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DisplayMovInfo from "@/app/movies/DisplayMovInfo";
import FetchData from "@/app/movies/FetchData";
const page = () => {
  return (
    <>
      <Header />
      <FetchData />

      <Footer />
    </>
  );
};

export default page;
