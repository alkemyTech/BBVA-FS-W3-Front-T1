import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WalletIcon from "@mui/icons-material/Wallet";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export const Header = ({ userName, setUserName, setJwt }) => {
  const pages = ["home", "deposito", "transferencia", "plazo fijo"];

  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("email");
    setUserName("");
    setJwt("");
    navigate("/");
  };

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
          {userName && (
            <>
              <Grid container>
                {pages.map((page) => (
                  <Grid
                    item
                    xs={2}
                    textAlign={"center"}
                    alignSelf={"center"}
                    paddingLeft={"4rem"}
                    key={page}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/${page.replace(/\s+/g, "-")}`}
                    >
                      <Typography variant="subtitle1">
                        {page.toUpperCase()}
                      </Typography>
                    </Link>
                  </Grid>
                ))}

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
                      onClick={handleClickLogout}
                    >
                      LogOut
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
