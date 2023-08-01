import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WalletIcon from "@mui/icons-material/Wallet";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "./Header.css";
import { useSelector } from "react-redux";
import { DialogLogout } from "./DialogLogout/DialogLogout";

export const Header = () => {
  const [logout, setLogout] = useState(false);

  const pages = [
    "inicio",
    "depositos",
    "transferencias",
    "pagos",
    "plazo fijo",
  ];
  const [anchorEl, setAnchorEl] = useState(null);

  const userName = useSelector((state) => state.user.userName);

  const handleClickLogout = () => {
    setLogout(true);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to left, rgba(75, 121, 161, 0.8), rgba(40, 62, 81,0.8))",
          boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Toolbar>
          <img src={"../../../public/icon.svg"} style={{maxWidth:"2.5rem", marginRight:"1rem", marginBottom:".7rem"}}/>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, letterSpacing: ".3rem" }}
          >
            AlkyWall
          </Typography>
          {userName && (
            <>
              {/* Menú desplegable en pantallas hasta lg */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ display: { xs: "block", lg: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleMenuClose}>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/${page.replace(/\s+/g, "-")}`}
                    >
                      {page.toUpperCase()}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ display: { xs: "none", lg: "flex" } }} // Mostrar en pantallas md y ocultar en pantallas xs
              >
                {pages.map((page) => (
                  <Grid
                    item
                    xs={6}
                    md={2}
                    textAlign="center"
                    alignSelf="center"
                    key={page}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/${page.replace(/\s+/g, "-")}`}
                    >
                      <Typography variant="inherit" className="inHover">
                        {page.toUpperCase()}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={3}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/inicio"
                  >
                    <Typography
                      variant="inherit"
                      className="inHover"
                      sx={{ color: "inherit", whiteSpace:"nowrap", mr:"1rem"}}
                    >
                      {userName.toUpperCase()}
                    </Typography>
                  </Link>

                  {/* Icono de AccountCircle que despliega el menú en pantallas hasta lg */}
                  <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}
                    sx={{ display: { xs: "block", lg: "none" } }}
                  >
                    <AccountCircle />
                  </IconButton>

                  <IconButton
                    className="inHover"
                    sx={{ color: "inherit" }}
                    onClick={handleClickLogout}
                    children={<LogoutIcon fontSize="medium" />}
                  />
                </Box>
              </Grid>
            </>
          )}
          {logout && <DialogLogout logout={logout} setLogout={setLogout} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
