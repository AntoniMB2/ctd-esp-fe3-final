import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Box, Button, Stepper, Step, StepLabel, TextField, Snackbar } from '@mui/material';
import { ICheckout } from 'types/ICheckout.type';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
const CheckoutPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICheckout>();
  const router = useRouter();

  const onSubmit = async (data:ICheckout) => {
    // Llamar a la API de compra con los datos del formulario
    // Manejar la respuesta de la API y mostrar los errores si los hay
    // Redirigir al usuario a la página de confirmación si la compra es exitosa
  };

  return (

    <LayoutCheckout>
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stepper activeStep={0}>
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

      <Button type="submit">Comprar</Button>

      {/* Aquí va el panel de información del cómic */}

      {/* Aquí va el componente Snackbar para mostrar los errores */}
    </Box>
    </LayoutCheckout>
  );
};

export default CheckoutPage;