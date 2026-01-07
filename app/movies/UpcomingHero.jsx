"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const slides = [
  {
    title: "Wicked",
    rating: "8.2",
    desc: "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. ",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Dune: Part Two",
    rating: "8.6",
    desc: "Paul goes full prophecy mode in the sandiest group project ever.",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function UpcomingHero() {
  return (
    <div className="w-full h-[60vh] relative overflow-hidden rounded-lg">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {slides.map((s, idx) => (
            <CarouselItem key={idx} className="h-full">
              <div className="relative h-[60vh] w-full overflow-hidden flex flex-col items-start justify-center">
                {/* bg */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

                {/* content */}
                <div className="relative z-10 w-[404px] h-[264px] flex flex-col justify-center pl-[140px] px-6 md:px-10 ml-[140px]">
                  <div className="max-w-[420px] text-white">
                    <p className="text-white/80 text-sm text-lg">
                      Now Playing:
                    </p>
                    <h1 className="text-4xl font-semibold leading-tight">
                      {s.title}
                    </h1>
                    <p className="text-white/90 mt-2">⭐ {s.rating} / 10</p>
                    <p className="text-sm text-white/75 leading-relaxed line-clamp-4 mt-4">
                      {s.desc}
                    </p>
                    <button className="w-[145px] h-[40px] bg-bg-gray text-black p-2 text-[14px] rounded-lg mt-4">
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* arrows */}
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
