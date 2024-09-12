import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Tooltip, Pagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as EyeIcon } from '@mui/icons-material';
import EditUserModal from '../modal/user/Edit';
import DetailUserModal from '../modal/user/Detail';
import DeleteUserModal from '../modal/user/Delete';
import { User } from '@/types/user';

const UserTable: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const userJson: User[] = [
    {
      id: 1,
      name: "Alice",
      username: "alice123",
      role: "Admin",
    },
    {
      id: 2,
      name: "Bob",
      username: "bob456",
      role: "User",
    },
    {
      id: 3,
      name: "Charlie",
      username: "charlie789",
      role: "User",
    },
    {
      id: 4,
      name: "Diana",
      username: "diana101",
      role: "User",
    },
  ];

  // useEffect(() => {
  //   fetch('api/users')
  //     .then(response => response.json())
  //     .then(data => {
  //       setUserData(data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching user data: ", error);
  //     });
  // }, []);

  useEffect(() => {
    setUserData(userJson);
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(userData.length / rowsPerPage);
  const currentItems = userData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDetailUser = (user: User) => {
    setSelectedUser(user);
    setOpenDetailModal(true);
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUserData(userData.filter(u => u.id !== selectedUser.id));
    }
    setOpenDeleteModal(false);
  };

  const handleSaveUser = (user: User) => {
    setUserData(userData.map(u => u.id === user.id ? user : u));
  };


  return (
    <div className="mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2>Có tất cả {userData.length} bản ghi</h2>
        <Pagination
          count={pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='bg-slate-300'>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Vai trò</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Details">
                    <IconButton onClick={() => handleDetailUser(user)} className='text-blue-500'>
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditUser(user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" color="error">
                    <IconButton onClick={() => handleOpenDeleteModal(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals */}
      {selectedUser && (
        <>
          <EditUserModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            user={selectedUser}
            onSave={handleSaveUser}
          />
          <DetailUserModal
            open={openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            user={selectedUser}
          />
          <DeleteUserModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onDelete={handleDeleteUser}
            user={selectedUser}
          />
        </>
      )}
    </div>
  );
};

export default UserTable;
