import React from "react";
import {
  TextField,
  Drawer,
  Grid,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledButton from "../../buttonStyles/buttonStyles";
import "../UserInfo.css";
import { FixedTerms } from "../FixedTerm/FixedTerms";
import { UserAccounts } from "../UserAccounts/UserAccounts";
import { QuickAccess } from "../QuickAccess/QuickAccess";

export const UserDisplay = ({ userData, userBalance, onEdit }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFixedTermClick = () => {
    navigate("/plazo-fijo");
  };

  const toggleDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  const { accountArs, historyArs, accountUsd, historyUsd, fixedTerms } =
    userBalance;

  return (
    <>
      <Container maxWidth="md" className="exterior">
        <Typography variant="h4" color="initial" gutterbottom>
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

        <UserAccounts accountArs={accountArs} accountUsd={accountUsd} />
        <FixedTerms fixedTerms={fixedTerms} />
        <QuickAccess />
      </Container>
    </>
  );
};
