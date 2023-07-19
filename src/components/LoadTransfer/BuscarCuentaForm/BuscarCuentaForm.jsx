import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, ToggleButtonGroup, ToggleButton, Button, Alert, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Controller, useForm } from "react-hook-form";
import "../LoadTransfer.css"

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

  const validateAmount = (value) => {
    if (!/^\d+$/.test(value)) {
      return 'Ingresar solo numeros';
    }
    if (value <= 0) {
      return 'Ingresar un importe positivo'
    }
    return true;
  }


  return (
    <Box className='containerGrande'>
      <Grid container spacing={4} component="form" onSubmit={handleSubmit(buscarCuentaSumit)}
        className='containerResume' >
        <Grid item xs={12} >
          <Typography className="w200">Ingrese el CBU de la cuenta a transferir</Typography>
        </Grid>
        <Grid item xs={10} >
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
        <Grid item xs={12} >
          <Typography className="w200">Ingrese importe a transferir</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Importe a transferir" variant="standard" fullWidth {...register('amount', { validate: validateAmount })} />
          {errors.amount && <Alert severity="error">{errors.amount.message}</Alert>}
        </Grid>
        <Grid item xs={12} >
          <Grid container display="flex" direction="column" alignItems="flex-end">
            <Grid item xs={12} >
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Siguiente
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
