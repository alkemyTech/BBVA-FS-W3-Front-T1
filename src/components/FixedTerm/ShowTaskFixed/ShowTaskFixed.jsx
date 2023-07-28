import { useNavigate } from "react-router-dom";
import { Grid , Snackbar, Alert} from "@mui/material";
import TypographyInfo from "../TypographyInformation/TypographyInformation";
import StyledButton from "../../buttonStyles/buttonStyles";
import TypographyData from "../TypographyData/TypographyData";
import { CreatFixedTermDialog } from "../CreatFixedTermDialog/CreatFixedTermDialog";
import { useDataContext } from "../FixedTerm";
import { useState } from "react";

export const ShowTaskFixed = () => {
  const [isTransferSucced, setIsTransferSucced] = useState(false);
  const navigate = useNavigate();
  const { fixTermData, setReceivedData } = useDataContext();

  const returnHome = () => {
    navigate("/inicio");
  };

  return (
    <>
      <Grid container spacing={3} textAlign="center">
        <Grid item xs={12}>
          <TypographyInfo>Monto invertido </TypographyInfo>
          <TypographyData>{fixTermData.montoInverito}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Interes obtenido </TypographyInfo>
          <TypographyData>{fixTermData.interes}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Monto total a cobrar</TypographyInfo>
          <TypographyData>{fixTermData.montoTotal}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Inicio del plazo fijo</TypographyInfo>
          <TypographyData>{fixTermData.fechaCreacion}</TypographyData>
        </Grid>
        <Grid item xs={12}>
          <TypographyInfo>Finalizacion del plazo fijo</TypographyInfo>
          <TypographyData>{fixTermData.fechaFinalizacion}</TypographyData>
        </Grid>
        {isTransferSucced && (
          <>
            <Grid item xs={12}>
              <TypographyInfo>Balance de tu cuenta</TypographyInfo>
              <TypographyData>{fixTermData.balance}</TypographyData>
            </Grid>
            <Snackbar open={true} autoHideDuration={10}>
              <Alert
                severity="success"
                sx={{ width: "100%" }}
              >
                El plazo fijo se realizó con éxito
              </Alert>
            </Snackbar>
          </>
        )}
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" spacing={4}>
          <Grid item xs={12} md={5}>
          {!isTransferSucced &&
            <CreatFixedTermDialog setIsTransferSucced={setIsTransferSucced} />
            }
          </Grid>
            <Grid item xs={12} md={2} marginRight={'2vw'}>
              <StyledButton
                onClick={() => {
                  setReceivedData(false);
                }}
              >
                otro
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
