import { Typography, Grid, Box, Alert, Divider} from "@mui/material";
import StyledButton from "../../buttonStyles/buttonStyles";

export const RespuestaPagos = ({ data, setData}) => {    
    const {amount, description} = data.transactionPayment;
    const currency = data.updatedAccount.currency;

    const handleClickPagarOtro = ()=>{
      setData("");
    }

  return (
    <div style={{minHeight:"85.7vh"}}>
      <Grid container justifyContent="center" alignItems="center">
        <Box width="100%" maxWidth="400px" pt={10}>
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
            boxShadow: 10,
            width: "25rem",
            height: "11rem",
            p: 1,
            m: 1,
            borderRadius: 2,
          }}
        >
          <Typography fontSize={20} marginBottom={1} marginLeft={2}>
            <b>Se debitó: ${amount}</b>
          </Typography>
          <Divider />
          <Typography marginTop={1} fontSize={15}>
            Pagó el servicio:
          </Typography>
          <Typography fontSize={15}>
            <b>{description.toUpperCase()}</b>
          </Typography>
          <Typography marginTop={1} fontSize={15}>
            Pagó con:
          </Typography>
          <Typography fontSize={15}>
            <b>Cuenta en {currency}</b>
          </Typography>
        </Box>
        <Box sx={{ mt: "1rem" }}>
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleClickPagarOtro}
          >
            Pagar otro servicio
          </StyledButton>
        </Box>
        <Alert severity="info" sx={{mt:"1rem"}}>Se debitará el pago en unos instantes</Alert>
      </Grid>
    </div>
  );
};
