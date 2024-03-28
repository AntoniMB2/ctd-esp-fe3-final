import React, { useState,useEffect } from "react";
import { Button,Box } from "@mui/material";
interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
    
    const handlePrevious = () => {
      onPageChange(Math.max(1, currentPage - 1)); // No permite ir por debajo de la página 1
    };
    
    const handleNext = () => {
      onPageChange(currentPage + 1);
    };

 return (
<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "30px 0px" }}>
   <Button variant="contained" onClick={handlePrevious}>
    Anterior
   </Button>
   <Button variant="contained" onClick={handleNext} sx={{ marginLeft: '20px' }}>
    Siguiente
   </Button>
</Box>
 );
};

export default Pagination;
