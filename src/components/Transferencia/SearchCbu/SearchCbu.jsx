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
          <Grid item xs={4}>
            <StyledButton type="submit" endIcon={<SearchIcon />}>
              Buscar
            </StyledButton>
          </Grid>
          {userCbu && (
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "#87a3a8",
                  padding: "2rem",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">
                  <b>El dueño de la cuenta es: </b>
                </Typography>
                <Typography>
                  {console.log(userCbu)}
                  {userCbu.firstName}, {userCbu.lastName}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}
          >
            <StyledButton onClick={handleNext}>Siguiente</StyledButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
