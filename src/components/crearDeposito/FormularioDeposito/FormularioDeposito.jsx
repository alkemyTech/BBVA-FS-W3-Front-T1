import { TextField, MenuItem, Grid, Button, Typography,Alert } from "@mui/material";
import { useForm } from "react-hook-form";


export const FormularioDeposito = ({onSubmit,validation,msgError}) => {
  
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
      <Typography variant="h5" gutterBottom align="center" sx={{ mt: 10 } }>
        <b>¿Cuánto querés depositar?</b>
      </Typography>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        container
        spacing={2}
        sx={{ mt: 8 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sx={{ mb: 3 } }>
          <TextField
            required
            id="outlined-required"
            label="Monto"
            {...register("amount",{ validate: validateAmount })}
      
          />
          
        </Grid>
  
        
        <Grid
          item
          sx={{
            "& .MuiTextField-root": { width: "13ch" }, mb: 3
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
        <Grid item >
          <TextField
            id="outlined"
            label="Concepto"
            defaultValue="Varios"
            inputProps={{ maxLength: 100 }}
            helperText="Ingresar hasta 100 caracteres"
            {...register("description")}
           
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", margin: "60px 0" }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#1C6875", minWidth: "10rem" }}
          >
            Enviar
          </Button>
        </Grid>
        {errors.amount && <Alert severity="error">{errors.amount.message}</Alert>}
        {validation && <Alert severity="error"> {msgError} </Alert>}
      </Grid>
    </>
  );
};