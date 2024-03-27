import {
 Accordion,
 AccordionSummary,
 AccordionDetails,
 Box,
 Button,
 Typography,
 Card,
 CardContent,
 CardMedia,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NextLink from "next/link";
import React, { FC } from "react";
import { IComic } from "types/IComic.type";

interface Props {
 comic: IComic;
}

export const ComicDetailsInfo: FC<Props> = ({ comic }) => {
 return (
  <Card style={{ width: "450px" }}>
   <CardContent>
    <h2 style={{ color: "red" }}>Comic:</h2>
    <Typography variant="h5" style={{ margin: "5px 0px" }}>
     {comic.title}
    </Typography>
    <Typography variant="h6">Precio: ${comic.prices[0]?.price}</Typography>
    <Typography variant="body2" color="text.secondary">
     Precio anterior:{" $"}
     {comic.prices[0]?.price
      ? Number((comic.prices[0]?.price * 0.9).toFixed(2))
      : 0}
    </Typography>
    <Typography variant="h6" style={{ margin: "5px 0px" }}>
     Disponible: {comic.creators.available + " Unidades"}
    </Typography>

    <Typography
     variant="body2"
     color="text.secondary"
     style={{ width: "100%" }}
    >
     {comic.textObjects && comic.textObjects[0]
      ? comic.textObjects[0].text
      : "No hay descripción"}
    </Typography>

    <Accordion>
     <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
     >
      <Typography>Personajes</Typography>
     </AccordionSummary>
     <AccordionDetails>
      {comic.characters.items.length > 0 ? (
       comic.characters.items.map((character) => (
        <NextLink
         href={`/personajes/${character.resourceURI.split("/").pop()}`}
         key={character.name}
        >
         <Button fullWidth size="small" color="primary">
          {character.name}
         </Button>
        </NextLink>
       ))
      ) : (
       <Typography>No hay personajes</Typography>
      )}
     </AccordionDetails>
    </Accordion>
   </CardContent>
   <Button variant="contained" color="primary" disabled={!comic} fullWidth>
    {comic ? "Comprar" : "Sin stock disponible"}
   </Button>
  </Card>
 );
};

export default ComicDetailsInfo;
