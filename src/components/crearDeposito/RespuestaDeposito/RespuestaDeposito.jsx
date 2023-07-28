import { Typography, Grid, Box, Alert, Divider } from "@mui/material";
import StyledButton from "../../buttonStyles/buttonStyles";

export const RespuestaDeposito = ({ data, date, handleClick }) => {
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Box width="100%" maxWidth="350px">
          <Alert variant="outlined" severity="success">
            <Typography>
              <b>¡Listo! Depósito exitoso</b>
            </Typography>
          </Alert>
        </Box>
      </Grid>
      <Grid
        container
        mt={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            boxShadow: 2,
            width: "22rem",
            height: "11rem",
            p: 1,
            m: 1,
            borderRadius: 2,
          }}
        >
          <Typography fontSize={20} marginBottom={1} marginLeft={2}>
            <b>${data.amount}</b>
          </Typography>
          <Divider />
          <Typography marginTop={3} fontSize={15}>
            Fecha: <b>{date}</b>
          </Typography>
          <Typography marginTop={3} fontSize={15}>
            Se depositó en: <b>Cuenta en {data.currency}</b>
          </Typography>
        </Box>
        <Alert severity="info">Se acreditará en unos instantes</Alert>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <StyledButton
            variant="contained"
            type="submit"
            sx={{ mt: "2rem", mb: "1rem" }}
            onClick={() => handleClick()}
          >
            OTRO DEPOSITO
          </StyledButton>
        </Grid>
      </Grid>
    </>
  );
};
