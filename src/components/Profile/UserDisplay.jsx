import React from "react";
import {
  Typography,
  Grid,
  IconButton,
  Container,
  Alert,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AddCircle } from "@mui/icons-material";
import "./UserInfo.css";

export const UserDisplay = ({ userData, userBalance, onEdit }) => {
  const accountUsd = userBalance.accountUsd;
  const accountArs = userBalance.accountArs;
  const fixedTerms = userBalance.fixedTerms;

  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          className="exterior"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Grid container>
              <Typography variant="h4" color="initial">
                Mis datos
              </Typography>
              <IconButton aria-label="Edit" onClick={onEdit}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Typography variant="subtitle1" gutterBottom>
              Nombre: {userData.firstName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Apellido: {userData.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {userData.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Contraseña: ******
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <img src="src/assets/profile-picture.svg" alt="perfil" />
          </Grid>
        </Grid>
        <Grid
          container
          className="exterior"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Typography variant="h4" color="initial">
                Mis cuentas
              </Typography>
            </Grid>
          </Grid>

          {accountArs == null ? (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Alert severity="warning">No tenés cuenta en pesos.</Alert>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AddCircle />}
                >
                  Crear
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={4} className="account">
              <Typography variant="subtitle1" gutterBottom>
                CBU: {accountArs.cbu}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Moneda: {accountArs.currency}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Balance: $ {accountArs.balance}
              </Typography>
            </Grid>
          )}
          {accountUsd == null ? (
            <>
              <Alert severity="warning">
                No tenés cuenta en dólares, ¿querés abrirla?
              </Alert>
              <Button
                variant="contained"
                color="primary"
                endIcon={<AddCircle />}
              >
                Crear
              </Button>
            </>
          ) : (
            <Grid item xs={4} className="account">
              <Typography variant="subtitle1" gutterBottom>
                CBU: {accountUsd.cbu}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Moneda: {accountUsd.currency}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Balance: $ {accountUsd.balance}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid
          container
          className="exterior"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4" color="initial">
                Mis plazos fijos
              </Typography>
            </Grid>
          </Grid>

          {fixedTerms.map((data) => (
            <Grid item key={data.id} md={4} className="fixed-term">
              <Typography variant="subtitle1" gutterBottom>
                Monto invertido: $ {data.amount}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Interés a generar: $ {data.interest}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Fecha de finalización: 20/08/2023
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
