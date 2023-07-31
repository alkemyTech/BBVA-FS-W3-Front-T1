import {
  Grid,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Alert,
  Box,
  Icon,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Controller, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import StyledButton from "../../buttonStyles/buttonStyles";

export const SearchCbu = ({ SearchCbuSubmit, handleNext, userCbu }) => {
  const {
    register,
    handleSubmit,
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
            <Typography variant="h6">
              <b>Ingrese CBU de la cuenta a transferir</b>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="CBU"
              variant="outlined"
              inputProps={{ maxLength: 22 }}
              helperText="Ingresar cbu de 22 digitos"
              fullWidth
              autoFocus
              {...register("cbu", { validate: validateCBU })}
            />
            {errors.cbu && <Alert severity="error">{errors.cbu.message}</Alert>}
          </Grid>
          <Grid item xs={4}>
            <StyledButton type="submit" endIcon={<SearchIcon />}>
              Buscar
            </StyledButton>
          </Grid>
          {userCbu && (
            <Grid item xs={12} >
              <Box
                sx={{
                  backgroundColor: '#6DAFE840',
                  padding: "1.5rem",
                  boxShadow: "3",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h6">
                  <b>El dueño de la cuenta es: </b>
                </Typography>
                <Typography>
                  {userCbu.firstName}, {userCbu.lastName}
                </Typography>
                <Typography variant="h6">
                  <b>El tipo de moneda es: </b>
                </Typography>
                <Typography>
                  {userCbu.currency}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <StyledButton onClick={handleNext}>Siguiente</StyledButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
