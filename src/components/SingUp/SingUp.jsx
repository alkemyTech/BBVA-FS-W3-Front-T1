import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StyledButton from "../buttonStyles/buttonStyles";

export const SingUp = () => {
  const [msgError, setMsgError] = useState();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    console.log(firstName + "" + lastName + "" + email + "" + password);
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log("llegue");
      const userName =
        response.data.data.user.firstName +
        " " +
        response.data.data.user.lastName;
      const token = response.data.data.token;
      const mail = response.data.data.user.email;
      console.log("llegue");
      localStorage.setItem("token", token);
      localStorage.setItem("nombre", userName);
      localStorage.setItem("email", mail);
      localStorage.setItem("singUp", "Su cuenta se creo correctamente");
      console.log("llegue");
      navigate("/inicio");
    } catch (error) {
      const errorStatus = error.response.status;

      if (errorStatus === 400) {
        setMsgError(error.response.data.message);
      } else if (errorStatus === 403) {
        setMsgError("Usuario o contraseña incorrecto");
      }
    }
  };

  return (
    <div style={{minHeight:"78.1vh"}}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "rgba(40, 62, 81,0.8)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            REGISTRARSE
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...register("firstName", {
                    required: "El nombre es requerido",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "el nombre no puede incluir numeros ni espacios",
                    },
                  })}
                  sx={{backgroundColor:"white"}}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  {...register("lastName", {
                    required: "El apellido es requerido",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message:
                        "el apellido no puede incluir numeros ni espacios",
                    },
                  })}
                  sx={{backgroundColor:"white"}}
                  required
                  fullWidth
                  id="lastName"
                  label="apellido"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  {...register("edad", {
                    required: "campo requerido",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "la edad solo acepta numeros",
                    },
                  })}
                  sx={{backgroundColor:"white"}}
                  autoComplete="given-name"
                  name="edad"
                  required
                  fullWidth
                  id="edad"
                  label="edad"
                  inputProps={{ maxLength: 3 }}
                />
              </Grid>

              {(errors.edad || errors.apellido || errors.nombre) && (
                <Grid item xs={12}>
                  {errors.nombre && (
                    <Alert severity="error">{errors.nombre.message}</Alert>
                  )}
                  {errors.apellido && (
                    <Alert severity="error">{errors.apellido.message}</Alert>
                  )}
                  {errors.edad && (
                    <Alert severity="error">{errors.edad.message}</Alert>
                  )}
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: "el mail es requerido",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "El formato de mail es incorrecto",
                    },
                  })}
                  sx={{backgroundColor:"white"}}
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <Alert severity="error">{errors.email.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: "la contraseña es requerida",
                  })}
                  sx={{backgroundColor:"white"}}
                  required
                  fullWidth
                  name="password"
                  label="contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "rgba(40, 62, 81,0.8)",
                "&:hover": { backgroundColor: "rgba(75, 121, 161, 0.9)" },
              }}
            >
              Registrate
            </Button>

            {msgError && <Alert severity="error">{msgError}</Alert>}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                ¿Ya tiene una cuenta creada? Inicie sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
