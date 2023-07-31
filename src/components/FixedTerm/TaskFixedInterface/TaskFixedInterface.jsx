import { Grid, Typography, TextField, Alert, Button, Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import StyledButton from "../../buttonStyles/buttonStyles";
import TypographyInfo from "../TypographyInformation/TypographyInformation";

export const TaskFixedInterface = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    validateCriteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const validateAmount = (value) => {
    if (!/^\d+$/.test(value)) {
      return "Ingresar solo numeros";
    }
    if (value <= 0) {
      return "Ingresar un importe positivo";
    }
    return true;
  };

  const validateDays = (value) => {
    if (!/^\d+$/.test(value)) {
      return "Ingresar solo numeros";
    }
    if (value < 30) {
      return "Ingresar una cantidad de dias minima de 30";
    }
    return true;
  };

  return (
    <Grid
      container
      spacing={4}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12} >
        <Typography
          variant="h4" align="center"
        >
          Simular plazo fijo:
        </Typography>
      </Grid>

      <Grid item xs={7} paddingBottom="5vh">
        <TextField
          label="Importe a depositar"
          fullWidth
          variant="outlined"
          {...register("amount", { validate: validateAmount })}
        />
        {errors.amount && (
          <Alert severity="error">{errors.amount.message}</Alert>
        )}
      </Grid>

      <Grid item xs={5}>
        <TextField
          label="Cantidad de dias"
          fullWidth
          variant="outlined"
          {...register("cantDias", { validate: validateDays })}
        />
        {errors.cantDias && <Alert severity="error">{errors.cantDias.message}</Alert>}
      </Grid>

      <Grid container justifyContent={"flex-end"}>
        <Grid item>
          <StyledButton type="submit">Simular</StyledButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
