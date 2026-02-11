"use client";

import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ChevronRight } from "lucide-react";

const LS_KEY = "search_term";
const MAX_VISIBLE = 5;

export default function SearchDropdown({
  movies = [],
  loading,
  empty,
  error,
  onClose,
  query = "",
}) {
  const saveTerm = (term) => {
    try {
      const t = (term || "").trim();
      if (t) localStorage.setItem(LS_KEY, t);
    } catch {}
  };

  const visible = movies.slice(0, MAX_VISIBLE);
  const hasMore = movies.length > MAX_VISIBLE;

  return (
    <div
      className="
        absolute left-1/2 top-14 z-50
        -translate-x-1/2
        w-[min(572px,92vw)]
        rounded-2xl border border-border bg-card shadow-xl
        overflow-hidden
      "
      role="dialog"
      aria-label="Search results"
    >
      <div className="max-h-[min(720px,85vh)] overflow-y-auto">
        {loading ? (
          <div className="divide-y divide-border">
            {[0, 1, 2, 3, 4].map((i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-sm text-destructive">{error}</div>
        ) : empty ? (
          <div className="p-6 text-sm text-muted-foreground">{empty}</div>
        ) : (
          <>
            <div className="divide-y divide-border">
              {visible.map((m) => (
                <ResultRow
                  key={m.id}
                  movie={m}
                  onClose={onClose}
                  onSaveTerm={() => saveTerm(query)}
                />
              ))}
            </div>

            {hasMore ? (
              <Link
                href={`/searchResults?query=${encodeURIComponent(query)}&page=1`}
                onClick={() => {
                  saveTerm(query);
                  onClose?.();
                }}
                className="
                  block w-full
                  px-6 py-4
                  text-sm text-muted-foreground
                  hover:bg-muted
                  transition
                "
              >
                See all results for &quot;{query}&quot;
              </Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function ResultRow({ movie, onClose, onSaveTerm }) {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w92";
  const title = movie?.title || movie?.original_title || "Untitled";
  const year = movie?.release_date ? movie.release_date.slice(0, 4) : "--";
  const rating =
    typeof movie?.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "--";

  const poster = movie?.poster_path
    ? `${imgBaseUrl}${movie.poster_path}`
    : null;

  return (
    <Link
      href={`/${movie.id}`}
      onClick={() => {
        onSaveTerm?.();
        onClose?.();
      }}
      className="
        flex items-center gap-4
        px-6 py-4
        hover:bg-muted
        transition
      "
    >
      <div className="shrink-0 overflow-hidden bg-muted rounded-md w-[68px] h-[100px]">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate text-base">{title}</p>

        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <Star
            className="h-4 w-4 text-yellow-500 fill-yellow-500"
            strokeWidth={0}
          />
          <span className="text-foreground">{rating}</span>
          <span>/10</span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">{year}</p>
      </div>

      <div className="ml-6 flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
        <span>See more</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <Skeleton className="shrink-0 rounded-md w-[68px] h-[100px]" />

      <div className="flex-1 flex flex-col">
        <Skeleton className="h-5 w-[60%]" />

        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-10" />
        </div>

        <Skeleton className="mt-2 h-4 w-12" />
      </div>

      <Skeleton className="h-4 w-20" />
    </div>
  );
}
