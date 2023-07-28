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
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUserId, addUserName } from "../../redux/userSlice";
import "./Header.css";

export const Header = () => {
  const pages = [
    "inicio",
    "depositos",
    "transferencias",
    "pagos",
    "plazo fijo",
  ];
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.userName);

  const handleClickLogout = () => {
    localStorage.clear();
    dispatch(addUserId(""));
    dispatch(addUserName(""));

    navigate("/");
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
          backgroundColor: "#2BA0B5",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
          borderRadius: "0px 0px 20px 20px",
        }}
      >
        <Toolbar>
          <WalletIcon size="large" sx={{ mr: 2 }} />
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
                      <Typography variant="subtitle1" className="inHover">
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
                      variant="subtitle1"
                      className="inHover"
                      sx={{ color: "inherit" }}
                    >
                      {userName.toUpperCase()}
                    </Typography>
                  </Link>

                  {/* Icono de AccountCircle que despliega el menú en pantallas hasta lg */}
                  <IconButton
                    color="inherit"
                    aria-label="menu"
                    className="inHover"
                    onClick={handleMenuOpen}
                    sx={{ display: { xs: "block", lg: "none" } }}
                  >
                    <AccountCircle />
                  </IconButton>

                  <IconButton
                    className="inHover"
                    sx={{ color: "inherit" }}
                    onClick={handleClickLogout}
                    children={<LogoutIcon fontSize="large" />}
                  />
                </Box>
              </Grid>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
