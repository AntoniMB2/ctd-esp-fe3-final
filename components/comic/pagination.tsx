import React, { useState } from "react";
import { Button,Box } from "@mui/material";
interface PaginationProps {
 onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
 const [currentPage, setCurrentPage] = useState(1);

 const handlePrevious = () => {
  setCurrentPage((prevPage) => prevPage - 1);
  onPageChange(currentPage - 1);
 };

 const handleNext = () => {
  setCurrentPage((prevPage) => prevPage + 1);
  onPageChange(currentPage + 1);
 };

 return (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
   <Button variant="contained" onClick={handlePrevious}>
    Anterior
   </Button>
   <Button variant="contained" onClick={handleNext}>
    Siguiente
   </Button>
  </Box>
 );
};

export default Pagination;
