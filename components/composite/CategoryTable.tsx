import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Tooltip, Pagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as EyeIcon } from '@mui/icons-material';
import EditCategoryModal from '../composite/modal/category/Edit';
import DetailCategoryModal from '../composite/modal/category/Detail';
import DeleteCategoryModal from '../composite/modal/category/Delete';

interface Category {
  name: string;
  description: string;
  itemCount: number;
}

const CategoryTable: React.FC = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const categoryJson: Category[] = [
    {
      name: "Action",
      description: "Action-packed movies with thrilling scenes",
      itemCount: 120
    },
    {
      name: "Comedy",
      description: "Light-hearted movies to make you laugh",
      itemCount: 80
    },
    {
      name: "Drama",
      description: "Movies that focus on emotional storytelling",
      itemCount: 100
    },
    {
      name: "Horror",
      description: "Movies designed to frighten and scare",
      itemCount: 70
    },
    {
      name: "Romance",
      description: "Movies centered around love and relationships",
      itemCount: 90
    },
  ];

  useEffect(() => {
    setCategoryData(categoryJson);
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(categoryData.length / rowsPerPage);
  const currentItems = categoryData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenEditModal(true);
  };

  const handleDetailCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenDetailModal(true);
  };

  const handleOpenDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const handleSaveCategory = (category: Category) => {
    setCategoryData(categoryData.map(c => c.name === category.name ? category : c));
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategoryData(categoryData.filter(c => c.name !== selectedCategory.name));
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2>Có tất cả {categoryData.length} bản ghi</h2>
        <Pagination
          count={pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="secondary"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='bg-slate-300'>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Mô tả</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((category, index) => (
              <TableRow key={index}>
                <TableCell align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">{category.description}</TableCell>
                <TableCell align="center">{category.itemCount}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Chi tiết">
                    <IconButton onClick={() => handleDetailCategory(category)} className='text-blue-500'>
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chỉnh sửa">
                    <IconButton onClick={() => handleEditCategory(category)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa" color="error">
                    <IconButton onClick={() => handleOpenDeleteModal(category)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCategory && (
        <>
          <EditCategoryModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            category={selectedCategory}
            onSave={handleSaveCategory}
          />
          <DetailCategoryModal
            open={openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            category={selectedCategory}
          />
          <DeleteCategoryModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onDelete={handleDeleteCategory}
          />
        </>
      )}
    </div>
  );
};

export default CategoryTable;
