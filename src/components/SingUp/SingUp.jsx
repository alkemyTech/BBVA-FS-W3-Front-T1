import * as React from "react";
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

export const SingUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
      console.log(data);
    }

    return (
      <>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1C6875" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    {...register("nombre", {
                      required: 'El nombre es requerido',
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: 'el nombre no puede incluir numeros ni espacios'
                      }})}
                    autoComplete="given-name"
                    name="nombre"
                    required
                    fullWidth
                    id="nombre"
                    label="nombre"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    {...register("apellido", {
                      required: 'El apellido es requerido',
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: 'el apellido no puede incluir numeros ni espacios'
                      }})}
                    required
                    fullWidth
                    id="apellido"
                    label="apellido"
                    name="apellido"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    {...register("edad", {
                        required: 'campo requerido',
                        pattern: {
                          value:  /^[0-9]+$/,
                          message: 'la edad solo acepta numeros'
                        }})}
                    autoComplete="given-name"
                    name="edad"
                    required
                    fullWidth
                    id="edad"
                    label="edad"
                    autoFocus
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>



                {(errors.edad || errors.apellido || errors.nombre) &&
                    <Grid item xs={12}>
                        {errors.nombre && <Alert severity="error">{errors.nombre.message}</Alert>}
                        {errors.apellido && <Alert severity="error">{errors.apellido.message}</Alert>}
                        {errors.edad && <Alert severity="error">{errors.edad.message}</Alert>}
                    </Grid>

                }




                <Grid item xs={12}>
                  <TextField
                    {...register("email", {
                      required: 'el mail es requerido',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'El formato de mail es incorrecto',
                      }
                    })}
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                  {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("contraseña", {required: 'la contraseña es requerida'})}
                    required
                    fullWidth
                    name="contraseña"
                    label="contraseña"
                    type="contraseña"
                    id="contraseña"
                    autoComplete="new-contraseña"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                   Ya tiene una cuetna creada ? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    );
  };