"use client";
import Link from "next/link";

const Modal = ({ genres = [], onSelect }) => {
  return (
    <div className="absolute left-0 right-0 top-12 z-50 w-full min-w-0 max-w-[calc(100vw-2rem)] sm:right-auto sm:w-[min(572px,90vw)] sm:max-w-[572px] min-h-[280px] max-h-[85vh] sm:h-[332px] rounded-2xl border border-border bg-popover shadow-xl overflow-hidden flex flex-col">
      <div className="p-4 sm:p-6 overflow-auto flex-1 min-h-0">
        <h3 className="text-xl sm:text-3xl font-semibold text-foreground">
          Genres
        </h3>
        <p className="mt-1 text-sm sm:text-lg text-muted-foreground">
          See lists of movies by genre
        </p>

        <div className="my-4 sm:my-5 h-px w-full bg-border" />

        <div className="flex flex-wrap gap-2 sm:gap-3 max-h-[min(190px,40vh)] overflow-auto pr-1">
          {genres.map((g) => (
            <Link
              href={`/pages/genres/${g.id}`}
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
    </div>
  );
};

export default Modal;
