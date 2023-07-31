import React from "react";
import { Dialog, Typography, Grid } from "@mui/material";
import "../UserInfo.css";

export const FixedTerm = ({ openFixedTerm, handleCloseFixedTerm, term }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <Dialog
        
        open={openFixedTerm}
        onClose={handleCloseFixedTerm}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <Grid container className="fixed-term">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            <b> Capital de origen</b> $ {term.amount.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            <b>Interés</b> ${" "} {term.interest.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            <b> Monto final</b> ${" "} {(term.amount + term.interest).toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            <b> Creación:</b> {formatDate(term.creationDate)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            <b> Vencimiento:</b> {formatDate(term.closingDate)}
          </Typography>
        </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
