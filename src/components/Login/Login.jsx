import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = ({ setUserName, setJwt }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);
  const [msgError, setMsgError] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      setValidation(false);
      setMsgError("");

      const userName =
        response.data.data.user.firstName +
        " " +
        response.data.data.user.lastName;
      const token = response.data.data.token;
      const mail = response.data.data.user.email;
      localStorage.setItem("token", token);
      localStorage.setItem("nombre", userName);
      localStorage.setItem("email", mail);
      setUserName(userName);
      setJwt(token);
      navigate("/home");
    } catch (error) {
      const errorStatus = error.response.status;
      setValidation("");
      setMsgError("");
      setValidation(true);

      if (errorStatus === 400) {
        setMsgError(error.response.data.message);
      } else if (errorStatus === 403) {
        setMsgError("Usuario o contraseña incorrecto");
      }
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      padding={"2.5rem"}
    >
      <Grid item xs={12}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          textAlign={"center"}
          maxWidth={"30rem"}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
            required
            fullWidth
            sx={{ mb: "1rem" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            required
            onChange={onChangePassword}
            fullWidth
            sx={{ mb: "1rem" }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1C6875",
              width: "50%",
              minWidth: "10rem",
              mb: "0.5rem",
              "&:hover": { backgroundColor: "#2BA0B5" },
            }}
          >
            Iniciar sesión
          </Button>
          {validation && <Alert severity="error"> {msgError} </Alert>}

          <Typography variant="subtitle1">No posee cuenta?</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1C6875",
              width: "50%",
              minWidth: "10rem",
              "&:hover": { backgroundColor: "#2BA0B5" },
            }}
            onClick={() => {navigate("sing-up")}}
          >
            Registrarse
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
