import React, { useState } from 'react';
import {IComic} from "types/IComic.type";
import ComicCard from './comicCard';
import { Grid } from '@mui/material';

interface ComicGridProps {
    comics: IComic[];
}

const ComicGrid: React.FC<ComicGridProps> = ({ comics }) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div style={{
            padding: '0 10%',
        }}>
            <Grid container spacing={2}>
                {Array.isArray(comics) && comics.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((comic) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={comic.id}>
                        <ComicCard comic={comic} />
                    </Grid>
                ))}
            </Grid>
         
        </div>
    );
};

export default ComicGrid;