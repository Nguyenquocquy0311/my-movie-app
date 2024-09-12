import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Film } from '@/types/film';
import { toast } from 'react-toastify';

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
    image: '',
    url: '',
    type: '',
    desc: '',
  });

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/films${film ? film.id : editedFilm.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFilm),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onSave(editedFilm);
      toast.success('Cập nhật thông tin phim thành công !!!')
      onClose();
    } catch (error) {
      console.error('Failed to save film:', error);
      toast.error('Đã có lỗi xảy ra khi cập nhật phim !!!')
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className='text-center text-[24px] font-bold'>Chỉnh sửa thông tin phim</DialogTitle>
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
          label="Ảnh bìa"
          fullWidth
          value={editedFilm.image}
          onChange={(e) => setEditedFilm({ ...editedFilm, image: e.target.value })}
        />
        <TextField
          margin="dense"
          label="URL"
          fullWidth
          value={editedFilm.url}
          onChange={(e) => setEditedFilm({ ...editedFilm, url: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Thể loại"
          fullWidth
          value={editedFilm.type}
          onChange={(e) => setEditedFilm({ ...editedFilm, type: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Mô tả"
          fullWidth
          multiline
          rows={4}
          value={editedFilm.desc}
          onChange={(e) => setEditedFilm({ ...editedFilm, desc: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant='outlined'>Hủy</Button>
        <Button onClick={handleSave} color="primary" variant='contained'>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFilmModal;
