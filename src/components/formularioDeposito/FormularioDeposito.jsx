import { TextField, MenuItem, Grid, Button } from "@mui/material";
import { useForm } from "react-hook-form";

export const FormularioDeposito = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedCurrency = watch("currency");

  onSubmit({ data});

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={6}>
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
            xs={6}
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
          <Grid item xs={6} sx={{ mt: 6 }}>
            <TextField
              id="outlined-read-only-input"
              label="Descripción"
              defaultValue="Deposito"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{
            margin: "40px 0",
            backgroundColor: "#1C6875",
            width: "50%",
            minWidth: "10rem",
          }}
        >
          Enviar
        </Button>
      </form>
  );
};
