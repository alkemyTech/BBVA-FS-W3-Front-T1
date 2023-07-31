import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Alert, Box, Container, Divider, Grid, Paper } from "@mui/material";
import dollarImg from "../../assets/img/dollar.jpg";
import pesoImg from "../../assets/img/pesosArg.jpg";
import { useState } from "react";
import { tokenExpired } from "../../utils/tokenExpired";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import { DialogCrearCuenta } from "./DialogCrearCuenta/DialogCrearCuenta";
import { CustomCard } from "./CustomCard/CustomCard";
import { RespuestaCrearCuenta } from "./RespuestaCrearCuenta/RespuestaCrearCuenta";

export const CrearCuenta = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [validation, setValidation] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [currency, setCurrency] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickArs = () => {
    setCurrency("ARS");
    setConfirmar(true);
  };

  const handleClickUsd = () => {
    setCurrency("USD");
    setConfirmar(true);
  };

  const handleClickCancelar = () => {
    setErrorMsg("");
    setValidation(false);
    setCurrency("");
    setConfirmar(false);
  };

  const handleClickConfirmar = async (e) => {
    setConfirmar(false);
    setErrorMsg("");
    setValidation("");
    setLoader(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const requestBody = {
      currency: currency,
    };

    const apiUrl = "http://localhost:8080/accounts";

    axios
      .post(apiUrl, requestBody, config)
      .then((response) => {
        setData(response.data.data);
        setLoader(false);
        setValidation(true);
      })
      .catch((error) => {
        setLoader(false);
        if (error.response.status === 403) {
          tokenExpired(navigate, dispatch);
        }
        setErrorMsg(error.response.data.message);
        setValidation(true);
      });
  };

  return (
    <div style={{ minHeight: "85vh" }}>
      {data != "" ? (
        <RespuestaCrearCuenta data={data} setData={setData} />
      ) : (
        <>
          {loader ? (
            <Loader loader={loader} />
          ) : (
            <>
              {confirmar && (
                <>
                  <DialogCrearCuenta
                    currency={currency}
                    handleClickConfirmar={handleClickConfirmar}
                    handleClickCancelar={handleClickCancelar}
                    confirmar={confirmar}
                  />
                </>
              )}
              <div>
                <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 3 }}>
                  <Paper
                    sx={{
                      my: { xs: 3 },
                      p: { xs: 2, md: 3 },
                      boxShadow: "5",
                      borderRadius: "20px",
                      backgroundColor:"rgba(255, 255, 255, 1)"
                    }}
                  >
                    <Typography variant="h4" align="center" pt={"1.5rem"}>
                      Abrí tu cuenta
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"space-around"}
                      pt={"2rem"}
                      pb={"2rem"}
                    >
                      <CustomCard handleClick={handleClickArs}>
                        <CardMedia
                          component="img"
                          sx={{ height: "130px", width: "100%", p: "1rem 1rem 0.1rem 1rem" }}
                          src={pesoImg}
                          alt="Peso Argentino"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            textAlign={"center"}
                          >
                            CUENTA EN PESOS
                          </Typography>
                          <Divider sx={{ mb: ".5rem" }} />
                          <Typography variant="body2" color="text.secondary">
                            <b>Creá tu cuenta en pesos</b>
                            <br />
                            La misma se abrirá con un límite de transacción de:
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign={"center"}
                          >
                            <b>$300000</b>
                          </Typography>
                        </CardContent>
                      </CustomCard>
                      <CustomCard handleClick={handleClickUsd}>
                        <CardMedia
                          component="img"
                          sx={{ height: "130px", width: "100%", p: "1rem 1rem 0.1rem 1rem" }}
                          src={dollarImg}
                          alt="Dólar estadounidense"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            textAlign={"center"}
                          >
                            CUENTA EN DÓLARES
                          </Typography>
                          <Divider sx={{ mb: ".5rem" }} />
                          <Typography variant="body2" color="text.secondary">
                            <b>Creá tu cuenta en dólares</b>
                            <br />
                            La misma se abrirá con un límite de transacción de:
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign={"center"}
                          >
                            <b>U$D 1000</b>
                          </Typography>
                        </CardContent>
                      </CustomCard>
                    </Box>
                    {validation && (
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        pb=".5rem"
                      >
                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                      </Grid>
                    )}
                  </Paper>
                </Container>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
