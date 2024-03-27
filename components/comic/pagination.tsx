import React, { useState,useEffect } from "react";
import { Button,Box } from "@mui/material";
interface PaginationProps {
 onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      onPageChange(currentPage);
    }, [currentPage, onPageChange]);
    
    const handlePrevious = () => {
      setCurrentPage((prevPage) => Math.max(1, prevPage - 1)); // No permite ir por debajo de la página 1
    };
    
    const handleNext = () => {
      setCurrentPage((prevPage) => prevPage + 1);
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
