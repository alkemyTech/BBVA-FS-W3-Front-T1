import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import { Grid, Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(to left, rgba(75, 121, 161, 0.8), rgba(40, 62, 81,0.8))",
        width: "100%",
        padding: "1rem",
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
          <EmailIcon sx={{color:"#f8f3f6"}} fontSize="inherit"/>
          <br />
          <Typography variant="body2" color="#f8f3f6">
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
              fontSize="medium"
              sx={{
                mr: "0.7rem",
                color:"#f8f3f6",
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
              fontSize="medium"
              sx={{
                mr: "0.7rem",
                color:"#f8f3f6",
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
          <Typography variant="body2" color="#f8f3f6">
          ©2023 Tech Titans
          <br/>
          Argentina 
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
