"use client";

import HeroSkeleton from "@/components/ui/HeroSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Slider from "./Slider";
import React, { useEffect, useState } from "react";
export default function HeroCarousel({ movies, onWatchTrailer, loading }) {
  let isLoading = !movies.length;
  if (isLoading) return <HeroSkeleton />;

  return (
    <Carousel className="h-full w-full">
      <CarouselContent className="h-full ml-0">
        {movies.map((m) => (
          <CarouselItem key={m.id} className="h-full pl-0">
            <Slider movie={m} onWatchTrailer={onWatchTrailer} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-3 top-1/2 z-30 -translate-y-1/2 border-white/20 bg-black/55 text-white hover:bg-black/70 sm:left-4 md:left-6" />
      <CarouselNext className="right-3 top-1/2 z-30 -translate-y-1/2 border-white/20 bg-black/55 text-white hover:bg-black/70 sm:right-4 md:right-6" />
    </Carousel>
  );
}
