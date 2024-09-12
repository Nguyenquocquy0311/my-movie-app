import { Genre } from "@/types/genre";

export const API_BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "cfdc1a4ebfd711aa1af40bd6be820afa";
export const API_ACCESS_TOKEN_AUTH =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmRjMWE0ZWJmZDcxMWFhMWFmNDBiZDZiZTgyMGFmYSIsIm5iZiI6MTcyMjk1ODI4MC45MDEzNTksInN1YiI6IjY2YjIzZjg5ZWMzMGFhNThkM2M2MWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MX7CqxUBWBNSz9ZOOPe5QT4vX1h4s1810bAp9pu4BBE";

export const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN_AUTH}`,
    },
};

export interface TMDBResponse<T> {
    genres: Genre[];
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export const fetchFromAPI = async <T>(
    endpoint: string,
    queryParams = "",
    page: number | 1,
): Promise<TMDBResponse<T>> => {
    const url = `${API_BASE_URL}${endpoint}?${queryParams}&language=vi-VN&${page}`;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data: TMDBResponse<T> = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
};

export const getGenres = async (page: number): Promise<Genre[]> => {
    const data = await fetchFromAPI<Genre>("/genre/movie/list");
    return data.genres as Genre[];
};
