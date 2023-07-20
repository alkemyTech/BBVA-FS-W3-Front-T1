
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

export const SearchCbu = ({ SearchCbuSubmit }) => {
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

  const validateCBU = (value) => {
    if (value.length !== 22) {
      return "el CBU debe contener 22 digitos";
    }

    if (!/^\d+$/.test(value)) {
      return "el CBU debe estar compuesto solo de numeros";
    }
    return true;
  };

  return (
    <>
      <Box marginTop={2}>
        <Grid
          container
          spacing={4}
          component="form"
          onSubmit={handleSubmit(SearchCbuSubmit)}
        >
          <Grid item xs={12}>
            <Typography variant="h5">
              <b>Ingrese CBU de la cuenta a transferir</b>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="CBU"
              variant="standard"
              inputProps={{ maxLength: 22 }}
              fullWidth
              {...register("cbu", { validate: validateCBU })}
            />
            {errors.cbu && <Alert severity="error">{errors.cbu.message}</Alert>}
          </Grid>
          <Grid item xs={4} >
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

          <Grid item xs={12} sx={ {display: 'flex', justifyContent: 'flex-end', marginTop: 4}}>
                <Button
                    sx={{backgroundColor:  "#2BA0B5"}}
                    type="submit"
                    variant="contained"
                >
                  Siguiente
                </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
