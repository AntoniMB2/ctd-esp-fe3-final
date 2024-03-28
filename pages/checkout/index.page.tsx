import React, { useState, useEffect, FormEvent, SyntheticEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import {
 Box,
 Button,
 Stepper,
 Step,
 StepLabel,
 TextField,
 Snackbar,
 Card,
 CardContent,
 CardMedia,
 Typography,
 Grid,
 SnackbarCloseReason,
} from "@mui/material";
import { ICheckout } from "types/ICheckout.type";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
export interface Image {
 path: string;
 extension: string;
}

const CheckoutPage = () => {
 const {
  register,
  handleSubmit,
  formState: { errors, isValid },
 } = useForm<ICheckout>({ mode: "onChange" });
 const router = useRouter();

 const [activeStep, setActiveStep] = useState(0);
 const [openSnackbar, setOpenSnackbar] = useState(false);
 const [snackbarMessage, setSnackbarMessage] = useState("");

 const onSubmit: SubmitHandler<ICheckout> = async (data) => {
  if (!data) {
   console.log("data es undefined o vacío");
   return;
  }
  try {
   const addressData = {
    address: data.customer.address.address2,
   };
   localStorage.setItem("deliveryAddress", JSON.stringify(addressData));

   const response = await fetch("api/checkout", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
   });

   if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData);
    // Aquí se manejan los errores específicos de la API
    switch (errorData.error) {
     case "CARD_WITHOUT_FUNDS":
      setSnackbarMessage("Tarjeta sin fondos disponibles");
      break;
     case "CARD_WITHOUT_AUTHORIZATION":
      setSnackbarMessage(
       "Tarjeta sin autorización. Comuníquese con su banco e intente nuevamente.",
      );
      break;
     case "CARD_DATA_INCORRECT":
      setSnackbarMessage("Datos de tarjeta incorrecta");
      break;
     case "ERROR_INCORRECT_ADDRESS":
      setSnackbarMessage("Dirección de entrega incorrecta");
      break;
     case "ERROR_SERVER":
     default:
      setSnackbarMessage("Error de servidor. Intente nuevamente");
      break;
    }
    setOpenSnackbar(true);
    return;
   }
   localStorage.setItem("isCheckoutFlowCompleted", "true");
   const responseData = await response.json();
   console.log(responseData);
   router.push("/confirmacion-compra");
  } catch (error) {
   console.error(error);
   setSnackbarMessage("Ha ocurrido un error inesperado.");
   setOpenSnackbar(true);
  }
 };

 const handleNext = () => {
  if (activeStep === 2) {
   handleSubmit(onSubmit)();
  } else {
   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
 };

 const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
 };
 const handleCloseSnackbar = (
  event: React.SyntheticEvent | Event,
  reason: SnackbarCloseReason,
 ) => {
  if (reason === "clickaway") {
   return;
  }

  setOpenSnackbar(false);
 };

 // Define el tipo para el objeto comic
 type Comic = {
  nombre: string;
  imagen: string;
  precio: string;
 };

 // Crea el estado para el objeto comic
 const [comic, setComic] = useState<Comic>({
  nombre: "",
  imagen: "",
  precio: "",
 });

 // Recupera los datos del almacenamiento local cuando la página se carga
 useEffect(() => {
  const storedComic = localStorage.getItem("comic");
  if (storedComic) {
   setComic(JSON.parse(storedComic));
  }
 }, []);
 return (
  <LayoutCheckout>
   <Grid
    container
    spacing={2}
    style={{ display: "flex", justifyContent: "center" }}
   >
    <Grid item xs={12} md={6}>
     <Box
      component="form"
      sx={{
       display: "flex",
       flexDirection: "column",
       gap: "2rem",
       alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
     >
      <Typography variant="h4" component="h2" gutterBottom>
       Formulario De Compra
      </Typography>
      <Stepper activeStep={activeStep}>
       <Step>
        <StepLabel>Datos Personales</StepLabel>
       </Step>
       <Step>
        <StepLabel>Dirección de Entrega</StepLabel>
       </Step>
       <Step>
        <StepLabel>Datos del Pago</StepLabel>
       </Step>
      </Stepper>
      {/* Aquí van los campos del formulario */}

      {activeStep === 0 && (
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: "1rem",
         width: "50%",
        }}
       >
        <Typography variant="h5" component="h2" gutterBottom>
         Datos personales
        </Typography>
        <TextField
         {...register("customer.firstName", { required: true })}
         error={Boolean(errors.customer?.firstName)}
         helperText={errors.customer?.firstName && "Nombre es requerido"}
         label="Nombre"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
        <TextField
         {...register("customer.lastName", { required: true })}
         error={Boolean(errors.customer?.lastName)}
         helperText={errors.customer?.lastName && "Apellido es requerido"}
         label="Apellido"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
        <TextField
         {...register("customer.email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
         })}
         error={Boolean(errors.customer?.email)}
         helperText={
          errors.customer?.email && "Email es requerido o no es válido"
         }
         label="Email"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
       </Box>
      )}

      {activeStep === 1 && (
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: "1rem",
         width: "50%",
        }}
       >
        <Typography variant="h5" component="h2" gutterBottom>
         Dirección de entrega
        </Typography>
        <TextField
         {...register("customer.address.address2", { required: true })}
         error={Boolean(errors.customer?.address?.address2)}
         helperText={
          errors.customer?.address?.address2 && "Dirección es requerida"
         }
         label="Dirección"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
        <TextField
         {...register("customer.address.departamento", { required: true })}
         error={Boolean(errors.customer?.address?.departamento)}
         helperText={
          errors.customer?.address?.departamento && "Departamento es requerido"
         }
         label="Departamento"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
        <TextField
         {...register("customer.address.provincia", { required: true })}
         error={Boolean(errors.customer?.address?.provincia)}
         helperText={
          errors.customer?.address?.provincia && "Provincia es requerida"
         }
         label="Provincia"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
        <TextField
         {...register("customer.address.ciudad", { required: true })}
         error={Boolean(errors.customer?.address?.ciudad)}
         helperText={errors.customer?.address?.ciudad && "Ciudad es requerida"}
         label="Ciudad"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
        <TextField
         {...register("customer.address.codigoPostal", { required: true })}
         error={Boolean(errors.customer?.address?.codigoPostal)}
         helperText={
          errors.customer?.address?.codigoPostal && "Código postal es requerido"
         }
         label="Código Postal"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
       </Box>
      )}

      {activeStep === 2 && (
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         gap: "1rem",
         width: "50%",
        }}
       >
        <Typography variant="h5" component="h2" gutterBottom>
         Datos del pago
        </Typography>
        <TextField
         {...register("card.number", { required: true })}
         error={Boolean(errors.card?.number)}
         helperText={errors.card?.number && "Número de tarjeta es requerido"}
         label="Número de tarjeta"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
         placeholder="eg: 4242424242424242"
        />
        <TextField
         {...register("card.name", { required: true })}
         error={Boolean(errors.card?.name)}
         helperText={errors.card?.name && "Nombre en la tarjeta es requerido"}
         label="Nombre del titular"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
        <TextField
         {...register("card.expiry", {
          required: "Fecha de expiración es requerida",
          pattern: {
           value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
           message: "Ingrese una fecha válida en el formato MM/DD",
          },
         })}
         error={Boolean(errors.card?.expiry)}
         helperText={errors.card?.expiry?.message}
         label="Fecha de expiración"
         variant="outlined"
         InputLabelProps={{ shrink: true }}
         fullWidth
         placeholder="eg: 12/23"
        />
        <TextField
         {...register("card.cvc", {
          required: "Código de seguridad es requerido",
          pattern: {
           value: /^[0-9]{3}$/,
           message: "Ingrese un código de seguridad válido de 3 dígitos",
          },
         })}
         error={Boolean(errors.card?.cvc)}
         helperText={errors.card?.cvc?.message}
         label="Código de seguridad"
         variant="outlined"
         type="text"
         placeholder="eg: 123"
         InputLabelProps={{ shrink: true }}
         fullWidth
        />
       </Box>
      )}

      <Box
       sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "50%",
       }}
      >
       <Button disabled={activeStep === 0} onClick={handleBack}>
        Atrás
       </Button>
       <Button type="submit" onClick={handleNext} disabled={!isValid}>
        {activeStep === 2 ? "Comprar" : "Siguiente"}
       </Button>
       <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
       />
      </Box>
     </Box>
    </Grid>

    {/* aqui esta la card */}
    <Grid item xs={12} md={6}>
     <Card sx={{ maxWidth: 345 }}>
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
        Precio: ${comic.precio}
       </Typography>
      </CardContent>
     </Card>
    </Grid>
   </Grid>
  </LayoutCheckout>
 );
};

export default CheckoutPage;




