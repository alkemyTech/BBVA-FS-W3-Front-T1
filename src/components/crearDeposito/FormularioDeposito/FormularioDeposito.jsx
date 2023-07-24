import { TextField, MenuItem, Grid, Button, Typography,Alert } from "@mui/material";
import { useForm } from "react-hook-form";

export const FormularioDeposito = ({setMostrarFormularioDeposito,onSubmit}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
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
      <Typography variant="h5" gutterBottom align="center" sx={{ mt: 10 } }>
        <b>¿Cuánto querés depositar?</b>
      </Typography>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        container
        spacing={2}
        sx={{ mt: 10 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <TextField
            required
            id="outlined-required"
            label="Monto"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            {...register("amount", { validate: validateAmount })}
          />
         {errors.amount && <Alert severity="error">{errors.amount.message}</Alert>} 
        </Grid>
        <Grid
          item
          sx={{
            "& .MuiTextField-root": { width: "13ch" },
          }}
        >
          <TextField
            required
            id="outlined-select-currency"
            select
            label="Moneda"
            {...register("currency")}
            value={selectedCurrency ?? ""}
            onChange={(event) => setValue("currency", event.target.value)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
          disabled
            id="outlined-read-only-input"
            label="Descripción"
            defaultValue="Deposito"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", margin: "90px 0" }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#1C6875", minWidth: "10rem" }}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};