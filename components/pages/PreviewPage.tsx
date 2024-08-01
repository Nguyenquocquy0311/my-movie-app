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
import {current} from "immer";

export default function PreviewPage() {
  const { currentFilm } = useFilmContext();
  const router = useRouter();
  const { darkMode } = useDarkMode();
  let theloai = "Phim bộ";

  if (!currentFilm) {
    return <div>No film selected</div>;
  } else {
    if (currentFilm.type == "phim-le") theloai = "Phim lẻ";
    if (currentFilm.type == "tv-show") theloai = "TV Show";
    if (currentFilm.type == "anime") theloai = "Anime";
  }

  const handleWatchFilm = () => {
    router.push(`/movie/watch-movie/${currentFilm.id}`);
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
              {currentFilm.title}
            </Link>
          </Breadcrumbs>
        </div>
        <Box mb={4}>
          <Card className="flex flex-col md:flex-row">
            <CardMedia
              component="img"
              image={currentFilm.image}
              alt={currentFilm.title}
              className="md:w-1/3 h-auto"
            />
            <CardContent className="flex flex-col justify-between p-6 md:w-2/3">
              <div>
                <Typography variant="h5" className="mb-2 font-bold">
                  {currentFilm.title}
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Đạo diễn:</b> {currentFilm.director}
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Năm ra mắt:</b> {currentFilm.year}
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Thể loại:</b> {currentFilm.types?.join(", ")}
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Chất lượng:</b> HD
                </Typography>
                <Typography variant="subtitle2" className="mb-1">
                  <b>Phụ đề:</b> Vietsub
                </Typography>
                <Typography variant="subtitle1" className="mb-4">
                  <b>Nội dung:</b> {currentFilm.description}
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
