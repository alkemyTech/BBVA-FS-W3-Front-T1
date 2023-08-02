import { Typography, Grid, Box, Alert, Divider } from "@mui/material";
import StyledButton from "../../buttonStyles/buttonStyles";

export const RespuestaDeposito = ({
  data,
  date,
  cbu,
  idTransaction,
  handleClick,
}) => {
  const formatDate = (date) => {
    date = new Date(date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Box width="100%" maxWidth="385px">
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
            width: "24rem",
            height: "16rem",
            p: 2,

            marginBottom: 3,
            borderRadius: 2,
          }}
        >
          <Typography fontSize={20} marginBottom={1} marginLeft={2}>
            <b>${data.amount}</b>
          </Typography>
          <Divider />
          <Typography marginTop={3} fontSize={15}>
            Fecha de deposito: <b>{formatDate(date)}</b>
          </Typography>
          <Typography marginTop={3} fontSize={15}>
            Se depositó en: <b>Cuenta en {data.currency}</b>
          </Typography>
          <Typography marginTop={3} fontSize={15}>
            CBU de la cuenta: <b> {cbu}</b>
          </Typography>
          <Typography marginTop={3} fontSize={15}>
            Numero de transaccion: <b>{idTransaction}</b>
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
