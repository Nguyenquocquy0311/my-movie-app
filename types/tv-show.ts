export interface TVShow {
    id?: number;
    name?: string;
    first_air_date?: string;
    poster_path?: string;
    overview?: string;
    vote_average?: number;
    vote_count?: number;
    genre_ids?: number[];
    // Các trường khác nếu cần
}