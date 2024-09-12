import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { Film } from '@/types/film';

interface DeleteFilmModalProps {
  open: boolean;
  onClose: () => void;
  film: Film | null;
  onDelete: () => void;
}

const DeleteFilmModal: React.FC<DeleteFilmModalProps> = ({ open, onClose, film, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/films/${film?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success('Phim đã được xóa thành công!');
      onDelete();
      onClose(); 
    } catch (error) {
      toast.error('Lỗi khi xóa phim!');
      console.error('Failed to delete film:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <p>Bạn có chắc chắn muốn xóa phim này không?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Hủy</Button>
        <Button onClick={handleDelete} color="secondary" className='text-red-500'>Xóa</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFilmModal;
