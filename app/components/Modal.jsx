"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";

const Modal = ({ genres = [], onSelect }) => {
  return (
    <div className="absolute left-0 right-0 top-12 z-50 w-full min-w-0 max-w-[calc(100vw-2rem)] sm:right-auto sm:w-[min(620px,92vw)] sm:max-w-[620px] min-h-[240px] max-h-[80vh] sm:h-[360px] rounded-2xl border border-border bg-popover shadow-xl overflow-hidden flex flex-col">
      <div className="p-4 sm:p-5 overflow-auto flex-1 min-h-0">
        <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Genres
        </h3>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          See lists of movies by genre
        </p>

        <Separator className="my-4 sm:my-5" />

        <div className="flex flex-wrap gap-x-3 gap-y-2.5 max-h-[min(210px,50vh)] overflow-auto pr-1">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              onClick={() => onSelect?.(genre.name)}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-semibold leading-none text-foreground hover:bg-accent transition"
            >
              <span className="whitespace-nowrap">{genre.name}</span>
              <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={3} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
