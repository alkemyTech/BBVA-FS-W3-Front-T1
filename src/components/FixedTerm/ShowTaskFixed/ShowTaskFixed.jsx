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
      <Grid container spacing={3} textAlign="center" >
      <Grid item xs={12}>
          <Typography variant="h4" borderBottom={1}><b>Resumen</b> </Typography>
        </Grid>

        <Grid item xs={12}>
          <TypographyInfo>Monto invertido </TypographyInfo>
          <TypographyData>$ {fixTermData.montoInverito}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Interes obtenido </TypographyInfo>
          <TypographyData>$ {fixTermData.interes}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Monto total a cobrar</TypographyInfo>
          <TypographyData>$ {fixTermData.montoTotal}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Inicio del plazo fijo</TypographyInfo>
          <TypographyData>{formatDate(fixTermData.fechaCreacion)}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Finalizacion del plazo fijo</TypographyInfo>
          <TypographyData>{formatDate(fixTermData.fechaFinalizacion)}</TypographyData>
        </Grid>
        {isTransferSucced && (
          <>
            <Grid item xs={12}>
              <TypographyInfo>Balance de tu cuenta</TypographyInfo>
              <TypographyData>$ {fixTermData.balance}</TypographyData>
            </Grid>
            <Snackbar open={true} autoHideDuration={10}>
              <Alert severity="success" sx={{ width: "100%" }}>
                El plazo fijo se realizó con éxito
              </Alert>
            </Snackbar>
          </>
        )}
        <Grid item xs={12} marginTop={'2vh'}>
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

            <Grid item xs={12} md={2} marginRight={'2px'}>
              {!isTransferSucced && (
                <CreatFixedTermDialog
                  setIsTransferSucced={setIsTransferSucced}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
