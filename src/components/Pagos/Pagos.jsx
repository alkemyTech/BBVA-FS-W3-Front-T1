import {
  Alert,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
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
  const [currency, setCurrency] = useState("");
  const [services, setServices] = useState("GAS");
  const [otros, setOtros] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validation, setValidation] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currencies = [{ value: "ARS" }, { value: "USD" }];
  const utilities = [
    { value: "GAS" },
    { value: "LUZ" },
    { value: "AGUA" },
    { value: "INTERNET" },
    { value: "OTROS" },
  ];

  const onChangeAmount = (e) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setErrorMessage("");
      setValidation(false);
      setAmount(e.target.value);
    } else {
      setErrorMessage("Solo puede ingresar números en este campo");
      setValidation(true);
    }
  };
  const onChangeCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const onChangeServices = (e) => {
    setServices(e.target.value);
  };

  const onChangeOtros = (e) => {
    if (/^[A-Za-z\s]*$/.test(e.target.value)) {
      setErrorMessage("");
      setValidation(false);
      setOtros(e.target.value);
    } else {
      setErrorMessage("Solo puede ingresar letras en este campo");
      setValidation(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidation(false);
    setErrorMessage(false);
    setLoader(true);

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
      description: otros ? otros : services,
    };

    const apiUrl = "http://localhost:8080/transactions/payment";

    axios
      .post(apiUrl, requestBody, config)
      .then((response) => {
        const balanceArs = response.data.data.updatedAccount.balance;
        const balanceUsd = response.data.data.updatedAccount.balance;
        currency === "ARS"
          ? localStorage.setItem("balanceArs", balanceArs)
          : localStorage.setItem("balanceUsd", balanceUsd);
        setData(response.data.data);
        setOtros("");
        setAmount("");
        setServices("GAS");
        setCurrency("ARS");
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
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
      {data != "" ? (
        <RespuestaPagos
          data={data}
          setData={setData}
        />
      ) : (
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
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h5"
                        mb={4}
                        sx={{ letterSpacing: ".1rem" }}
                      >
                        <b>PAGÁ TUS SERVICIOS</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} mt={3}>
                      <TextField
                        label="Monto"
                        required
                        variant="outlined"
                        onChange={onChangeAmount}
                        value={amount}
                        sx={{ mr: "1rem" }}
                      />
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Cuenta"
                        defaultValue=""
                        helperText="¿Con qué moneda?"
                        onChange={onChangeCurrency}
                      >
                        {currencies.map((currency) => (
                          <MenuItem key={currency.value} value={currency.value}>
                            {currency.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} mt={2} sx={{ minWidth: "22rem" }}>
                      <TextField
                        select
                        label="Servicio"
                        required
                        defaultValue="GAS"
                        helperText="Seleccione el servicio a abonar"
                        onChange={onChangeServices}
                        fullWidth
                      >
                        {utilities.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                      {services === "OTROS" && (
                        <Grid item xs={12} mt={2} sx={{ minWidth: "22rem" }}>
                          <TextField
                            label="Servicio"
                            required
                            value={otros}
                            onChange={onChangeOtros}
                            helperText="Indique el servicio a abonar"
                            fullWidth
                          />
                        </Grid>
                      )}
                    </Grid>
                    {amount && currency && services && (
                      <Grid item xs={12} mt={1} sx={{ minWidth: "22rem" }}>
                        <StyledButton variant="contained" type="submit">
                          PAGAR
                        </StyledButton>
                      </Grid>
                    )}
                    {validation && (
                      <Alert sx={{ mt: "1rem" }} severity="error">
                        {errorMessage}
                      </Alert>
                    )}
                  </form>
                </Grid>
              </Paper>
            </Container>
          )}
        </>
      )}
    </>
  );
};
