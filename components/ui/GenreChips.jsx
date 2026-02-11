"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function GenreChips({
  genres = [],
  activeId,
  isLoading = true,
  error = null,
  baseHref = "/genres",
  skeletonCount,
}) {
  return (
    <div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-24 rounded-full" />
            ))
          : genres.map((genre) => {
              const active = String(genre.id) === String(activeId);

              return (
                <Link
                  key={genre.id}
                  href={`${baseHref}/${genre.id}`}
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground hover:bg-accent border-border",
                  ].join(" ")}
                >
                  {genre.name}
                  <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={3} />
                  {/* {active && <span className="text-[10px]">×</span>} */}
                </Link>
              );
            })}
      </div>
    </div>
  );
}
