import React from 'react';
import { Comic } from './types';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface ComicCardProps {
    comic: Comic;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
                component="img"
                alt={comic.title}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                sx={{
                    boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
                    margin: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                }}
            />
            <CardContent sx={{ mt: 'auto' }}>
                <Typography variant="h5" component="div">
                    {comic.title}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained">Comprar</Button>
                    <Button variant="contained">Ver detalle</Button>
                </Box>
               
            </CardContent>
        </Card>
    );
};

export default ComicCard;