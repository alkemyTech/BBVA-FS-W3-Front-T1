import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WalletIcon from "@mui/icons-material/Wallet";

export const Header = ({ userName }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#2BA0B5" }}>
        <Toolbar>
        {userName != "" ? (
            <>
              <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, letterSpacing: ".3rem" }}
          >
            AlkyWall
          </Typography>
          <Typography variant="h6">{userName}</Typography>
              <AccountCircle sx={{ marginX: "1rem" }} />
            </>
          ) : (
            <>
            <WalletIcon size="large" sx={{mr:2}}/>
            <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, letterSpacing: ".3rem" }}
          >
            AlkyWall
          </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
