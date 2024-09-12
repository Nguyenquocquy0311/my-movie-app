import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from '@mui/material';
import { Film } from '@/types/film';

interface DetailFilmModalProps {
  open: boolean;
  onClose: () => void;
  film: Film | null;
}

const formatFilmType = (type: string) => {
  const typeMap: Record<string, string> = {
    'phim-le': 'Phim lẻ',
    'phim-bo': 'Phim bộ',
    'anime': 'Anime',
    'tv-show': 'TV Show',
  };
  
  return typeMap[type] || type;
};

const DetailFilmModal: React.FC<DetailFilmModalProps> = ({ open, onClose, film }) => {
  if (!film) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className='text-center text-[24px] font-bold'>Chi tiết phim</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          <strong>Tên phim:</strong> {film.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Đạo diễn:</strong> {film.director}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Năm sản xuất:</strong> {film.year}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Thể loại:</strong> {film.type && formatFilmType(film.type)}
        </Typography>
        {film.image && (
          <div style={{ margin: '16px 0', textAlign: 'center' }}>
            <img src={film.image} alt={film.title} className='w-96 mx-auto rounded-md' />
          </div>
        )}
        <Typography variant="body1" gutterBottom>
          <strong>Mô tả:</strong> {film.desc}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Link xem:</strong> <a href={film.url} target="_blank" rel="noopener noreferrer">{film.url}</a>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailFilmModal;
