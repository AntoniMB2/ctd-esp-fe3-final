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

 const onSubmit: SubmitHandler<ICheckout> = async (data) => {
  try {
   const response = await fetch("/api/checkout", {
    // Asegúrate de reemplazar '/api/checkout' con la ruta correcta a tu API
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
   });

   if (!response.ok) {
    const errorData = await response.json();
    // Aquí puedes manejar los errores devueltos por la API
    console.error(errorData);
    return;
   }

   const responseData = await response.json();
   // Aquí puedes manejar la respuesta de la API
   console.log(responseData);

   // Redirigir al usuario a la página de confirmación
   router.push("/confirmation"); // Asegúrate de reemplazar '/confirmation' con la ruta correcta a tu página de confirmación
  } catch (error) {
   // Aquí puedes manejar los errores de red y otros errores inesperados
   console.error(error);
  }
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
  {...register("personalData.nombre", { required: true })}
  error={Boolean(errors.personalData?.nombre)}
  helperText={errors.personalData?.nombre && "Nombre es requerido"}
  label="Nombre"
  variant="outlined"
  InputLabelProps={{ shrink: true }}
  fullWidth
/>
    <TextField
      {...register("personalData.apellido", { required: true })}
      error={Boolean(errors.personalData?.apellido)}
      helperText={errors.personalData?.apellido && "Apellido es requerido"}
      label="Apellido"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
    <TextField
      {...register("personalData.email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      })}
      error={Boolean(errors.personalData?.email)}
      helperText={errors.personalData?.email && "Email es requerido o no es válido"}
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
      {...register("personalData.direccion.calle", { required: true })}
      error={Boolean(errors.personalData?.direccion?.calle)}
      helperText={errors.personalData?.direccion?.calle && "Dirección es requerida"}
      label="Dirección"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
    <TextField
      {...register("personalData.direccion.provincia", { required: true })}
      label="Departamento"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
      <TextField
      {...register("personalData.direccion.provincia", { required: true })}
      error={Boolean(errors.personalData?.direccion?.provincia)}
      helperText={errors.personalData?.direccion?.provincia && "Provincia es requerida"}
      label="Provincia"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
   <TextField
      {...register("personalData.direccion.ciudad", { required: true })}
      error={Boolean(errors.personalData?.direccion?.ciudad)}
      helperText={errors.personalData?.direccion?.ciudad && "Ciudad es requerida"}
      label="Ciudad"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
    <TextField
      {...register("personalData.direccion.codigoPostal", { required: true })}
      error={Boolean(errors.personalData?.direccion?.codigoPostal)}
      helperText={errors.personalData?.direccion?.codigoPostal && "Código postal es requerido"}
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
  {...register("paymentData.number", { required: true })}
  error={Boolean(errors.paymentData?.number)}
  helperText={errors.paymentData?.number && "Número de tarjeta es requerido"}
  label="Número de tarjeta"
  variant="outlined"
  InputLabelProps={{ shrink: true }}
  fullWidth
/>
    <TextField
      {...register("paymentData.nameOnCard", { required: true })}
      error={Boolean(errors.paymentData?.nameOnCard)}
      helperText={errors.paymentData?.nameOnCard && "Nombre en la tarjeta es requerido"}
      label="Nombre del titular"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
    <TextField
      {...register("paymentData.expDate", { required: true })}
      error={Boolean(errors.paymentData?.expDate)}
      helperText={errors.paymentData?.expDate && "Fecha de expiración es requerida"}
      label="Fecha de expiración"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
    <TextField
      {...register("paymentData.cvc", { required: true })}
      error={Boolean(errors.paymentData?.cvc)}
      helperText={errors.paymentData?.cvc && "Código de seguridad es requerido"}
      label="Código de seguridad"
      variant="outlined"
      type="password"
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
