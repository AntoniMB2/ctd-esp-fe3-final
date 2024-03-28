import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutCheckout from "components/layouts/layout-checkout";
import {
 Card,
 CardContent,
 CardMedia,
 Typography,
 Grid,
 Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ConfirmationPage: React.FC = () => {
 const router = useRouter();
 const [address, setAddress] = useState("");
 type Comic = {
  nombre: string;
  imagen: string;
  precio: string;
  direccion: string;
 };

 const [comic, setComic] = useState<Comic>({
  nombre: "",
  imagen: "",
  precio: "",
  direccion: "calle 3",
 });

 useEffect(() => {
    const isCheckoutFlowCompleted = localStorage.getItem("isCheckoutFlowCompleted");

    if (isCheckoutFlowCompleted !== 'true') {
      router.push('/');
    } else {
      const storedComic = localStorage.getItem("comic") || '{}';
      const storedAddressData = localStorage.getItem('deliveryAddress') || '{}';
      setComic(JSON.parse(storedComic));
      setAddress(JSON.parse(storedAddressData).address);
    }
  }, [router]);

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
     marginBottom: "40px",
    }}
   >
    <Typography
     variant="body2"
     color="green"
     display="flex"
     flexDirection="column"
     align="center"
     fontSize="30px"
     alignItems="center"
    >
     <CheckCircleIcon style={{ verticalAlign: "middle", fontSize: "30px" }} />
     Que disfrutes tu compra
    </Typography>
    <Card
     sx={{
      maxWidth: 345,
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
     }}
    >
     <CardMedia
      component="img"
      height="200" // Aumenta el tamaño de la imagen
      image={comic?.imagen as string}
      alt={comic.nombre as string}
     />
     <CardContent>
      <Typography gutterBottom variant="h5" component="div" textAlign="center">
       {comic.nombre}
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={2}>
       Pago realizado: ${comic.precio}
      </Typography>
      <Typography variant="h5" color="text.secondary">
       Dirección de entrega: {address}
      </Typography>
     </CardContent>
     <Button
      variant="contained"
      color="primary"
      style={{ width: "50%", marginBottom: "20px" }}
      onClick={() => router.push("/")}
     >
      Volver al inicio
     </Button>
    </Card>
   </Grid>
  </LayoutCheckout>
 );
};

export default ConfirmationPage;
