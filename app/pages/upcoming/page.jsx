"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/app/components/Header"
const Page = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        const res = await axios.get("/api/tmdb/upcoming");
        if (!alive) return;

        setMovies(res.data?.results ?? []);
        console.log(res.data);
      } catch (error) {
        if (!alive) return;
        setError("internal server error");
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const imageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading && <p>loading...</p>}
      {error && <p>{error}</p>}
      <div className="w-4/5 mt-8">
        {/* Header row */}
        <div className="flex items-center justify-between px-10">
          <h3 className="font-semibold text-2xl">Upcoming</h3>
          <button
            onClick={handleBack}
            className="w-[120px] h-[36px] flex flex-col items-center justify-center align-center"
          >
            Back ←
          </button>
        </div>

        {/* Grid */}
        {!isLoading && !error && (
          <div className="mt-4">
            <div className="grid grid-cols-5 gap-6 px-10 py-8">
              {movies.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl overflow-hidden bg-white shadow-sm"
                >
                  <img
                    src={`${imageUrl}${m.poster_path}`}
                    alt={m.original_title}
                    className="w-full h-[320px] object-cover"
                  />

                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">
                      ⭐ {m.vote_average.toFixed(1)}
                      <span className="text-xs text-gray-500">/10</span>
                    </p>
                    <h1 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">
                      {m.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
