"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Slider from "./Slider";

export default function HeroCarousel({ movies, onWatchTrailer }) {
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
