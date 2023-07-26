import { Typography, Grid, Box, Alert, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../buttonStyles/buttonStyles";

export const RespuestaPagos = ({ data, setData, services }) => {
    const navigate = useNavigate();
    
    const handleClickPagar = ()=>{
        setData("");
    }
    const handleClickInicio = ()=>{
        navigate("/inicio")
    }

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Box width="100%" maxWidth="400px" mt={10}>
          <Alert variant="outlined" severity="success">
            <Typography>
              <b>¡Listo! Pago exitoso</b>
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
            width: "25rem",
            height: "11rem",
            p: 1,
            m: 1,
            borderRadius: 2,
          }}
        >
          <Typography fontSize={20} marginBottom={1} marginLeft={2}>
            <b>Pagó: ${data.amount}</b>
          </Typography>
          <Divider />
          <Typography marginTop={1} fontSize={15}>
            Pagó el servicio:
          </Typography>
          <Typography fontSize={15}>
            <b>{services}</b>
          </Typography>
          <Typography marginTop={1} fontSize={15}>
            Pagó con:
          </Typography>
          <Typography fontSize={15}>
            <b>Cuenta en {data.currency}</b>
          </Typography>
        </Box>
        <Box sx={{ mt: "1rem" }}>
          <StyledButton
            variant="contained"
            fullWidth
            sx={{mb: "1rem" }}
            onClick={handleClickInicio}
          >
            Inicio
          </StyledButton>
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleClickPagar}
          >
            Pagar otro servicio
          </StyledButton>
        </Box>
        <Alert severity="info" sx={{mt:"1rem"}}>Verá el movimiento en unos instantes</Alert>
      </Grid>
    </>
  );
};
