import React from "react";
import {
  TextField,
  Drawer,
  Grid,
  Typography,
  Container,
  Card,
  Box,
  IconButton,
  CardActionArea,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import EditIcon from "@mui/icons-material/Edit";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import SavingsIcon from "@mui/icons-material/Savings";
import PaidIcon from "@mui/icons-material/Paid";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledButton from "../../buttonStyles/buttonStyles";
import { Movements } from "../Movements/Movements";
import { FixedTerm } from "../FixedTerm/FixedTerm";
import "../UserInfo.css";

export const UserDisplay = ({ userData, userBalance, onEdit }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUsd, setOpenDialogUsd] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFixedTerm, setOpenFixedTerm] = useState(false);

  const handleTransferClick = () => {
    navigate("/transferencias");
  };

  const handleDepositClick = () => {
    navigate("/depositos");
  };

  const handleFixedTermClick = () => {
    navigate("/plazo-fijo");
  };

  const handlePayServicesClick = () => {
    navigate("/pagos");
  };

  const toggleDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
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

  const handleOpenDialogUsd = () => {
    setOpenDialogUsd(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogUsd = () => {
    setOpenDialogUsd(false);
  };

  const handleOpenFixedTerm = () => {
    setOpenFixedTerm(true);
  };

  const handleCloseFixedTerm = () => {
    setOpenFixedTerm(false);
  };

  const handleNewAccount = () => {
    navigate("/crearCuenta");
  };

  return (
    <>
      <Container maxWidth="md" className="exterior">
        <Typography variant="h4" color="initial">
          ¡Hola, {userData.firstName}!
        </Typography>

        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="h5" color="initial" style={{ marginRight: 8 }}>
            Tus datos
          </Typography>
          <IconButton aria-label="Toggle First Grid" onClick={toggleDrawer}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: "30%" },
          }}
        >
          <Box p={2}>
            <Grid item xs={6}>
              <img src="src/assets/profile-picture.svg" alt="perfil" />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h5" color="initial" gutterBottom>
                  Tus datos
                </Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="Edit" onClick={onEdit}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  value={userData.firstName}
                  margin="dense"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Apellido"
                  variant="outlined"
                  value={userData.lastName}
                  margin="dense"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={userData.email}
                  margin="dense"
                  disabled
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Contraseña"
                  variant="outlined"
                  type={"password"}
                  value="********"
                  margin="dense"
                />
              </Grid>
              <StyledButton onClick={toggleDrawer}>Volver</StyledButton>
            </Grid>
          </Box>
        </Drawer>

        <Typography variant="h5" color="initial" gutterBottom>
          Tus Cuentas
        </Typography>
        <Grid
          container
          justify="center"
          alignItems="center"
          alignContent="center"
          spacing={2}
        >
          {accountArs == null ? (
            <Grid item xs={12} sm={12} md={6}>
              <Card className="card-style">
                <CardActionArea onClick={handleNewAccount}>
                  <Box m={1} p={2}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "10px",
                      }}
                    >
                      <AddCircleIcon
                        style={{ fontSize: "40px", color: "#4c4f56" }}
                      />
                      <Typography variant="subtitle1" color="initial">
                        ¿Querés abrir una cuenta en pesos?
                      </Typography>
                    </div>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={6}>
              <Card className="card-style">
                <CardActionArea onClick={handleOpenDialog}>
                  <Box m={1} p={2}>
                    <Typography variant="subtitle1" gutterbottom>
                      <b>Cuenta en pesos</b>
                    </Typography>
                    <Typography variant="subtitle2" gutterbottom>
                      CBU: {accountArs.cbu}
                    </Typography>
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ marginTop: "10px" }}
                    >
                      ${" "}
                      {accountArs.balance.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <CurrencyExchangeIcon fontSize="small" />
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        style={{ paddingTop: 4, paddingLeft: 2 }}
                      >
                        Ver movimientos
                      </Typography>
                      <Box component="span" mx={1}>
                        |
                      </Box>
                      <Typography
                        variant="subtitle2"
                        style={{ paddingTop: 4, paddingLeft: 2 }}
                        gutterBottom
                      >
                        Límite diario: $ {accountArs.transactionLimit}
                      </Typography>
                    </Box>
                  </Box>
                </CardActionArea>
                <Movements
                  openDialog={openDialog}
                  handleCloseDialog={handleCloseDialog}
                  currency={"ARS"}
                />
              </Card>
            </Grid>
          )}

          {accountUsd == null ? (
            <Grid item xs={12} sm={12} md={6}>
              <Card className="card-style">
                <CardActionArea onClick={handleNewAccount}>
                  <Box m={1} p={2}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "10px",
                      }}
                    >
                      <AddCircleIcon
                        style={{ fontSize: "40px", color: "#4c4f56" }}
                      />
                      <Typography variant="subtitle1" color="initial">
                        ¿Querés abrir una cuenta en dólares?
                      </Typography>
                    </div>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={6}>
              <Card className="card-style">
                <CardActionArea onClick={handleOpenDialogUsd}>
                  <Box m={1} p={2}>
                    <Typography variant="subtitle1" gutterbottom>
                      <b>Cuenta en dólares</b>
                    </Typography>
                    <Typography variant="subtitle2" gutterbottom>
                      CBU: {accountArs.cbu}
                    </Typography>
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ marginTop: "10px" }}
                    >
                      U$D{" "}
                      {accountUsd.balance.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <CurrencyExchangeIcon fontSize="small" />
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        style={{ paddingTop: 4, paddingLeft: 2 }}
                      >
                        Ver movimientos
                      </Typography>
                      <Box component="span" mx={1}>
                        |
                      </Box>
                      <Typography
                        variant="subtitle2"
                        style={{ paddingTop: 4, paddingLeft: 2 }}
                        gutterBottom
                      >
                        Límite diario:U$D {accountArs.transactionLimit}
                      </Typography>
                    </Box>
                  </Box>
                </CardActionArea>
                <Movements
                  openDialog={openDialogUsd}
                  handleCloseDialog={handleCloseDialogUsd}
                  currency={"ARS"}
                />
              </Card>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h5" color="initial" gutterBottom>
              Tus Plazos fijos
            </Typography>
          </Grid>
          {fixedTerms.map((term) => (
            <Grid item xs={4} key={term.id}>
              <Card className="card-style">
                <CardActionArea onClick={handleOpenFixedTerm}>
                  <Box m={1} p={2}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h4">
                          ${" "}
                          {term.amount.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                          })}
                        </Typography>
                        <Typography
                          variant="overline"
                          color="initial"
                          gutterbottom
                        >
                          Capital de origen
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Vencimiento {formatDate(term.closingDate)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardActionArea>
                <FixedTerm
                  openFixedTerm={openFixedTerm}
                  handleCloseFixedTerm={handleCloseFixedTerm}
                  term={term}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <StyledButton onClick={handleFixedTermClick}>
              SIMULAR Y CONSTITUIR
            </StyledButton>
          </Grid>
        </Grid>

        <Typography variant="h5" color="initial" gutterbottom>
          Accesos rápidos
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <Card
              className="card-style"
              style={{
                padding: "20px",
                width: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleTransferClick}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <MultipleStopIcon
                  style={{ fontSize: "40px", color: "#4c4f56" }}
                />
              </div>
              <Typography variant="subtitle2" color="initial">
                Transferencias
              </Typography>
            </Card>
          </Grid>
          <Grid item>
            <Card
              className="card-style"
              style={{
                padding: "20px",
                width: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleDepositClick}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <PaidIcon style={{ fontSize: "40px", color: "#4c4f56" }} />
              </div>
              <Typography variant="subtitle2" color="initial">
                Depósitos
              </Typography>
            </Card>
          </Grid>
          <Grid item>
            <Card
              className="card-style"
              style={{
                padding: "20px",
                width: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handlePayServicesClick}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <WbIncandescentIcon
                  style={{ fontSize: "40px", color: "#4c4f56" }}
                />
              </div>
              <Typography variant="subtitle2" color="initial">
                Pagar Servicios
              </Typography>
            </Card>
          </Grid>
          <Grid item>
            <Card
              className="card-style"
              style={{
                padding: "20px",
                width: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleFixedTermClick}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <SavingsIcon style={{ fontSize: "40px", color: "#4c4f56" }} />
              </div>
              <Typography variant="subtitle2" color="initial">
                Plazos Fijos
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
