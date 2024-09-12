// ListFilm.tsx
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import { useFilmType } from "../../context/filmTypeContext";
import { useDarkMode } from "../../context/darkModeContext";
import { useFilmContext } from "../../context/FilmContext";
import { useRouter } from "next/router";
import { getPopularMovies, getMovieGenres } from "../../services/movies";
import { Film } from "@/types/film";
import { Genre } from "@/types/genre";
import { getPopularTVShows } from "@/services/tv";
import { TVShow } from "@/types/tv-show";

const ListFilm = () => {
  const [films, setFilms] = useState<Film[] | TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const filmsPerPage = 8;
  const { darkMode } = useDarkMode();
  const { filmType } = useFilmType();
  const { setCurrentFilm } = useFilmContext();
  const router = useRouter();

  useEffect(() => {
  const fetchData = async () => {
    try {
      let filmData;
      if (filmType === "tv") {
        filmData = await getPopularTVShows(page);
      } else {
        filmData = await getPopularMovies(page);
      }
      console.log("Fetched film data:", filmData);
      setFilms(filmData.results);
      const genreData = await getMovieGenres();
      setGenres(genreData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, [filmType, page]);

  useEffect(() => {
    if (films.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % films.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [films]);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name)
      .join(", ");
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedFilms = films.slice(
    (page - 1) * filmsPerPage,
    page * filmsPerPage
  );

  const handleDetailsClick = (film: Film) => {
    setCurrentFilm(film);
    router.push("/movie");
  };

  return (
    <div className="px-24 mt-4 pb-8">
      {/* Section 1: Slider */}
      <div className="mb-14 border-slate-500">
        <Box mb={4}>
          {films.length > 0 && (
            <Card className="relative">
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/original${films[currentIndex]?.poster_path}`}
                alt={films[currentIndex]?.title || films[currentIndex]?.name || "Default Title"}
                className="h-[600px] object-cover"
              />
              <CardContent
                className={classNames(
                  "absolute bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg",
                  darkMode ? "bg-opacity-90" : "bg-opacity-30"
                )}
              >
                <Typography variant="h5" className="mb-2">
                  {films[currentIndex]?.title || films[currentIndex]?.name || "Default Title"}
                </Typography>
                <Typography variant="subtitle2">
                  Năm: {films[currentIndex]?.release_date || films[currentIndex]?.first_air_date || "Default Year"}
                </Typography>
                <Typography variant="subtitle2">
                  Lượt đánh giá: {films[currentIndex]?.vote_count}
                </Typography>
                <Button
                  className="z-10 mt-2"
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetailsClick(films[currentIndex])}
                >
                  Chi tiết
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>
      </div>

      {/* Section 2: Grid */}
      <Typography
        variant="h4"
        className="text-blue-600 pb-6 font-bold border-t-[2px] border-blue-500"
      >
        Phim nổi bật
      </Typography>
      <Grid container spacing={4}>
        {paginatedFilms.map((film, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              className={classNames(
                "cursor-pointer hover:shadow-2xl transition-shadow duration-300",
                darkMode ? "hover:shadow-slate-500" : "hover:shadow-gray-900"
              )}
              onClick={() => handleDetailsClick(film)}
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                alt={film.title || film.name}
                className="h-[300px] object-cover"
              />
              <CardContent
                className={classNames(
                  darkMode && "text-white bg-slate-900",
                  "flex flex-col justify-between h-[280px]"
                )}
              >
                <Typography variant="h6" className="font-bold mb-2">
                  {film.title || film.name}
                </Typography>
                <Typography variant="subtitle2" className="mb-2">
                  Năm: {film.release_date || film.first_air_date}
                </Typography>
                <Typography variant="subtitle2" className="mb-2">
                  Thể loại: {getGenreNames(film.genre_ids)}
                </Typography>
                <Typography variant="subtitle2" className="mb-2">
                  Lượt đánh giá: {film.vote_count}
                </Typography>
                <Button
                  variant={!darkMode ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleDetailsClick(film)}
                  className="mt-auto"
                >
                  Chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        className={classNames(darkMode ? "text-white" : "")}
      >
        <Pagination
          count={Math.ceil(films.length / filmsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            ".MuiPaginationItem-root": {
              color: darkMode ? "white" : "black",
              "&.Mui-selected": {
                backgroundColor: darkMode ? "#3f51b5" : "#1976d2",
                color: "white",
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default ListFilm;
