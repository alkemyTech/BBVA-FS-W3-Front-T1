import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserName, addUserId } from "../../redux/userSlice";
import { Loader } from "../Loader/Loader";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
      setTimeout(() => {
        dispatch(addUserId(id));
        dispatch(addUserName(userName));
        setLoader(false);
        navigate("/inicio");
      }, 1000);
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
    } else {
      localStorage.clear();
      dispatch(addUserId(""));
      dispatch(addUserName(""));
    }
  }, []);

  return (
    <div style={{ minHeight: "85.6vh" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        pt={8}
      >
        {loader && <Loader loader={loader} />}

        <Grid item xs={12}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            textAlign={"center"}
            maxWidth={"25rem"}
          >
            <Avatar sx={{ bgcolor: "#2279A1", mx: "11rem", mb: ".7rem" }}>
              <Typography sx={{ pt: 0.5 }}>
                <LockOpenIcon />
              </Typography>
            </Avatar>
            <Typography component="h1" variant="h5" pb={3}>
              INICIO DE SESIÓN
            </Typography>
            <TextField
              label="Correo electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
              required
              fullWidth
              sx={{ mb: "1rem", backgroundColor: "white" }}
              autoFocus
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChangePassword}
                sx={{ mb: "1rem", backgroundColor: "white" }}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#4b79a1",
                width: "50%",
                minWidth: "10rem",
                mb: "0.5rem",
                "&:hover": { backgroundColor: "#2279A1" },
              }}
            >
              Iniciar sesión
            </Button>
            <Typography variant="subtitle1">¿No tenés una cuenta?</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4b79a1",
                width: "50%",
                minWidth: "10rem",
                mt: "0.5rem",
                "&:hover": { backgroundColor: "#2279A1" },
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
      </Grid>
    </div>
  );
};
