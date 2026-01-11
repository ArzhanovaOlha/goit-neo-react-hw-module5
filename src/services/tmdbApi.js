import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/day`,
    options
  );
  return data.results;
};

export const searchMovies = async query => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie`,
    {
      ...options,
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    }
  );
  return data.results;
};

export const getMovieDetails = async id => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${id}`,
    options
  );
  return data;
};

export const getMovieCredits = async id => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${id}/credits`,
    options
  );
  return data.cast;
};

export const getMovieReviews = async id => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${id}/reviews`,
    options
  );
  return data.results;
};
