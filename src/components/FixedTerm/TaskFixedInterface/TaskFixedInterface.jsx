import { Grid, Typography, TextField, Alert, Button, Box } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import "../FixedTermStyles.css"

export const TaskFixedInterface = ({ onSubmit, tipoCarga }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    validateCriteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange"
  });

  const validateAmount = (value) => {
    if (!/^\d+$/.test(value)) {
      return 'Ingresar solo numeros';
    }
    if (value <= 0) {
      return 'Ingresar un importe positivo'
    }
    return true;
  }

  const validateDays = (value) => {
    if (!/^\d+$/.test(value)) {
      return 'Ingresar solo numeros';
    }
    if (value < 30) {
      return 'Ingresar una cantidad de dias minima de 30'
    }
    return true;
  }


  return (

    <Grid container
      spacing={4}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className='containerGrid'
    >
      {tipoCarga &&

        <Grid item xs={12} >
          <Typography 
            color="#2BA0B5"
            fontWeight="900"
            fontSize="1.7em"
            marginBottom="6vh"
            borderBottom="2px solid ">
            {tipoCarga}
          </Typography>
        </Grid>

      }


      <Grid item xs={12} >
        <Typography className='informacion'> Ingresar cantidad a depositar:</Typography>
      </Grid>

      <Grid item xs={12} paddingBottom="5vh">
        <TextField label="Importe a depositar" fullWidth
          variant="standard"  {...register('amount', { validate: validateAmount })} />
        {errors.amount && <Alert severity="error">{errors.amount.message}</Alert>}
      </Grid>



      <Grid item xs={12}>
        <Typography className='informacion'> Ingresar cantidad de dias: </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Cantidad de dias" fullWidth
          variant="standard"  {...register('days', { validate: validateDays })} />
        {errors.days && <Alert severity="error">{errors.days.message}</Alert>}
      </Grid>


      <Grid item xs={12} >
        <Button type="submit" variant="contained" className='boton'>
          Siguiente
        </Button>
      </Grid>
    </Grid>
  )
}
