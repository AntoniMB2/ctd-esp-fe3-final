import React, { useState, FormEvent } from "react";
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
} from "@mui/material";
import { IPersonalData } from "types/ICheckout.type";
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
 } = useForm<IPersonalData>({ mode: "onChange" });
 const router = useRouter();

 const [activeStep, setActiveStep] = useState(0);

 const onSubmit: SubmitHandler<IPersonalData> = async (data) => {
  // Llamar a la API de compra con los datos del formulario
  // Manejar la respuesta de la API y mostrar los errores si los hay
  // Redirigir al usuario a la página de confirmación si la compra es exitosa
 };

 // Extraer los parámetros de consulta
 const { title, image, price } = router.query;
 const comic = {
  nombre: title,
  imagen: image,
  precio: price,
 };

 const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
 };

 const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
 };

 return (
  <LayoutCheckout>
   <Grid container spacing={2}>
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
      <Box
       sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "50%",
       }}
      >
       <TextField
        {...register("nombre", { required: true })}
        error={Boolean(errors.nombre)}
        helperText={errors.nombre && "Nombre es requerido"}
        label="Nombre"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        fullWidth
       />
       <TextField
        {...register("apellido", { required: true })}
        error={Boolean(errors.apellido)}
        helperText={errors.apellido && "Apellido es requerido"}
        label="Apellido"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        fullWidth
       />
       <TextField
        {...register("email", {
         required: true,
         pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        })}
        error={Boolean(errors.email)}
        helperText={errors.email && "Email es requerido o no es válido"}
        label="Email"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        fullWidth
       />
      </Box>
      <Box
       sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "50%",
       }}
      >
       <Button disabled={activeStep === 0} onClick={handleBack}>
        Atrás
       </Button>
       <Button type="submit" onClick={handleNext} disabled={!isValid}>
        {activeStep === 2 ? "Comprar" : "Siguiente"}
       </Button>
      </Box>
     </Box>
    </Grid>

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
       <Typography variant="body2" color="text.secondary">Precio: $
        {comic.precio}
       </Typography>
      </CardContent>
     </Card>
    </Grid>

    {/* Aquí va el componente Snackbar para mostrar los errores */}
   </Grid>
  </LayoutCheckout>
 );
};

export default CheckoutPage;
