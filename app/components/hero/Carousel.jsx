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
      <CarouselContent className="h-full">
        {movies.map((m) => (
          <CarouselItem key={m.id} className="h-full">
            <Slider movie={m} onWatchTrailer={onWatchTrailer} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
