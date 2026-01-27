"use client";
import React, { useState, useEffect } from "react";

import MovieGrid from "../../../../components/ui/MovieGrid";
import Pager from "../../../../components/ui/Pager";
import { Button } from "../../../../components/ui/button";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

const Page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  // const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`/api/tmdb/genres`, {
          signal: controller.signal,
        });
        setGenres(res?.data?.genres ?? []);
      } catch (err) {
        if (
          axios.isCancel ||
          e.name === "CanceledError" ||
          e.code === "ERR_CANCELED"
        ) {
          setError(e?.message || "Failed to Load!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();

    const getMovies = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `/api/tmdb/movies/${id}/movies-by-genre?page=${page}`,
        );
        setMovies(res?.data?.results ?? []);
      } catch (err) {
        if (
          axios.isCancel ||
          e.name === "CancelError" ||
          e.code === "ERR_CANCELED"
        ) {
          setError(e?.message || "failed to load");
        }
      } finally {
        setLoading(false);
      }
    };
    getMovies();

    const getTotalPages = async () => {
      try {
        const { data } = await axios.get(
          `/api/tmdb/movies/${id}/movies-by-genre?page=${page}`,
        );
        setTotalPages(data?.total_pages);
        console.log(data.total_pages);
      } catch (err) {}
    };
    getTotalPages();

    return () => {
      controller.abort();
    };
  }, [id, page]);

  return (
    <div>
      <section className="gernes">
        {genres.map((genre) => (
          <Button variant="default" key={genre.id}>
            <NuqsAdapter>{genre.name}</NuqsAdapter>
          </Button>
        ))}
      </section>
      <section className="movies">
        {movies.slice(0, 1).map((movie) => (
          <div key={movie.id}>
            <MovieGrid movies={movies} isLoading={loading} limit={12} />
          </div>
        ))}
      </section>
      <section className="pagination">
        <Pager
          page={page}
          totalPages={totalPages}
          // onPageChange={page}
          maxButtons={3}
        />
      </section>
    </div>
  );
};
export default Page;
