import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import { Grid, Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to right, #4b79a1, #2279A1)",
        width: "100%",
        padding: "0.5rem",
        borderRadius: "20px 20px 0px 0px",
        boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          textAlign={"center"}
          alignSelf={"center"}
        >
          <EmailIcon sx={{color:"white"}}/>
          <br />
          <Typography variant="inherit" color="white">
            consultas@alkywall.com
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          textAlign={"center"}
          alignSelf={"center"}
        >
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            color={"inherit"}
          >
            <InstagramIcon
              fontSize="large"
              sx={{
                mr: "0.7rem",
                color:"white",
                "&:hover": {
                  color: "#A32460",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  transform: "translateY(-2px)",
                  transition: "transform 0.3s ease",
                },
              }}
            />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            color={"inherit"}
          >
            <FacebookIcon
              fontSize="large"
              sx={{
                mr: "0.7rem",
                color:"white",
                "&:hover": {
                  color: "#3b5998",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  transform: "translateY(-2px)",
                  transition: "transform 0.3s ease",
                },
              }}
            />
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          textAlign={"center"}
          alignSelf={"center"}
        >
          <Typography variant="inherit" color="white">
            Tech Titans 2023
            <br />
            ©Todos los derechos reservados.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
