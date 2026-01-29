"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function UpcomingHeroSkeleton() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
      {/* background */}
      <Skeleton className="absolute inset-0 rounded-lg" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* left text block */}
      <div className="absolute left-32 top-1/2 z-10 w-[520px] -translate-y-1/2 max-md:left-6 max-md:w-[85%] space-y-4">
        <Skeleton className="h-4 w-28 bg-white/20" />
        <Skeleton className="h-10 w-[420px] bg-white/20 max-md:w-[260px]" />
        <Skeleton className="h-4 w-32 bg-white/20" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-full bg-white/20" />
          <Skeleton className="h-3 w-11/12 bg-white/20" />
          <Skeleton className="h-3 w-10/12 bg-white/20" />
          <Skeleton className="h-3 w-9/12 bg-white/20" />
        </div>

        <Skeleton className="h-10 w-36 rounded-md bg-white/20" />
      </div>
    </div>
  );
}

export default function UpcomingHero() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [trailerLoading, setTrailerLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get("/api/tmdb/nowPlaying", {
          signal: controller.signal,
        });

        setMovies(res.data?.results ?? []);
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setError("Internal Server Error");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    getMovie();
    return () => controller.abort();
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setSelectedId(null);
    setEmbedUrl(null);
    setTrailerLoading(false);
  }, []);

  const onWatchTrailer = useCallback((movieId) => {
    setSelectedId(movieId);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open || !selectedId) return;

    const controller = new AbortController();

    const getTrailer = async () => {
      setTrailerLoading(true);
      setEmbedUrl(null);

      try {
        const res = await axios.get(`/api/tmdb/movies/${selectedId}/trailer`, {
          signal: controller.signal,
        });

        const results = res.data?.results ?? [];

        const picked =
          results.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
          results.find(
            (v) =>
              v.site === "YouTube" &&
              (v.type === "Teaser" || v.type === "Clip"),
          ) ||
          results.find((v) => v.site === "YouTube");

        if (picked?.key) {
          setEmbedUrl(
            `https://www.youtube.com/embed/${picked.key}?autoplay=1&rel=0`,
          );
        } else {
          setEmbedUrl(null);
        }
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setEmbedUrl(null);
      } finally {
        setTrailerLoading(false);
      }
    };

    getTrailer();
    return () => controller.abort();
  }, [open, selectedId]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  const topMovies = useMemo(() => (movies ?? []).slice(0, 10), [movies]);

  if (isLoading) return <UpcomingHeroSkeleton />;
  if (error) return <p>{error}</p>;
  if (!topMovies.length) return <p>No movies found.</p>;

  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
      <Carousel className="h-full w-full">
        <CarouselContent className="h-full">
          {topMovies.map((m) => {
            const backdrop = m?.backdrop_path
              ? `${IMAGE_BASE}${m.backdrop_path}`
              : null;

            return (
              <CarouselItem key={m.id} className="h-full">
                <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
                  {backdrop ? (
                    <img
                      src={backdrop}
                      alt={m?.title ?? "Movie"}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                  <div className="absolute left-32 top-1/2 z-10 w-[520px] -translate-y-1/2 text-white max-md:left-6 max-md:w-[85%]">
                    <p className="text-sm opacity-80">Now Playing:</p>

                    <h2 className="mt-2 text-4xl font-bold leading-tight max-md:text-3xl">
                      {m?.title}
                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-sm opacity-90">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">
                        {Number(m?.vote_average ?? 0).toFixed(1)}
                      </span>
                      <span className="opacity-60">/ 10</span>
                    </div>

                    <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-white/80">
                      {m?.overview}
                    </p>

                    <div className="mt-6">
                      <Button
                        variant="trailer"
                        size="lg"
                        onClick={() => onWatchTrailer(m.id)}
                      >
                        Watch trailer
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Dialog
        open={open}
        onOpenChange={(v) => (v ? setOpen(true) : closeModal())}
      >
        <DialogContent className="!p-0 !overflow-hidden !max-w-none !w-[min(1200px,96vw)] !h-[min(80vh,720px)]">
          <div className="relative h-full w-full bg-black">
            {trailerLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Loading trailer...
              </div>
            )}

            {!trailerLoading && !embedUrl && (
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
                Trailer not available for this movie
              </div>
            )}

            {!trailerLoading && embedUrl && (
              <iframe
                className="h-full w-full"
                src={embedUrl}
                title="YouTube trailer"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
