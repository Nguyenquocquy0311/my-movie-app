import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Button, Card, CardContent, CardMedia, Grid, Typography, Box, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { getDarkMode } from '@/slices/redux';
import { useFilmType } from '@/context/filmTypeContext';
import { useDarkMode } from '@/context/darkModeContext';
import { useFilmContext } from '@/context/FilmContext';
import { useRouter } from 'next/router';

interface Film {
  title: string;
  director: string;
  year: number;
  image: string;
  url: string;
  type: string
}

const ListFilm = () => {
  const filmJson = [
    {
      "title": "Inception",
      "director": "Christopher Nolan",
      "year": 2010,
      "image": "https://cdn1.tuoitre.vn/zoom/600_315/2020/7/21/inception-1595315649039828132546-crop-1598421344900180505336.jpg",
      "url": "https://www.youtube.com/watch?v=YoHD9XEInc0",
      "type": "phim-le"
    },
    {
      "title": "The Matrix",
      "director": "The Wachowskis",
      "year": 1999,
      "image": "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/05/the-matrix-code-keanu-reeves.jpeg",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "type": "phim-le"
    },
    {
      "title": "Hoang Hau Ki",
      "director": "The Wachowskis",
      "year": 2013,
      "image": "https://cafebiz.cafebizcdn.vn/zoom/700_438/2019/photo1555246024808-1555246025460-crop-15552460986802135216582.jpg",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "type": "phim-bo"
    },
    {
      "title": "Interstellar",
      "director": "Christopher Nolan",
      "year": 2014,
      "image": "https://images-na.ssl-images-amazon.com/images/I/91kFYg4fX3L._RI_.jpg",
      "url": "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      "type": "phim-le"
    },
    {
      "title": "The Dark Knight",
      "director": "Christopher Nolan",
      "year": 2008,
      "image": "https://genk.mediacdn.vn/2018/7/23/photo-10-1532311789675586538196.jpeg",
      "url": "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      "type": "phim-le"
    },
    {
      "title": "Pulp Fiction",
      "director": "Quentin Tarantino",
      "year": 1994,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9TJ99tG3oNIHyTlQ4cbEu-6Z4wEaFd3yOA&s",
      "url": "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
      "type": "phim-le"
    },
    {
      "title": "Fight Club",
      "director": "David Fincher",
      "year": 1999,
      "image": "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
      "url": "https://www.youtube.com/watch?v=SUXWAEX2jlg",
      "type": "phim-le"
    },
    {
      "title": "Avengers: Endgame",
      "director": "Anthony and Joe Russo",
      "year": 2019,
      "image": "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
      "url": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      "type": "tv-show"
    },
    {
      "title": "Forrest Gump",
      "director": "Robert Zemeckis",
      "year": 1994,
      "image": "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
      "url": "https://www.youtube.com/watch?v=bLvqoHBptjg",
      "type": "tv-show"
    },
    {
      "title": "The Shawshank Redemption",
      "director": "Frank Darabont",
      "year": 1994,
      "image": "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
      "url": "https://www.youtube.com/watch?v=6hB3S9bIaco",
      "type": "tv-show"
    },
    {
      "title": "The Godfather",
      "director": "Francis Ford Coppola",
      "year": 1972,
      "image": "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      "url": "https://www.youtube.com/watch?v=sY1S34973zA",
      "type": "phim-bo"
    },
    {
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "director": "Peter Jackson",
      "year": 2001,
      "image": "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/3/small_image/600x314/a134659ca47b28f7b266e1777fbf870f/1/2/1252477_fellowship.jpg",
      "url": "https://www.youtube.com/watch?v=V75dMMIW2B4",
      "type": "phim-le"
    },
    {
      "title": "Avengers: Endgame",
      "director": "Anthony and Joe Russo",
      "year": 2019,
      "image": "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
      "url": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      "type": "phim-bo"
    },
    {
      "title": "Star Wars: Episode IV - A New Hope",
      "director": "George Lucas",
      "year": 1977,
      "image": "https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg",
      "url": "https://www.youtube.com/watch?v=1g3_CFmnU7k",
      "type": "phim-le"
    },
    {
      "title": "Avengers: Endgame",
      "director": "Anthony and Joe Russo",
      "year": 2019,
      "image": "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
      "url": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      "type": "phim-bo"
    }
  ];

  const [films, setFilms] = useState<Film[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const filmsPerPage = 8;
  const { darkMode } = useDarkMode();
  const { filmType } = useFilmType();
  const { setCurrentFilm } = useFilmContext();
  const router = useRouter();

  useEffect(() => {
    const type = filmType;
    if (type) {
      const filteredFilms = filmJson.filter(film => film.type.includes(type));
      setFilms(filteredFilms);
    } else {
      setFilms(filmJson);
    }
    setPage(1);
  }, [filmType]);

  useEffect(() => {
    if (films.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % films.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [films]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedFilms = films.slice((page - 1) * filmsPerPage, page * filmsPerPage);

  const handleDetailsClick = (film: Film) => {
    setCurrentFilm(film);
    router.push('/movie');
  };

  return (
    <div className='px-24 mt-4 pb-8'>
      {/* Section 1: Slider */}
      <div className='border-b-[1px] border-slate-500'>
        <Box mb={4}>
          {films.length > 0 && (
            <Card>
              <CardMedia
                component="img"
                image={films[currentIndex]?.image || 'default-image-url'}
                alt={films[currentIndex]?.title || 'Default Title'}
                className='h-[600px]'
              />
              <CardContent>
                <Typography variant="h5">{films[currentIndex]?.title || 'Default Title'}</Typography>
                <Typography variant="subtitle1">{films[currentIndex]?.director || 'Default Director'}</Typography>
                <Typography variant="subtitle2">{films[currentIndex]?.year || 'Default Year'}</Typography>
                <Button className='z-0' variant="contained" color="primary" onClick={() => handleDetailsClick(films[currentIndex])}>
                  Chi tiết
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>
      </div>

      {/* Section 2: Grid */}
      <p className='text-[32px] text-blue-600 pb-6'>Phim nổi bật</p>
      <Grid container spacing={4}>
        {paginatedFilms.map((film, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={classNames('cursor-pointer hover:shadow-2xl h-[450px]', darkMode ? 'hover:shadow-slate-500' : 'hover:shadow-gray-900')}>
              <CardMedia
                component="img"
                image={film.image}
                alt={film.title}
                className='h-[300px]'
              />
              <CardContent>
                <Typography variant="h6">{film.title}</Typography>
                <Typography variant="subtitle1">{film.director}</Typography>
                <Typography variant="subtitle2">{film.year}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleDetailsClick(film)}>
                  Chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center" className={classNames(darkMode ? 'text-white' : '')}>
        <Pagination
          count={Math.ceil(films.length / filmsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '.MuiPaginationItem-root': {
              color: darkMode ? 'white' : 'black',
              '&.Mui-selected': {
                backgroundColor: darkMode ? '#3f51b5' : '#1976d2',
                color: 'white'
              }
            }
          }}
        />
      </Box>
    </div>
  );
};

export default ListFilm;