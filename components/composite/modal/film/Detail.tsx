import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from '@mui/material';
import { Film } from '@/types/film';

interface DetailFilmModalProps {
  open: boolean;
  onClose: () => void;
  film: Film | null;
}

const DetailFilmModal: React.FC<DetailFilmModalProps> = ({ open, onClose, film }) => {
  if (!film) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className='text-center text-[24px] font-bold'>
        Chi tiết phim
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-shrink-0 md:w-1/3">
            <img
              src={film.image}
              alt={film.title}
              className="w-48 h-48 mx-auto rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow">
            <Typography variant="h6" component="div" className="mb-2">
              <strong>Tên phim:</strong> {film.title}
            </Typography>
            <Typography variant="body1" component="div" className="my-1">
              <strong>Đạo diễn:</strong> {film.director}
            </Typography>
            <Typography variant="body1" component="div" className="my-1">
              <strong>Năm sản xuất:</strong> {film.year}
            </Typography>
            <Typography variant="body1" component="div" className="my-1">
              <strong>Thể loại:</strong> {film.type}
            </Typography>
            <Typography variant="body1" component="div" className="my-1">
              <strong>Mô tả:</strong> {film.desc}
            </Typography>
            <Typography variant="body1" component="div" className="my-1">
              <strong>Ảnh nền:</strong> {film.image}
            </Typography>
            <Typography variant="body1" component="div" className="my-1">
              <strong>Link xem:</strong> <a href={film.url} target="_blank" rel="noopener noreferrer">{film.url}</a>
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" className='mx-auto'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailFilmModal;
