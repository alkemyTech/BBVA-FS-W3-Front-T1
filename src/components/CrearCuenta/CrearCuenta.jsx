import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Alert, Box, CardActionArea, Grid } from "@mui/material";
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

export const CrearCuenta = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [validation, setValidation] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState(false);
  const [currency, setCurrency] = useState("");
  const [loader, setLoader] = useState(false);

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
        setLoader(false);
        setValidation(true);
        setConfirmationMsg(`Se creó con éxito la cuenta en ${currency}`);
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
    <div style={{minHeight:"85.7vh"}}>
      {loader ? (
        <Loader loader={loader} />
      ) : (
        <>
        {confirmar && <>
              <DialogCrearCuenta
                currency={currency}
                handleClickConfirmar={handleClickConfirmar}
                handleClickCancelar={handleClickCancelar}
                confirmar={confirmar}
              />
            </>}
            <div style={{textAlign:"center"}}>
            <Typography variant="h4" pt={5}>
              CREÁ TU CUENTA
            </Typography>
              <Box display={"flex"} justifyContent={"space-evenly"} pt={"5rem"} textAlign={"center"} paddingX={35}>
                <CustomCard handleClick={handleClickArs}>
                  <CardMedia
                    component="img"
                    sx={{ height: "200px", width: "100%", mb:3}}
                    src={pesoImg}
                    alt="Peso Argentino"
                    
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      CUENTA EN ARS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Creá tu cuenta en pesos</b>
                      <br />
                      La misma se abrirá con un límite de transaccion de $300000
                    </Typography>
                  </CardContent>
                </CustomCard>
                <CustomCard handleClick={handleClickUsd}>
                  <CardMedia
                    component="img"
                    sx={{ height: "200px", width: "100%",mb:3 }}
                    src={dollarImg}
                    alt="Dólar estadounidense"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      CUENTA EN USD
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Creá tu cuenta en dólares</b>
                      <br />
                      La misma se abrirá con un límite de transaccion de $1000
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
                  padding={"2.5rem"}
                >
                  {errorMsg ? (
                    <Alert severity="error">{errorMsg}</Alert>
                  ) : (
                    <Alert severity="success">{confirmationMsg}</Alert>
                  )}
                </Grid>
              )}
            </div>
        </>
      )}
    </div>
  );
};
