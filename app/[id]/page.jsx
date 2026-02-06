"use client";

import React, { useEffect, useState } from "react";
import MovieDetails from "@/components/ui/MovieDetails";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { moviesService } from "@/lib/services/movies";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const movieId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [crew, setCrew] = useState([]);
  const [casts, setCasts] = useState([]);
  const [details, setDetails] = useState(null);
  const [similiar, setSimiliar] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pushToSimilarMoviePage = (id) => {
    router.push(`/similar/${id}`);
  };

  useEffect(() => {
    if (!movieId) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [creditData, detailData, trailerData, similarData] =
          await Promise.all([
            moviesService.credits(movieId),
            moviesService.details(movieId),
            moviesService.trailer(movieId),
            moviesService.similar(movieId),
          ]);

        if (cancelled) return;

        setCrew(creditData?.crew ?? []);
        setCasts(creditData?.cast ?? []);
        setDetails(detailData ?? null);
        setVideo(trailerData?.results ?? trailerData ?? []);
        setSimiliar(similarData?.results ?? similarData ?? []);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || "Failed to load movie");
        setCrew([]);
        setCasts([]);
        setDetails(null);
        setVideo([]);
        setSimiliar([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [movieId]);
   
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      {error && <p className="text-destructive px-4 sm:px-6">{error}</p>}
      <MovieDetails movieId={movieId} />
      {/* movie = null, crew = [], casts = [], similiarData = [], trailer = [], id, */}
      {/* pushToSimilarMoviePage, loading = false, */}
      <Footer />
    </div>
  );
}
