import { api } from "@/lib/axios/client";

export const moviesService = {
  nowPlaying: async (page = 1) => {
    const { data } = await api.get("/tmdb/now-playing", { params: { page } });
    return data;
  },

  popular: async (page = 1) => {
    const { data } = await api.get("/tmdb/popular", { params: { page } });
    return data;
  },

  topRated: async (page = 1) => {
    const { data } = await api.get("/tmdb/top-rated", { params: { page } });
    return data;
  },

  upcoming: async (page = 1) => {
    const { data } = await api.get("/tmdb/upcoming", { params: { page } });
    return data;
  },

  genres: async () => {
    const { data } = await api.get("/tmdb/genres");
    return data;
  },

  moviesByGenre: async (genreId, page = 1) => {
    const { data } = await api.get("/tmdb/discover", {
      params: { genreId, page },
    });
    return data;
  },

  similar: async (id, page = 1) => {
    api.get(`/tmdb/movies/${id}/similar`, {});
    return data;
  },

  trailer: async (movieId) => {
    const { data } = await api.get(`/tmdb/movie/${movieId}/trailer`);
    return data;
  },

  credits: async (movieId) => {
    const { data } = await api.get(`/tmdb/movie/${movieId}/credits`);
    return data;
  },

  details: async (movieId) => {
    const { data } = await api.get(`/tmdb/movie/${movieId}/details`);
    return data;
  },
};
