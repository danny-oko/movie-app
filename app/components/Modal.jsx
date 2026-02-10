"use client";

import Link from "next/link";

const Modal = ({ genres = [], onSelect }) => {
  return (
    <div
      className="
        absolute left-1/2 top-12 z-50
        w-[min(680px,92vw)]
        -translate-x-1/2
        rounded-2xl border border-border bg-popover shadow-xl
        p-5 sm:p-6
      "
    >
      <h3 className="text-xl sm:text-3xl font-semibold text-foreground">
        Genres
      </h3>

      <p className="mt-1 text-sm sm:text-lg text-muted-foreground">
        See lists of movies by genre
      </p>

      <div className="my-4 h-px w-full bg-border" />

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {genres.map((g) => (
          <Link
            href={`/genres/${g.id}`}
            key={g.id}
            type="button"
            onClick={() => onSelect(g.name)}
            className="rounded-full border border-border bg-background px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-accent touch-manipulation"
          >
            {g.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Modal;
