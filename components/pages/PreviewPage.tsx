import React from 'react';
import { useRouter } from 'next/router';
import { useFilmContext } from '@/context/FilmContext';
import Header from '../common/header/Header';
import Footer from '../common/footer';
import classNames from 'classnames';
import { useDarkMode } from '@/context/darkModeContext';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function PreviewPage() {
  const { currentFilm } = useFilmContext();
  const router = useRouter();
  const { darkMode } = useDarkMode();

  if (!currentFilm) {
    return <div>No film selected</div>;
  }

  const handleWatchFilm = () => {
    router.push('/movie/watch-movie');
  };

  return (
    <div className={classNames(darkMode ? 'bg-slate-800' : 'bg-white')}>
      <Header />
      <div className="pt-24 px-24">
        <Box mb={4}>
            <Card>
              <CardMedia
                component="img"
                image={currentFilm.image}
                alt={currentFilm.title}
                className='h-[600px]'
              />
              <CardContent>
                <Typography variant="h5">{currentFilm.title}</Typography>
                <Typography variant="subtitle1">Đạo diễn: {currentFilm.director}</Typography>
              <Typography variant="subtitle2">Năm ra mắt: {currentFilm.year}</Typography>
              <Typography variant="subtitle2">Thể loại: {currentFilm.type}</Typography>
                <Button variant={!darkMode ? "contained" : "outlined"} onClick={handleWatchFilm}>Xem phim</Button>
              </CardContent>
            </Card>
        </Box>
      </div>
      <Footer />
    </div>
  );
}
