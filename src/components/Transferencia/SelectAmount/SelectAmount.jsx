import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Alert,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Controller, useForm } from "react-hook-form";
import StyledButton from "../../buttonStyles/buttonStyles";

export const SelectAmount = ({
  SelectAmountSubmit,
  firstName,
  lastName,
  handleBack,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // validateCriteriaMode: "all",
    // reValidateMode: "onChange",
    // mode: "onChange",
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

  //   display:flex;
  //   padding: 5%;
  //   justify-content: center;

  return (
    <Box display={"flex"} padding={"5%"} justifyContent={"center"}>
      <Grid
        container
        spacing={4}
        component="form"
        onSubmit={handleSubmit(SelectAmountSubmit)}
      >

        <Grid item xs={12}>
          <Typography variant="h5">
            <b>Ingrese importe a transferir</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Importe a transferir"
            variant="outlined"
            fullWidth
            {...register("amount", { validate: validateAmount })}
          />
          {errors.amount && (
            <Alert severity="error">{errors.amount.message}</Alert>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <StyledButton
            sx={{ backgroundColor: "#2BA0B5" }}
            type="button"
            variant="contained"
            onClick={handleBack}
          >
            Anterior
          </StyledButton>
          <StyledButton
            sx={{ backgroundColor: "#2BA0B5" }}
            type="submit"
            variant="contained"
          >
            Siguiente
          </StyledButton>
        </Grid>
      </Grid>
    </Box>
  );
};
