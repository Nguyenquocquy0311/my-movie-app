import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { User } from '@/types/user';
import { toast } from 'react-toastify';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState<User>(user || {
    id: 0,
    name: '',
    username: '',
    role: '',
  });

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/films${user ? user.id : editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onSave(editedUser);
      toast.success('Cập nhật thông tin người thành công !!!')
      onClose();
    } catch (error) {
      console.error('Failed to save film:', error);
      toast.error('Đã có lỗi xảy ra khi cập nhật người dùng !!!')
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cập nhật người dùng</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên"
          fullWidth
          value={editedUser.name}
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Username"
          fullWidth
          value={editedUser.username}
          onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Vai trò"
          fullWidth
          value={editedUser.role}
          onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant='outlined'>Hủy</Button>
        <Button onClick={handleSave} color="primary" variant='contained'>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
