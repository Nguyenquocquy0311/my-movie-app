import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Film } from "@/types/film";

interface AddFilmModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (film: Film) => void;
}

const AddFilmModal: React.FC<AddFilmModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [newFilm, setNewFilm] = useState<Film>({
    id: 0,
    title: "",
    director: "",
    year: 0,
    image: "",
    url: "",
    type: "",
    desc: "",
  });

  const handleSave = () => {
    onSave(newFilm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="rounded-md">
      <DialogTitle className="text-center font-bold">Thêm phim mới</DialogTitle>
      <DialogContent>
        <TextField
          focused
          margin="dense"
          label="Tên phim"
          fullWidth
          value={newFilm.title}
          onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Đạo diễn"
          fullWidth
          value={newFilm.director}
          onChange={(e) => setNewFilm({ ...newFilm, director: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Năm sản xuất"
          fullWidth
          type="number"
          value={newFilm.year}
          onChange={(e) =>
            setNewFilm({ ...newFilm, year: Number(e.target.value) })
          }
        />
        <TextField
          margin="dense"
          label="Ảnh nền"
          fullWidth
          value={newFilm.image}
          onChange={(e) =>
            setNewFilm({ ...newFilm, image: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Thể loại"
          fullWidth
          value={newFilm.type}
          onChange={(e) =>
            setNewFilm({ ...newFilm, type: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Link xem"
          fullWidth
          value={newFilm.url}
          onChange={(e) =>
            setNewFilm({ ...newFilm, url: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Nội dung"
          fullWidth
          value={newFilm.desc}
          onChange={(e) =>
            setNewFilm({ ...newFilm, desc: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFilmModal;
