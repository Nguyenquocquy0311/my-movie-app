import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Tooltip, Pagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as EyeIcon } from '@mui/icons-material';
import EditFilmModal from '../composite/modal/film/Edit';
import DetailFilmModal from '../composite/modal/film/Detail';
import DeleteFilmModal from '../composite/modal/film/Delete';

interface Film {
  id: number;
  title: string;
  director: string;
  year: number;
  view: number;
  like: number;
}

const FilmTable: React.FC = () => {
  const [filmData, setFilmData] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const filmJson = [
    {
      "id": 1,
      "title": "Inception",
      "director": "Christopher Nolan",
      "year": 2010,
      "view": 150,
      "like": 100
    },
    {
      "id": 2,
      "title": "Mai",
      "director": "The Wachowskis",
      "year": 1999,
      "view": 2500,
      "like": 1000
    },
    {
      "id": 3,
      "title": "Ve nha di con",
      "director": "The Wachowskis",
      "year": 2013,
      "view": 1500,
      "like": 400
    },
    {
      "id": 4,
      "title": "Bo Gia",
      "director": "Tran Thanh",
      "year": 2021,
      "view": 1500,
      "like": 400
    },
    {
      "id": 5,
      "title": "Hoang Hau Ki",
      "director": "The Wachowskis",
      "year": 2013,
      "view": 1500,
      "like": 400
    },
    {
      "id": 6,
      "title": "Secret Home",
      "director": "The Wachowskis",
      "year": 2013,
      "view": 1500,
      "like": 400
    },
    {
      "id": 7,
      "title": "Nha ba Nu",
      "director": "Tran Thanh",
      "year": 2022,
      "view": 1500,
      "like": 400
    },
    {
      "id": 8,
      "title": "Nha ba Nu",
      "director": "Tran Thanh",
      "year": 2022,
      "view": 1500,
      "like": 400
    },
    {
      "id": 9,
      "title": "Nha ba Nu",
      "director": "Tran Thanh",
      "year": 2022,
      "view": 1500,
      "like": 400
    },
    {
      "id": 10,
      "title": "Nha ba Nu",
      "director": "Tran Thanh",
      "year": 2022,
      "view": 1500,
      "like": 400
    },
    {
      "id": 11,
      "title": "Nha ba Nu",
      "director": "Tran Thanh",
      "year": 2022,
      "view": 1500,
      "like": 400
    },
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
        <h2>Có tất cả {filmData.length} bản ghi</h2>
        <Pagination
          count={pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='bg-slate-300'>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Năm sản xuất</TableCell>
              <TableCell align="center">Đạo diễn</TableCell>
              <TableCell align="center">Lượt xem</TableCell>
              <TableCell align="center">Lượt thích</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((film, index) => (
              <TableRow key={film.id}>
                <TableCell align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell align="center">{film.title}</TableCell>
                <TableCell align="center">{film.year}</TableCell>
                <TableCell align="center">{film.director}</TableCell>
                <TableCell align="center">{film.view}</TableCell>
                <TableCell align="center">{film.like}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Chi tiết">
                    <IconButton onClick={() => handleDetailFilm(film)} className='text-blue-500'>
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chỉnh sửa">
                    <IconButton onClick={() => handleEditFilm(film)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa" color="error">
                    <IconButton onClick={() => handleOpenDeleteModal(film)}>
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
