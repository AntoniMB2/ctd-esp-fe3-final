import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutCheckout from "components/layouts/layout-checkout";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const ConfirmationPage: React.FC = () => {
 const router = useRouter();

 type Comic = {
  nombre: string;
  imagen: string;
  precio: string;
 };

 const [comic, setComic] = useState<Comic>({
  nombre: "",
  imagen: "",
  precio: "",
 });

 useEffect(() => {
  const storedComic = localStorage.getItem("comic");
  if (storedComic) {
   setComic(JSON.parse(storedComic));
  }
 }, []);

 
 return (
  <LayoutCheckout>
   <Grid
    item
    xs={12}
    md={6}
    style={{
     display: "flex",
     flexDirection: "column",
     justifyContent: "center",
     alignItems: "center",
    }}
   >
    <Typography variant="body2" color="green" display="flex"  flexDirection= "column" align="center" fontSize="30px" >
    <CheckCircleIcon style={{ verticalAlign: 'middle', fontSize:"30px" }} />
       Que disfrutes tu compra
    </Typography>
    <Card sx={{ maxWidth: 345,marginTop:"30px" }}>
     <CardMedia
      component="img"
      height="140"
      image={comic?.imagen as string}
      alt={comic.nombre as string}
     />
     <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       {comic.nombre}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       Pago realizado: ${comic.precio}
      </Typography>
     </CardContent>
    </Card>
   </Grid>
  </LayoutCheckout>
 );
};

export default ConfirmationPage;
