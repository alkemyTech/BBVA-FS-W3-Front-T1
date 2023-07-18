import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WalletIcon from "@mui/icons-material/Wallet";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export const Header = ({ userName }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#2BA0B5" }}>
        <Toolbar>
          <WalletIcon size="large" sx={{ mr: 2 }} />
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, letterSpacing: ".3rem" }}
          >
            AlkyWall
          </Typography>
          {userName != "" ? (
            <>
              <Grid container>
                <Grid item xs={2} textAlign={"right"} alignSelf={"center"}>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={"/home"}
                  >
                    <Typography variant="subtitle1">HOME</Typography>
                  </Link>
                </Grid>
                <Grid item xs={2} textAlign={"right"} alignSelf={"center"}>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={"/deposito"}
                  >
                    <Typography variant="subtitle1">DEPOSITO</Typography>
                  </Link>
                </Grid>
                <Grid item xs={2} textAlign={"right"} alignSelf={"center"}>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={"/transferencia"}
                  >
                    <Typography variant="subtitle1">TRANSFERENCIA</Typography>
                  </Link>
                </Grid>
                <Grid item xs={2} textAlign={"right"} alignSelf={"center"}>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={"/plazo-fijo"}
                  >
                    <Typography variant="subtitle1">PLAZO FIJO</Typography>
                  </Link>
                </Grid>

                <Grid item xs={4}>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/home"}
                    >
                      <Typography variant="h6">{userName}</Typography>
                    </Link>
                    <AccountCircle sx={{ marginX: "1rem" }} />

                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{ fontWeight: "bold" }}
                      href="/"
                    >
                      LogOut
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
