"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import HeroSlide from "./HeroSlide";

export default function UpcomingHeroCarousel({ movies, onWatchTrailer }) {
  return (
    <Carousel className="h-full w-full">
      <CarouselContent className="h-full">
        {movies.map((m) => (
          <CarouselItem key={m.id} className="h-full">
            <HeroSlide movie={m} onWatchTrailer={onWatchTrailer} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
