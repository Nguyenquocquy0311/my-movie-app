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
import axios from "axios";

interface Page<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
}

interface Film {
  title: string;
  director: string;
  year: number;
  image: string;
  subImage: string;
  url: string;
  type: string;
  desc: string;
}

const ListFilm = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const filmsPerPage = 12;
  const { darkMode } = useDarkMode();
  const { filmType } = useFilmType();
  const { setCurrentFilm } = useFilmContext();
  const router = useRouter();

  const doFetchFilms = async (type?: string) => {
    const resp = await axios.get<Page<Movie>>(
      "http://localhost:8080/api/movie/get",
      { params: { typeId: type, page: page } }
    );
    setFilms(resp.data.content);
    setTotalPages(resp.data.totalPages);
  };

  useEffect(() => {
    const type = filmType;
    if (type) {
      doFetchFilms(type);
    } else {
      doFetchFilms();
    }
  }, [filmType, page]);

  useEffect(() => {
    if (films.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % films.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [films]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // const paginatedFilms = films.slice(
  //   (page - 1) * filmsPerPage,
  //   page * filmsPerPage
  // );

  const handleDetailsClick = (film: Film) => {
    setCurrentFilm(film);
    router.push("/movie");
  };
  console.log(films);
  return (
    <div className="px-24 mt-4 pb-8">
      {/* Section 1: Slider */}
      <div className="mb-14 border-slate-500">
        <Box mb={4}>
          {films.length > 0 && (
            <Card className="relative">
              <CardMedia
                component="img"
                image={films[currentIndex]?.image || "default-image-url"}
                alt={films[currentIndex]?.title || "Default Title"}
                className="h-[600px] object-cover"
              />
              <CardContent
                className={classNames(
                  "absolute bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg",
                  darkMode ? "bg-opacity-90" : "bg-opacity-30"
                )}
              >
                <Typography variant="h5" className="mb-2">
                  {films[currentIndex]?.title || "Default Title"}
                </Typography>
                <Typography variant="subtitle1">
                  Đạo diễn:{" "}
                  {films[currentIndex]?.director || "Default Director"}
                </Typography>
                <Typography variant="subtitle2">
                  Năm: {films[currentIndex]?.year || "Default Year"}
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
        {films.map((film, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              className={classNames(
                "cursor-pointer hover:shadow-2xl transition-shadow duration-300",
                darkMode ? "hover:shadow-slate-500" : "hover:shadow-gray-900"
              )}
            >
              <CardMedia
                component="img"
                image={film.image}
                alt={film.title}
                className="h-[300px] object-cover"
              />
              <CardContent
                className={classNames(darkMode && "text-white bg-slate-900")}
              >
                <Typography variant="h6" className="font-bold mb-2">
                  {film.title}
                </Typography>
                <Typography variant="subtitle1" className="mb-1">
                  Đạo diễn: {film.director}
                </Typography>
                <Typography variant="subtitle2" className="mb-2">
                  Năm: {film.year}
                </Typography>
                <Button
                  variant={!darkMode ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleDetailsClick(film)}
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
          count={totalPages}
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
