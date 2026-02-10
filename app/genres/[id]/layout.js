"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GenreChips from "@/components/ui/GenreChips";
import { moviesService } from "@/lib/services/movies";

export default function GenresLayout({ children }) {
  const { id } = useParams();

  const [genres, setGenres] = useState([]);
  const [genresCount, setGenresCount] = useState(8);
  const [genreError, setGenreError] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoadingGenres(true);
        setGenreError(null);

        const data = await moviesService.genres();
        if (!alive) return;

        const list = data?.genres || [];
        setGenres(list);
        setGenresCount(list.length);
      } catch (e) {
        if (!alive) return;
        setGenreError(e?.message || "Failed to Load Genres");
      } finally {
        if (!alive) return;
        setLoadingGenres(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-[80vw] max-w-none px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
          <div className="px-2 sm:px-6 pt-4 sm:pt-6">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl md:text-[30px]">
              Search filter
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[minmax(260px,360px)_1fr]">
            <aside className="px-2 pb-4 sm:px-6 sm:pb-6 md:border-r md:border-border">
              <h3 className="text-base font-semibold text-foreground">
                Genres
              </h3>
              <p className="text-xs text-muted-foreground">
                See lists of movies by genre
              </p>

              <div className="mt-3">
                <GenreChips
                  genres={genres}
                  activeId={id}
                  isLoading={loadingGenres}
                  error={genreError}
                  baseHref="/genres"
                  skeletonCount={genresCount}
                />
              </div>
            </aside>

            <section className="px-2 pb-6 sm:px-6">{children}</section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
