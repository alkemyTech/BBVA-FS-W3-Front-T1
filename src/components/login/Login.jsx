import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false)
  const [msgError, setMsgError] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
   setEmail(e.target.value)
   console.log(e.target.value)
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value)
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post("http://localhost:8080/auth/login", {
          email,
          password,
        });
        const respuesta = response;

        const userName = (response.data.data.user.firstName + " " + response.data.data.user.lastName);

        const token = response.data.data.token;

        console.log(respuesta)
        console.log(userName)
        console.log(token)
        
        setValidation(false);
        setMsgError("");
        
        navigate("/home");

    } catch (error) {
        setValidation("");
        console.error("Error al hacer la solicitud:", error);
        const errorStatus = error.response.status
        if(errorStatus === 403){
            setMsgError("Usuario o contraseña incorrecto")
            setValidation(true);
        }else{
            setMsgError(error.message)
            setValidation(true)
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
            sx={{mb:"1rem"}}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            required
            onChange={onChangePassword}
            fullWidth
            sx={{mb:"1rem"}}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1C6875",
              width: "50%",
              minWidth: "10rem",
              mb:"0.5rem"
            }}
          >
            Iniciar sesión
          </Button>
          {validation == true ? (
          <Alert severity="error"> {msgError} </Alert>
        ) : (<></>)
      }

          <Typography variant="subtitle1">No posee cuenta?</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1C6875",
              width: "50%",
              minWidth: "10rem",
            }}
          >
            Registrarse
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
