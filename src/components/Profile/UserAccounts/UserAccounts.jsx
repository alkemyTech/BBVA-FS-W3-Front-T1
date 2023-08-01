import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Card, CardActionArea, Box } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Movements } from "../Movements/Movements";
import "../UserInfo.css";

export const UserAccounts = ({ accountArs, accountUsd }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUsd, setOpenDialogUsd] = useState(false);
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

  const handleNewAccount = () => {
    navigate("/crearCuenta");
  };

  return (
    <>
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
                  <Typography variant="subtitle1" gutterBottom>
                    <b>Cuenta en pesos</b>
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
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
                      style={{ paddingTop: 4, paddingLeft: 2, marginRight:1}}
                    >
                      Ver movimientos
                    </Typography>
                    
                    <Typography
                      variant="subtitle2"
                      style={{ paddingTop: 4, paddingLeft: 2 }}
                      gutterBottom
                    >
                       | Límite transferencia: $ {accountArs.transactionLimit}
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
                  <Typography variant="subtitle1" gutterBottom>
                    <b>Cuenta en dólares</b>
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    CBU: {accountUsd.cbu}
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
                      style={{ paddingTop: 4, paddingLeft: 2, marginRight:1}}
                    >
                      Ver movimientos
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ paddingTop: 4, paddingLeft: 2 }}
                      gutterBottom
                    >
                    | Límite transferencia: U$D{accountUsd.transactionLimit}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
              <Movements
                openDialog={openDialogUsd}
                handleCloseDialog={handleCloseDialogUsd}
                currency={"USD"}
              />
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};
