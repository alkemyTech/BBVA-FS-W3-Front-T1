import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import dollarImg from "../../assets/dollar.jpg";
import pesoImg from "../../assets/pesosArg.jpg";
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
    <div style={{ minHeight: "85.6vh" }}>
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
                <Container
                  sx={{ pt: "3rem", display: "flex", justifyContent: "center" }}
                >
                  <Paper
                    sx={{
                      borderRadius: "20px 20px",
                      boxShadow:"5",
                      width: "40vw",
                    }}
                  >
                    <Typography variant="h4" align="center" pt={"1.5rem"}>
                      Abrí tu cuenta
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"space-evenly"}
                      pt={"2rem"}
                      pb={"4rem"}
                      textAlign={"justify"}
                    >
                      <CustomCard handleClick={handleClickArs}>
                        <CardMedia
                          component="img"
                          sx={{ height: "130px", width: "100%", mb: 2 }}
                          src={pesoImg}
                          alt="Peso Argentino"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            component="div"
                          >
                            CUENTA EN PESOS
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <b>Creá tu cuenta en pesos</b>
                            <br />
                            La misma se abrirá con un límite de transacción de{" "}
                            <b>AR$ 300000</b>
                          </Typography>
                        </CardContent>
                      </CustomCard>
                      <CustomCard handleClick={handleClickUsd}>
                        <CardMedia
                          component="img"
                          sx={{ height: "130px", width: "100%", mb: 2 }}
                          src={dollarImg}
                          alt="Dólar estadounidense"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            component="div"
                          >
                            CUENTA EN DÓLARES
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <b>Creá tu cuenta en dólares</b>
                            <br />
                            La misma se abrirá con un límite de transacción de{" "}
                            <b>U$S 1000</b>
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
                        pb="3rem"
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
