import {
  TextField,
  Snackbar,
  MenuItem,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import StyledButton from "../../buttonStyles/buttonStyles";

export const FormularioDeposito = ({ onSubmit, validation, msgError }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    validateCriteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const validateAmount = (value) => {
    if (value <= 0) {
      return "Ingresar un monto mayor a cero";
    }
    if (!/^(?!0\d*$)\d*(\.\d{0,2})?$/.test(value)) {
      return "Ingresar un monto valido";
    }
    return true;
  };

  const selectedCurrency = watch("currency");

  const currencies = [
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "ARS",
      label: "ARS",
    },
  ];

  return (
    <>
      <Typography variant="h5" align="center">
        <b>¿CUANTO QUERES DEPOSITAR?</b>
      </Typography>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        container
        sx={{ mt: 4 }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign={"center"}
      >
        <Grid item xs={12} sx={{ mb: 3 }}>
          <TextField
            required
            id="outlined-required"
            label="Monto"
            {...register("amount", { validate: validateAmount })}
            sx={{ mr: "1rem" }}
          />
          <TextField
            sx={{ width: "7rem" }}
            id="outlined-select-currency"
            required
            select
            label="Moneda"
            defaultValue=""
            onChange={(event) => setValue("currency", event.target.value)}
            {...register("currency")}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sx={{ minWidth: "22rem" }}>
          <TextField
            id="outlined"
            label="Concepto"
            defaultValue="Varios"
            inputProps={{ maxLength: 100 }}
            helperText="Ingresar hasta 100 caracteres"
            fullWidth
            {...register("description")}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <StyledButton
            variant="contained"
            type="submit"
            sx={{ mt: "1rem", mb: "1rem" }}
          >
            DEPOSITAR
          </StyledButton>
        </Grid>
        {errors.amount && (
          <Alert severity="error">{errors.amount.message}</Alert>
        )}
        {validation && <Alert severity="error"> {msgError} </Alert>}
      </Grid>
    </>
  );
};
