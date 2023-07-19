import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, ToggleButtonGroup, ToggleButton, Button, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Controller, useForm } from "react-hook-form";

export const BuscarCuentaForm = ({ buscarCuentaSumit }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    validateCriteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange"
  });

  const validateCBU = (value) => {
    if (value.length !== 22) {
      return 'el CBU debe contener 22 digitos';
    }

    if (!/^\d+$/.test(value)) {
      return 'el CBU debe estar compuesto solo de numeros';
    }
    return true;
  };

  return (
    <Grid container spacing={4} component="form" onSubmit={handleSubmit(buscarCuentaSumit)}>
      <Grid item xs={12}>
        <Typography variant="h5">Ingrese el CBU de la cuenta a transferir</Typography>
      </Grid>
      <Grid item xs={10}>
        <TextField label="CBU" variant="standard" fullWidth {...register('cbu', { validate: validateCBU })}
        />
        {errors.cbu && <Alert severity="error">{errors.cbu.message}</Alert>}
      </Grid>
      <Grid item xs={2}>
      <Controller
          name="moneda"
          control={control}
          defaultValue="ARS" 
          render={({ field }) => (
            <ToggleButtonGroup
              exclusive
              aria-label="Moneda"
              value={field.value}
              onChange={(event, value) => field.onChange(value)}
            >
              <ToggleButton value="ARS">ARS</ToggleButton>
              <ToggleButton value="USD">USD</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Buscar Cuenta
        </Button>
      </Grid>
    </Grid>
  )
}
