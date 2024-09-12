import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { User } from '@/types/user';
import { toast } from 'react-toastify';

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  user: User | null;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, onClose, user, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/films/${user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success('Người đã được xóa thành công!');
      onDelete();
      onClose(); 
    } catch (error) {
      toast.error('Lỗi khi xóa người dùng!');
      console.error('Failed to delete film:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Hủy</Button>
        <Button onClick={handleDelete} color="secondary">Xóa</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;
