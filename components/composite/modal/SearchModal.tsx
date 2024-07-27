import React from "react";
import { Dialog, DialogContent, Input } from "@mui/material";
import { useSearchModal } from "../../../context/SearchContext";
import { useDarkMode } from "../../../context/darkModeContext";
import classNames from "classnames";
import { SearchOutlined } from "@mui/icons-material";

const SearchModal = () => {
  const { open, setOpen } = useSearchModal();

  const handleClose = () => {
    setOpen(false);
  };

  const { darkMode } = useDarkMode();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent className={classNames(darkMode && "bg-slate-800", "flex")}>
        <Input
          placeholder="Tìm kiếm phim ..."
          fullWidth
          className={classNames("font-bold", darkMode && "text-white")}
        />
        <SearchOutlined
          className={classNames(
            "ml-4 cursor-pointer hover:text-slate-500",
            darkMode && "text-white"
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
