import {Alert, Box, Button, Container, Grid, MenuItem,
  Paper, TextField, Typography} from "@mui/material";
import { useState } from "react";
import { tokenExpired } from "../../utils/tokenExpired";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import { RespuestaPagos } from "./RespuestaPagos/RespuestaPagos";
import StyledButton from "../buttonStyles/buttonStyles";

export const Pagos = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ARS");
  const [services, setServices] = useState("LUZ");
  const [errorMessage, setErrorMessage] = useState("");
  const [validation, setValidation] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currencies = [
    { value: "ARS", label: "ARS" },
    { value: "USD", label: "USD" },
  ];
  const utilities = [
    { value: "GAS", label: "GAS" },
    { value: "LUZ", label: "LUZ" },
    { value: "AGUA", label: "AGUA" },
    { value: "WIFI/CABLE", label: "WIFI/CABLE" },
  ];

  const onChangeAmount = (e) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const onChangeCurrency = (e) => {
    setCurrency(e.target.value);
    console.log(e.target.value);
  };

  const onChangeServices = (e)=>{
    setServices(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidation(false);
    setErrorMessage(false);
    setLoader(true)

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const idAccount =
      currency === "ARS"
        ? localStorage.getItem("idArs")
        : localStorage.getItem("idUsd");
    const requestBody = {
      id: idAccount,
      amount: amount,
      currency: currency,
    };
    const apiUrl = "http://localhost:8080/transactions/payment";

    axios
      .post(apiUrl, requestBody, config)
      .then((response) => {
        setTimeout(() => {
          setLoader(false)
          setData(requestBody)
        }, 2000);
        console.log(response);
      })
      .catch((error) => {
        setLoader(false)
        setValidation(true);
        if (error.response.status === 403) {
          tokenExpired(navigate, dispatch);
        }
        setErrorMessage(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <>
    {data != "" ? 
    (
    <RespuestaPagos data={data} setData={setData} services={services}/>
    )
    :
    (
      <>
      {loader ? (
        <Loader loader={loader} />
      ) : (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 } }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            textAlign={"center"}
            pt={0}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <Typography variant="h5" mb={4} sx={{ letterSpacing: ".1rem" }}>
                  <b>PAGÁ TUS SERVICIOS</b>
                </Typography>
              </Grid>
              <Grid item xs={12} mt={3}>
                <TextField
                  label="Monto *"
                  variant="outlined"
                  onChange={onChangeAmount}
                  value={amount}
                  sx={{ mr: "1rem" }}
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Cuenta"
                  defaultValue="ARS"
                  helperText="¿Con qué moneda?"
                  onChange={onChangeCurrency}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} mt={1} sx={{ minWidth: "22rem" }}>
                <TextField
                  select
                  label="Servicio"
                  defaultValue="LUZ"
                  helperText="¿Qué servicio va a abonar?"
                  onChange={onChangeServices}
                  fullWidth
                >
                  {utilities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} mt={1} sx={{ minWidth: "22rem" }}>
                <StyledButton
                  variant="contained"
                  onClick={handleSubmit}
                >
                  PAGAR
                </StyledButton>
              </Grid>
              {validation && (
                <Alert sx={{ mt: "1rem" }} severity="error">
                  {errorMessage}
                </Alert>
              )}
            </Box>
          </Grid>
        </Paper>
      </Container>
      )}
      </>
    )}
      
    </>
  );
};
