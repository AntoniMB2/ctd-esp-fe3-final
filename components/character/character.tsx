/* import {
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
import { ICharacter } from "types/ICharacter.type";

interface Props {
  character: ICharacter;
}

export const CharacterDetailsInfo: FC<Props> = ({ character }) => {
  return (
    <Card style={{ width: "450px" }}>
      <CardContent>
        <h2 style={{ color: "red" }}>Personaje:</h2>
        <Typography variant="h5" style={{ margin: "5px 0px" }}>
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.description || "No hay descripción"}
        </Typography>
        <CardMedia
          component="img"
          image={character.thumbnail.path + '.' + character.thumbnail.extension}
          alt={character.name}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Cómics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {character.comics.items.length > 0 ? (
              character.comics.items.map((comic) => (
                <NextLink
                  href={`/comics/${comic.resourceURI.split("/").pop()}`}
                  key={comic.name}
                >
                  <Button fullWidth size="small" color="primary">
                    {comic.name}
                  </Button>
                </NextLink>
              ))
            ) : (
              <Typography>No hay cómics</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CharacterDetailsInfo; */