import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserName, addUserId } from "../../redux/userSlice";
import { Loader } from "../Loader/Loader";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      setValidation(false);
      setMsgError("");

      const { id, firstName, lastName } = response.data.data.user;
      const userName = firstName + " " + lastName;
      const token = response.data.data.token;
      const mail = response.data.data.user.email;

      localStorage.setItem("token", token);
      localStorage.setItem("nombre", userName);
      localStorage.setItem("email", mail);
      localStorage.removeItem("tokenExpired");
      dispatch(addUserId(id));
      dispatch(addUserName(userName));
      setLoader(false)
      navigate("/home");
    } catch (error) {
      setLoader(false);
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

  useEffect(() => {
    const tokenExpired = localStorage.getItem("tokenExpired");
    if (tokenExpired) {
      setMsgError(tokenExpired);
      setValidation(true);
    }
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      padding={"2.5rem"}
    >
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <Grid item xs={12}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            textAlign={"center"}
            maxWidth={"30rem"}
          >
            <TextField
              label="Correo electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
              required
              fullWidth
              sx={{ mb: "1rem" }}
            />
            <TextField
              label="Contraseña"
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
            <Typography variant="subtitle1">No posee cuenta?</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1C6875",
                width: "50%",
                minWidth: "10rem",
                "&:hover": { backgroundColor: "#2BA0B5" },
              }}
              onClick={() => {
                navigate("sing-up");
              }}
            >
              Registrarse
            </Button>
            {validation && (
              <Alert sx={{ mt: "1rem" }} severity="error">
                {" "}
                {msgError}{" "}
              </Alert>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
