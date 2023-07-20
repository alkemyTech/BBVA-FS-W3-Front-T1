import { TextField, MenuItem, Grid, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export const FormularioDeposito = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedCurrency = watch("currency");

  const onSubmit = (data) => {
    console.log(data);
  };

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
      <Typography variant="h5" align="center" sx={{ mt: 10 }}>
        ¿Cuanto queres depositar?
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
            {...register("amount", { min: 1 })}
            error={!!errors.amount}
            helperText={
              errors.amount?.type === "min" && (
                <p>El monto tiene que ser igual o superior a 1</p>
              )
            }
          />
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
}