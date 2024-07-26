import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface EditFilmModalProps {
  open: boolean;
  onClose: () => void;
  film: Film | null;
  onSave: (film: Film) => void;
}

const EditFilmModal: React.FC<EditFilmModalProps> = ({ open, onClose, film, onSave }) => {
  const [editedFilm, setEditedFilm] = useState<Film>(film || {
    id: 0,
    title: '',
    director: '',
    year: 0,
    view: 0,
    like: 0,
  });

  const handleSave = () => {
    onSave(editedFilm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chỉnh sửa thông tin phim</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên phim"
          fullWidth
          value={editedFilm.title}
          onChange={(e) => setEditedFilm({ ...editedFilm, title: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Đạo diễn"
          fullWidth
          value={editedFilm.director}
          onChange={(e) => setEditedFilm({ ...editedFilm, director: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Năm sản xuất"
          fullWidth
          type="number"
          value={editedFilm.year}
          onChange={(e) => setEditedFilm({ ...editedFilm, year: Number(e.target.value) })}
        />
        <TextField
          margin="dense"
          label="Lượt xem"
          fullWidth
          type="number"
          value={editedFilm.view}
          onChange={(e) => setEditedFilm({ ...editedFilm, view: Number(e.target.value) })}
        />
        <TextField
          margin="dense"
          label="Lượt thích"
          fullWidth
          type="number"
          value={editedFilm.like}
          onChange={(e) => setEditedFilm({ ...editedFilm, like: Number(e.target.value) })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Hủy</Button>
        <Button onClick={handleSave} color="primary">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFilmModal;
