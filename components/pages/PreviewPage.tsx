import React from "react";
import { useRouter } from "next/router";
import { useFilmContext } from "../../context/FilmContext";
import Header from "../common/header/Header";
import Footer from "../common/Footer";
import classNames from "classnames";
import { useDarkMode } from "../../context/darkModeContext";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { Home, Movie } from "@mui/icons-material";

export default function PreviewPage() {
  const { currentFilm } = useFilmContext();
  const router = useRouter();
  const { darkMode } = useDarkMode();

  const handleWatchFilm = () => {
    router.push(`/movie/${currentFilm?.title}`);
  };

  const getGenreNames = (genreIds: number[]) => {
    const genres = [
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Science Fiction" },
      { id: 80, name: "Crime" },
      { id: 53, name: "Thriller" },
      { id: 27, name: "Horror" },
      { id: 16, name: "Animation" },
      { id: 10751, name: "Family" },
      { id: 12, name: "Adventure" },
    ];
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name) => name)
      .join(", ");
  };

  return (
    <div
      className={classNames(
        darkMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-800"
      )}
    >
      <Header />
      <div className="pt-24 px-24">
        <div className="pb-6 pt-2">
          <Breadcrumbs
            aria-label="breadcrumb"
            className={classNames(
              darkMode ? "text-slate-100" : "text-slate-700"
            )}
          >
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <Home sx={{ mr: 0.5 }} />
              Trang chủ
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
            >
              <Movie sx={{ mr: 0.5 }} />
              {currentFilm?.title}
            </Link>
          </Breadcrumbs>
        </div>
        <Box mb={4}>
          <Card className={classNames(darkMode && 'bg-slate-900 text-white', "flex flex-col md:flex-row")}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/original${currentFilm?.poster_path}`}
              alt={currentFilm?.title}
              className="md:w-1/3 h-auto"
            />
            <CardContent className="flex flex-col justify-between p-6 md:w-2/3">
              <div>
                <Typography variant="h5" className="mb-2 font-bold">
                  {currentFilm?.title}
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Năm ra mắt:</b> {currentFilm?.release_date}
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Thể loại:</b> {getGenreNames(currentFilm?.genre_ids || [])}
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Chất lượng:</b> HD
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Phụ đề:</b> Vietsub
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Lượt đánh giá:</b> {currentFilm?.vote_average} (
                  {currentFilm?.vote_count} lượt)
                </Typography>
                <Typography variant="subtitle1" className="mb-4">
                  <b>Giới thiệu:</b> {currentFilm?.overview}
                </Typography>
              </div>
              <Button
                variant={!darkMode ? "contained" : "outlined"}
                onClick={handleWatchFilm}
                className="self-start"
              >
                Xem phim
              </Button>
            </CardContent>
          </Card>
        </Box>
      </div>
      <Footer />
    </div>
  );
}
