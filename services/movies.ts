// moviesAPI.ts
import { Film } from "@/types/film";
import { fetchFromAPI, getGenres, TMDBResponse } from "./common";

export const getPopularMovies = async (): Promise<TMDBResponse<Film>> => {
    return fetchFromAPI<Film>("/movie/popular");
};

export const getTopRatedMovies = async (): Promise<TMDBResponse<Film>> => {
    return fetchFromAPI<Film>("/movie/top_rated");
};

export const getUpcomingMovies = async (): Promise<TMDBResponse<Film>> => {
    return fetchFromAPI<Film>("/movie/upcoming");
};

export const getMovieGenres = getGenres;
