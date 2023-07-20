import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import { Grid, Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2BA0B5",
        position: "fixed",
        bottom: "0",
        width: "100%",
        padding: "0.5rem",
      }}
    >
      <Grid container>
        <Grid item xs={4} textAlign={"center"} alignSelf={"center"}>
          <Typography variant="body1" color="#0D2F36">
            Tech Titans 2023
            <br />
            ©Todos los derechos reservados.
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign={"center"} alignSelf={"center"}>
          <EmailIcon />
          <br />
          <Typography variant="body1" color="#0D2F36">
            consultas@alkywall.com
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign={"center"} alignSelf={"center"}>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            color={"inherit"}
          >
            <InstagramIcon fontSize="large" sx={{mr:"0.7rem"}} />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            color={"inherit"}
          >
            <FacebookIcon fontSize="large" />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};