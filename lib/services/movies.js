import { api } from "@/lib/axios/client";

export const MoviesService = {
  genres: async () => {
    const { data } = await api.get("/tmdb/genres");
    return data;
  },

  moviesByGenre: async (genreId, page = 1) => {
    const { data } = await api.get(`/tmdb/movie/${genreId}/discover`, {
      params: { page },
    });
    return data;
  },

  similar: async (movieId, page = 1) => {
    const { data } = await api.get(`/tmdb/movie/${movieId}/similar`, {
      params: { page },
    });
    return data;
  },

  nowPlaying: async (page = 1) => {
    const { data } = await api.get("/tmdb/nowPlaying", { params: { page } });
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
};
