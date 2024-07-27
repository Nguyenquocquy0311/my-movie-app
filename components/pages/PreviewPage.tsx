import React from 'react';
import { useRouter } from 'next/router';
import { useFilmContext } from '../../context/FilmContext';
import Header from '../common/header/Header';
import Footer from '../common/footer';
import classNames from 'classnames';
import { useDarkMode } from '../../context/darkModeContext';
import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Home, Mediation } from '@mui/icons-material';

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
        <div className='pb-6 pt-2'>
          <Breadcrumbs aria-label="breadcrumb" className={classNames(darkMode ? 'text-slate-100' : 'text-slate-700')}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/"
            >
              <Home sx={{ mr: 0.5 }}/>
              Trang chủ
            </Link>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/movie"
            >
              <Mediation sx={{ mr: 0.5 }} />
              {currentFilm.title}
            </Link>
          </Breadcrumbs>
        </div>
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
              <Typography variant="subtitle2">Chất lượng: HD</Typography>
              <Typography variant="subtitle2">Phụ đề: Vietsub</Typography>
              <Button variant={!darkMode ? "contained" : "outlined"} onClick={handleWatchFilm}>Xem phim</Button>
            </CardContent>
          </Card>
        </Box>
      </div>
      <Footer />
    </div>
  );
}
