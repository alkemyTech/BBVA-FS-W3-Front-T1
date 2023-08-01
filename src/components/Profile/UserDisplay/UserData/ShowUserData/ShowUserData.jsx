import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const ShowUserData = ({email}) => {
  const userName = useSelector((state) => state.user.userName);

  return (
    <>
      <Grid container direction={"row"} alignItems={"center"} spacing={3} marginLeft={"7vw"}>
        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"flex-start"}>
            <Typography variant="h6" marginRight={"1vw"}>
              Nombre:
            </Typography>
            <Typography variant="h6">
              <i>{userName.split(" ")[0]}</i>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"flex-start"}>
            <Typography variant="h6" marginRight={"1vw"}>
              Apellido:
            </Typography>
            <Typography variant="h6">
              <i>{userName.split(" ")[1]}</i>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"flex-start"}>
            <Typography variant="h6" marginRight={"1vw"}>
              Email:
            </Typography>
            <Typography variant="h6">
              <i>{email}</i>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
