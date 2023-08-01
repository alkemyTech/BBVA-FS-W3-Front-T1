import { useNavigate } from "react-router-dom";
import { Grid, Snackbar, Alert, Typography } from "@mui/material";
import TypographyInfo from "../TypographyInformation/TypographyInformation";
import StyledButton from "../../buttonStyles/buttonStyles";
import TypographyData from "../TypographyData/TypographyData";
import { CreatFixedTermDialog } from "../CreatFixedTermDialog/CreatFixedTermDialog";
import { useDataContext } from "../FixedTerm";
import { useState } from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};


export const ShowTaskFixed = () => {
  const [isTransferSucced, setIsTransferSucced] = useState(false);
  const navigate = useNavigate();
  const { fixTermData, setReceivedData } = useDataContext();

  return (
    <>
      <Grid container spacing={3} padding={"2rem"} >
      <Grid item xs={12}>
          <Typography variant="h4" ><i>Resumen:</i> </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            <b> Capital de origen</b> $ {fixTermData.montoInverito.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
            <b>Interés</b> $ {fixTermData.interes.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
            <b> Monto final</b> ${" "}{fixTermData.montoTotal.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="overline" gutterBottom>
            <b> Creación:</b> {formatDate(fixTermData.fechaCreacion)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="overline" gutterBottom>
            <b> Vencimiento:</b> {formatDate(fixTermData.fechaFinalizacion)}
          </Typography>
        </Grid>
        {isTransferSucced && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom><b>Balance de tu cuenta</b> $ {fixTermData.balance.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}</Typography>
            </Grid>
            <Snackbar open={true} autoHideDuration={10}>
              <Alert severity="success" sx={{ width: "100%" }}>
                El plazo fijo se realizó con éxito
              </Alert>
            </Snackbar>
          </>
        )}
        </Grid>
          <Grid container justifyContent="space-between" >
            <Grid item xs={12} md={2}>
              <StyledButton
                onClick={() => {
                  setReceivedData(false);
                }}
              >
                otro
              </StyledButton>
            </Grid>

            <Grid item xs={12} md={2}>
              {!isTransferSucced && (
                <CreatFixedTermDialog
                  setIsTransferSucced={setIsTransferSucced}
                />
              )}
            </Grid>
          </Grid>
    </>
  );
};
