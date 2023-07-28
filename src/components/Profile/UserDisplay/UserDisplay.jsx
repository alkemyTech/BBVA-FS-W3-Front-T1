import React from "react";
import {
  Dialog,
  Grid,
  Typography,
  Container,
  Card,
  Box,
  IconButton,
  CardActionArea
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../UserInfo.css";
import StyledButton from "../../buttonStyles/buttonStyles";
import { Movements } from "../Movements/Movements";

export const UserDisplay = ({ userData, userBalance, onEdit }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUSD, setOpenDialogUSD] = useState(false);

  const handleTransferClick = () => {
    navigate("/transferencias");
  };

  const handleDepositClick = () => {
    navigate("/depositos");
  };

  const handleFixedTermClick = () => {
    navigate("/plazo-fijo");
  };

  const { accountArs, historyArs, accountUsd, historyUsd, fixedTerms } =
    userBalance;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
  
      return `${day}/${month}/${year}`;
    };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOpenDialogUSD = () => {
    setOpenDialogUSD(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogUSD = () => {
    setOpenDialogUSD(false);
  };

  return (
    <>
      <Container maxWidth="md" className="exterior">
        <Typography variant="h4" color="initial">
          ¡Hola, {userData.firstName}!
        </Typography>
        <Box p={2}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
            wrap="nowrap"
          >
            <Grid item xs={6}>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Typography variant="h5" color="initial" gutterBottom>
                    Mis datos
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton aria-label="Edit" onClick={onEdit}>
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Card>
                <Box m={1} p={2}>
                  <Typography variant="subtitle1" color="initial">
                    Nombre: {userData.firstName}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    Apellido: {userData.lastName}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    Email: {userData.email}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    Contraseña: ********
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <img src="src/assets/profile-picture.svg" alt="perfil" />
            </Grid>
          </Grid>
        </Box>
        <Box p={2}>
          <Typography variant="h5" color="initial" gutterBottom>
            Mis cuentas
          </Typography>
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
            spacing={4}
          >
            {accountArs == null ? (
              <Grid item>
                <Alert severity="warning">No tenés una cuenta en pesos.</Alert>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={6} className="card-style">
                <Card>
                  <CardActionArea onClick={handleOpenDialog}>
                    <Box m={1} p={2}>
                    <Typography variant="h5" gutterBottom >
                        Saldo: $ {accountArs.balance}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Moneda: Pesos
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        CBU: {accountArs.cbu}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Límite diario: $ {accountArs.transactionLimit}
                      </Typography>
                    </Box>
                  </CardActionArea>
                  <Movements  openDialog={openDialog} handleCloseDialog={handleCloseDialog} currency={"ARS"}/>
                  </Card>
              </Grid>
            )}

            {accountUsd == null ? (
              <Grid item>
                {/*<Alert severity="warning">No tenés una cuenta en dólares.</Alert>*/}
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={6} className="card-style">
                <Card>
                  <CardActionArea onClick={handleOpenDialogUSD}>
                    <Box m={1} p={2}>
                    <Typography variant="h5" gutterBottom>
                        Saldo: U$D {accountUsd.balance}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Moneda: Dólares
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        CBU: {accountUsd.cbu}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Límite diario: U$D {accountUsd.transactionLimit}
                      </Typography>
                    </Box>
                  </CardActionArea>
                  <Movements  openDialog={openDialogUSD} handleCloseDialog={handleCloseDialogUSD} currency={"USD"} />
                </Card>
              </Grid>
            )}
          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <StyledButton onClick={handleDepositClick}>
                DEPÓSITOS
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton onClick={handleTransferClick}>
                TRANSFERENCIAS
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton
                variant="contained"
                type="button"
                onClick={() => navigate("/crearCuenta")}
              >
                CrearCuenta
              </StyledButton>
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h5" color="initial" gutterBottom>
              Mis plazos fijos
            </Typography>
          </Grid>

          {fixedTerms.map((term) => (
            <Grid item xs={4}>
              <Card
                key={term.id}
                sx={{
                  margin: "10px",
                  padding: "1rem",
                  boxShadow: "-1px 1px 10px 5px rgba(0,0,0,0.71);",
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      <b> Capital de origen:</b> $ {term.amount}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      <b>Interés:</b> $ {term.interest}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      <b> Monto total:</b> $ {term.amount + term.interest}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      <b> Creación:</b> {formatDate(term.creationDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      <b> Vencimiento:</b> {formatDate(term.closingDate)}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <StyledButton onClick={handleFixedTermClick}>VER MÁS</StyledButton>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
