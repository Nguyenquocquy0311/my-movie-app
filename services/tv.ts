import { Film } from "@/types/film";
import { fetchFromAPI, getGenres, TMDBResponse } from "./common";

export const getPopularTVShows = async (page: number): Promise<TMDBResponse<Film>> => {
    return fetchFromAPI<Film>("/tv/popular");
};

export const getTopRatedTVShows = async (): Promise<TMDBResponse<Film>> => {
    return fetchFromAPI<Film>("/tv/top_rated");
};

export const getUpcomingTVShows = async (): Promise<TMDBResponse<Film>> => {
    return fetchFromAPI<Film>("/tv/on_the_air");
};

export const getTVGenres = getGenres;
