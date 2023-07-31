import { Typography, Grid, Box, Alert, Divider } from "@mui/material";
import StyledButton from "../../buttonStyles/buttonStyles";
import { useNavigate } from "react-router-dom";

export const RespuestaCrearCuenta = ({ data, setData }) => {
  const { cbu, balance, transactionLimit, currency } = data;
  const nombreTitular = data.userId.firstName + " " + data.userId.lastName;
  const navigate = useNavigate();
  const handleClickInicio = () => {
    setData("");
    navigate("/inicio");
  };

  return (
    <div style={{ minHeight: "85.7vh" }}>
      <Grid container justifyContent="center" alignItems="center">
        <Box width="100%" maxWidth="400px" pt={10} >
          <Alert variant="outlined" severity="success" >
            <Typography>
              <b>Creación de su cuenta con éxito</b>
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
            boxShadow: 10,
            width: "25rem",
            height: "auto",
            p: 2,
            m: 1,
            borderRadius: 2,
            backgroundColor:"white"
          }}
        >
          <Typography fontSize={20} marginBottom={1}>
            <b>Detalle:</b>
          </Typography>
          <Divider />
          <Typography marginTop={1} fontSize={15}>
            Titular de la cuenta:
          </Typography>
          <Typography fontSize={15}>
            <b>{nombreTitular}</b>
          </Typography>
          <Typography marginTop={1} fontSize={15}>
            CBU:
          </Typography>
          <Typography fontSize={15}>
            <b>{cbu}</b>
          </Typography>
          <Typography marginTop={1} fontSize={15}>
            Moneda:
          </Typography>
          <Typography fontSize={15}>
            <b>{currency}</b>
          </Typography>
          <Typography marginTop={1} fontSize={15}>
            Límite de transacción:
          </Typography>
          <Typography fontSize={15}>
            <b>
              {currency === "ARS"
                ? "$ " + transactionLimit
                : "U$S " + transactionLimit}
            </b>
          </Typography>
          <Typography marginTop={1} fontSize={15}>
            Balance:
          </Typography>
          <Typography fontSize={15}>
            <b>{currency === "ARS" ? "$ " + balance : "U$S " + balance}</b>
          </Typography>
        </Box>
        <Box sx={{ mt: "1rem" }}>
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleClickInicio}
          >
            Volver al inicio
          </StyledButton>
        </Box>
      </Grid>
    </div>
  );
};
