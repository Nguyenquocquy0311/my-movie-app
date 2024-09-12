import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Tooltip, Pagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as EyeIcon } from '@mui/icons-material';
import EditFilmModal from '../composite/modal/film/Edit';
import DetailFilmModal from '../composite/modal/film/Detail';
import DeleteFilmModal from '../composite/modal/film/Delete';
import { Film } from '@/types/film';

const FilmTable: React.FC = () => {
  const [filmData, setFilmData] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const filmJson = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      image: "https://cdn1.tuoitre.vn/zoom/600_315/2020/7/21/inception-1595315649039828132546-crop-1598421344900180505336.jpg",
      url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      type: "phim-le",
      desc: "A thief who enters the dreams of others to steal secrets from their subconscious is given a chance to have his criminal history erased if he can successfully perform an inception.",
    },
    {
      id: 2,
      title: "The Matrix",
      director: "The Wachowskis",
      year: 1999,
      image: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/05/the-matrix-code-keanu-reeves.jpeg",
      url: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      type: "phim-le",
      desc: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    },
    {
      id: 3,
      title: "Hoang Hau Ki",
      director: "The Wachowskis",
      year: 2013,
      image: "https://cafebiz.cafebizcdn.vn/zoom/700_438/2019/photo1555246024808-1555246025460-crop-15552460986802135216582.jpg",
      url: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      type: "phim-bo",
      desc: "A historical drama that explores the complexities of royalty and power.",
    },
    {
      id: 4,
      title: "Interstellar",
      director: "Christopher Nolan",
      year: 2014,
      image: "https://images-na.ssl-images-amazon.com/images/I/91kFYg4fX3L._RI_.jpg",
      url: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      type: "phim-le",
      desc: "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      id: 5,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      year: 2008,
      image: "https://genk.mediacdn.vn/2018/7/23/photo-10-1532311789675586538196.jpeg",
      url: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      type: "phim-le",
      desc: "Batman raises the stakes in his war on crime. With the help of allies, he faces the challenge of his greatest adversary, the Joker.",
    },
    {
      id: 6,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      year: 1994,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9TJ99tG3oNIHyTlQ4cbEu-6Z4wEaFd3yOA&s",
      url: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
      type: "phim-le",
      desc: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
    {
      id: 7,
      title: "Fight Club",
      director: "David Fincher",
      year: 1999,
      image: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
      url: "https://www.youtube.com/watch?v=SUXWAEX2jlg",
      type: "phim-le",
      desc: "An insomniac office worker and a soap salesman build a global organization to help vent male aggression.",
    },
    {
      id: 8,
      title: "Avengers: Endgame",
      director: "Anthony and Joe Russo",
      year: 2019,
      image: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
      url: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      type: "tv-show",
      desc: "The Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    },
    {
      id: 9,
      title: "Forrest Gump",
      director: "Robert Zemeckis",
      year: 1994,
      image: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
      url: "https://www.youtube.com/watch?v=bLvqoHBptjg",
      type: "tv-show",
      desc: "The presidencies of Kennedy and Johnson, the Vietnam War, the civil rights movement, the events of 1960s through the 1980s from the perspective of an Alabama man with an IQ of 75.",
    },
    {
      id: 10,
      title: "Shawshank Redemption",
      director: "Frank Darabont",
      year: 1994,
      image: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
      url: "https://www.youtube.com/watch?v=6hB3S9bIaco",
      type: "tv-show",
      desc: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      id: 11,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: 1972,
      image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      url: "https://www.youtube.com/watch?v=sY1S34973zA",
      type: "phim-bo",
      desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    },
    {
      id: 12,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      director: "Peter Jackson",
      year: 2001,
      image: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/3/small_image/600x314/a134659ca47b28f7b266e1777fbf870f/1/2/1252477_fellowship.jpg",
      url: "https://www.youtube.com/watch?v=V75dMMIW2B4",
      type: "phim-bo",
      desc: "A young hobbit, Frodo Baggins, is recruited by the wizard Gandalf and a group of allies to help destroy the One Ring.",
    },
    {
      id: 13,
      title: "The Godfather: Part II",
      director: "Francis Ford Coppola",
      year: 1974,
      image: "https://upload.wikimedia.org/wikipedia/en/8/8c/Godfather_part_ii.jpg",
      url: "https://www.youtube.com/watch?v=q6chcy0di9s",
      type: "phim-bo",
      desc: "The continuation of the saga of the Corleone crime family, focusing on the young Vito Corleone and the struggles of his son Michael.",
    },
    {
      id: 14,
      title: "The Lord of the Rings: The Two Towers",
      director: "Peter Jackson",
      year: 2002,
      image: "https://cdn.shopify.com/s/files/1/0670/4794/products/the-lord-of-the-rings-the-two-towers-poster.jpg",
      url: "https://www.youtube.com/watch?v=LbfMDVcVgOU",
      type: "phim-bo",
      desc: "The second installment of the epic fantasy trilogy, following Frodo and Sam as they continue their journey to destroy the One Ring.",
    },
    {
      id: 15,
      title: "The Lord of the Rings: The Return of the King",
      director: "Peter Jackson",
      year: 2003,
      image: "https://upload.wikimedia.org/wikipedia/en/4/4e/Return_of_the_King.jpg",
      url: "https://www.youtube.com/watch?v=r5X-hFf6Bwo",
      type: "phim-bo",
      desc: "The final chapter of the Lord of the Rings trilogy, concluding the quest to destroy the One Ring and the battle to save Middle-earth.",
    }
];


  useEffect(() => {
    setFilmData(filmJson);
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;
  const pages = Math.ceil(filmData.length / rowsPerPage);
  const currentItems = filmData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleEditFilm = (film: Film) => {
    setSelectedFilm(film);
    setOpenEditModal(true);
  };

  const handleDetailFilm = (film: Film) => {
    setSelectedFilm(film);
    setOpenDetailModal(true);
  };

  const handleOpenDeleteModal = (film: Film) => {
    setSelectedFilm(film);
    setOpenDeleteModal(true);
  };

  const handleSaveFilm = (film: Film) => {
    setFilmData(filmData.map(f => f.id === film.id ? film : f));
  };

  const handleDeleteFilm = () => {
    if (selectedFilm) {
      setFilmData(filmData.filter(f => f.id !== selectedFilm.id));
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Có tất cả {filmData.length} bản ghi</h2>
        <Pagination
          count={pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>
      <TableContainer component={Paper} className='object-cover'>
        <Table>
          <TableHead>
            <TableRow className='bg-gray-200'>
              <TableCell align="center" className="font-bold">STT</TableCell>
              <TableCell align="center" className="font-bold">Tên</TableCell>
              <TableCell align="center" className="font-bold">Năm sản xuất</TableCell>
              <TableCell align="center" className="font-bold">Đạo diễn</TableCell>
              <TableCell align="center" className="font-bold">Link phim</TableCell>
              <TableCell align="center" className="font-bold">Hình ảnh</TableCell>
              <TableCell align="center" className="font-bold">Mô tả</TableCell>
              <TableCell align="center" className="font-bold">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((film, index) => (
              <TableRow key={film.id} className="hover:bg-gray-50">
                <TableCell align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell align="center" className="truncate max-w-20" title={film.title}>
                  {film.title}
                </TableCell>
                <TableCell align="center" className="truncate max-w-20" title={film.year}>
                  {film.year}
                </TableCell>
                <TableCell align="center" className="truncate max-w-20" title={film.director}>
                  {film.director}
                </TableCell>
                <TableCell align="center" className="truncate max-w-20" title={film.url}>
                  {film.url}
                </TableCell>
                <TableCell align="center" className='h-12'>
                  <img src={film.image} alt={film.title} className="w-10 h-10 object-cover rounded mx-auto" />
                </TableCell>
                <TableCell align="center" className="truncate max-w-20" title={film.desc}>
                  {film.desc}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Chi tiết">
                    <IconButton onClick={() => handleDetailFilm(film)} className='text-blue-500 hover:bg-blue-100'>
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chỉnh sửa">
                    <IconButton onClick={() => handleEditFilm(film)} className='hover:bg-slate-400'>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa" color="error">
                    <IconButton onClick={() => handleOpenDeleteModal(film)} className='text-red-500 hover:bg-red-100'>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedFilm && (
        <>
          <EditFilmModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            film={selectedFilm}
            onSave={handleSaveFilm}
          />
          <DetailFilmModal
            open={openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            film={selectedFilm}
          />
          <DeleteFilmModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onDelete={handleDeleteFilm}
          />
        </>
      )}
    </div>
  );
};

export default FilmTable;
