import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Tooltip, Pagination } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import DeleteFeedbackModal from '../composite/modal/feedback/Delete';

interface Feedback {
  id: number;
  userName: string;
  content: string;
  classification: 'Normal' | 'Dirty';
}

const FeedbackTable: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const feedbackJson: Feedback[] = [
    {
      id: 1,
      userName: "Alice",
      content: "Great movie!",
      classification: "Normal"
    },
    {
      id: 2,
      userName: "Bob",
      content: "The movie was okay.",
      classification: "Normal"
    },
    {
      id: 3,
      userName: "Charlie",
      content: "Not good, could be better.",
      classification: "Dirty"
    },
    {
      id: 4,
      userName: "Diana",
      content: "I did not like the movie.",
      classification: "Dirty"
    },
  ];

  useEffect(() => {
    setFeedbackData(feedbackJson);
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(feedbackData.length / rowsPerPage);
  const currentItems = feedbackData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleOpenDeleteModal = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setOpenDeleteModal(true);
  };

  const handleDeleteFeedback = () => {
    if (selectedFeedback) {
      setFeedbackData(feedbackData.filter(f => f.id !== selectedFeedback.id));
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2>Có tất cả {feedbackData.length} bản ghi</h2>
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
              <TableCell align="center">Người feedback</TableCell>
              <TableCell align="center">Nội dung</TableCell>
              <TableCell align="center">Phân loại</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell align="center">{(page - 1) * rowsPerPage + feedback.id}</TableCell>
                <TableCell align="center">{feedback.userName}</TableCell>
                <TableCell align="center">{feedback.content}</TableCell>
                <TableCell align="center">{feedback.classification}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete" color="error">
                    <IconButton onClick={() => handleOpenDeleteModal(feedback)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedFeedback && (
        <DeleteFeedbackModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onDelete={handleDeleteFeedback}
        />
      )}
    </div>
  );
};

export default FeedbackTable;
