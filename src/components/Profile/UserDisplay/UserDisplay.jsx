import React from "react";
import {
  Alert,
  Button,
  Grid,
  Typography,
  Container,
  Card,
  Box,
  IconButton,
  CardActionArea,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "../UserInfo.css";
import StyledButton from "../../buttonStyles/buttonStyles";

export const UserDisplay = ({ userData, userBalance, onEdit }) => {
  const navigate = useNavigate();

  const handleTransferClick = () => {
    navigate("/transferencias");
  };

  const handleDepositClick = () => {
    navigate("/depositos");
  };

  const handleFixedTermClick = () => {
    navigate("/plazo-fijo");
  };

  if (!userBalance || !userData) {
    return <div>Loading...</div>;
  }

  const { accountArs, historyArs, accountUsd, historyUsd, fixedTerms } =
    userBalance;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            <Grid item xs={6} className="card-style">
              <Card>
                <CardActionArea>
                  <Box m={1} p={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Moneda: {accountArs.currency}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      CBU: {accountArs.cbu}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Balance: $ {accountArs.balance}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Límite diario: $ {accountArs.transactionLimit}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          )}

          {accountUsd == null ? (
            <Grid item>
              <Alert severity="warning">No tenés una cuenta en dólares.</Alert>
            </Grid>
          ) : (
            <Grid item xs={6} className="card-style">
              <Card>
                <CardActionArea>
                  <Box m={1} p={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Moneda: {accountUsd.currency}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      CBU: {accountUsd.cbu}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Balance: U$D {accountUsd.balance}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Límite diario: U$D {accountUsd.transactionLimit}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>

        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <StyledButton
              onClick={handleDepositClick}
            >
              DEPÓSITOS
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              onClick={handleTransferClick}
            >
              TRANSFERENCIAS
            </StyledButton>
          </Grid>
        </Grid>
        </Box>
        <Box p={2}>
        <Typography variant="h5" color="initial" gutterBottom>
          Mis plazos fijos
        </Typography>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
        >
          {fixedTerms.map((term) => (
            <Grid item key={term.id} className="card-style">
              <Card>
                <Box m={1} p={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Capital de origen: $ {term.amount}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Interés: $ {term.interest}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Monto total: $ {term.amount + term.interest}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Creación: {formatDate(term.creationDate)}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Vencimiento: {formatDate(term.closingDate)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <StyledButton
              onClick={handleFixedTermClick}
            >
              VER MÁS
            </StyledButton>
          </Grid>
        </Grid>
        </Box>
      </Container>
    </>
  );
};
