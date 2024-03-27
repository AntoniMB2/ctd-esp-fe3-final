import React from "react";
import { Comic } from "./types";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

interface ComicCardProps {
 comic: Comic;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
 return (
  <Card
   sx={{
    maxWidth: 345,
    height: "100%",
    display: "flex",
    flexDirection: "column",
   }}
  >
   <Box
    component="img"
    alt={comic.title}
    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
    sx={{
     boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
     margin: "1px",
     width: "100%", // La imagen ocupará exactamente el 90% del ancho de la tarjeta
     height: "60%", // La imagen ocupará exactamente el 90% de la altura de la tarjeta
    }}
   />
   <CardContent sx={{ mt: "auto" }}>
    <Typography variant="h5" component="div">
     {comic.title}
    </Typography>

    <Box sx={{ display: "flex", justifyContent: "space-between", '& > button': { flexGrow: 0.6, maxWidth: '40%', marginTop: '20px' }}}>
    <Button variant="contained" size="small">Comprar</Button>
    <Button variant="contained" size="small">Ver detalle</Button>
</Box>
   </CardContent>
  </Card>
 );
};

export default ComicCard;

