import {
  Typography,
  Grid,
  Box,
  Alert,
  Divider,
  AlertTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const RespuestaDeposito = ({ data,date }) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Box width="100%" maxWidth="400px" mt={10}>
          <Alert variant="outlined" severity="success">
            <Typography>
              <b>¡Listo! Depósito exitoso</b>
            </Typography>
          </Alert>
        </Box>
      </Grid>
      <Grid
        container
        mt={4}
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
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", margin: "90px 0" }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#1C6875", minWidth: "10rem" }}
            onClick={() => {navigate("/home")}}
          >
            Volver al inicio
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
