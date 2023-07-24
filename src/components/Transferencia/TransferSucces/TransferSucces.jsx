import {
    Typography,
    Grid,
  } from "@mui/material";
import StyledButton from "../../buttonStyles/buttonStyles";
import { useNavigate } from "react-router-dom";

export const TransferSucces = ({response, newTrasfer}) => {
    const navigate = useNavigate();
  return (
    <>
        <Grid container  spacing={2}>
            <Grid item xs={12} display={"flex"} justifyContent={"center"} mb={2}>
            <Typography variant="h6"><b>Detalles de la transacción</b></Typography>
            </Grid>

            <Grid item xs={6}>
                <Grid container spacing={6}>

                    <Grid item xs={12}>
                    <Typography variant="body1"><b>Tipo:</b> {response.type}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="body1"><b>Descripción:</b> {response.description}</Typography></Grid>
                    <Grid item xs={12}>
                    <Typography variant="body1"><b>Moneda:</b> {response.account.currency}</Typography></Grid>
                    <Grid item xs={12}>
                    <Typography variant="body1"><b>Monto:</b> {response.amount}</Typography></Grid>
                    <Grid item xs={12}>
                    <Typography variant="body1"><b>Saldo de la cuenta:</b> {response.account.balance}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={ "src/assets/success-goal.svg"} alt="Success Goal" style={{ maxWidth: "100%", height: "auto" }} />
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={15}>
                    <Grid item xs={6}>
                        <StyledButton onClick={()=>{ navigate("/home")}}>Home</StyledButton>
                    </Grid>
                    <Grid item xs={6}>
                        <StyledButton onClick={newTrasfer}>Otra Transferencia</StyledButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>


    </>
  )
}
