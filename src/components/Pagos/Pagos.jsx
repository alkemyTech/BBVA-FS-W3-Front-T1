import {
  Alert,
  Container,
  Grid,
  InputAdornment,
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
    if (/^(?!0\d*$)\d*(\.\d{0,2})?$/.test(e.target.value)) {
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
    setLoader(true);

    const idAccountArs = localStorage.getItem("idArs");
    const idAccountUsd = localStorage.getItem("idUsd");

    if (
      (currency === "ARS" && idAccountArs) ||
      (currency === "USD" && idAccountUsd)
    ) {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const idAccount = currency === "ARS" ? idAccountArs : idAccountUsd;
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
          setTimeout(() => {
            setData(response.data.data);
            setOtros("");
            setAmount("");
            setServices("GAS");
            setCurrency("ARS");
            setLoader(false);
          }, 1000);
        })
        .catch((error) => {
          setLoader(false);
          setValidation(true);
          if (error.response.status === 403) {
            tokenExpired(navigate, dispatch);
          }
          setErrorMessage(error.response.data.message);
        });
    } else {
      setLoader(false);
      setErrorMessage(`No posee cuenta en ${currency} para realizar el pago`);
      setValidation(true);
    }
  };
  return (
    <div style={{ minHeight: "85vh" }}>
      {data != "" ? (
        <RespuestaPagos data={data} setData={setData} />
      ) : (
        <>
          <Container component="main" maxWidth="sm" sx={{ pt: "3rem" }}>
            <Paper
              sx={{
                p: { xs: 2, md: 5 },
                boxShadow: "5",
                borderRadius: "20px 20px",
              }}
            >
          {loader && <Loader loader={loader} />}

              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                textAlign={"center"}
              >
                <form onSubmit={handleSubmit}>
                  <Grid item xs={12}>
                    <Typography variant="h4" mb={4}>
                      Pagá tus servicios
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mt={3}>
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
                    <TextField
                      label="Monto"
                      required
                      variant="outlined"
                      onChange={onChangeAmount}
                      value={amount}
                      autoComplete="off"
                      sx={{ ml: "1rem", backgroundColor: "white" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {currency === "ARS" ? "$" : "U$S"}
                          </InputAdornment>
                        ),
                      }}
                    />
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
                      <Grid
                        item
                        xs={12}
                        mt={2}
                        sx={{ minWidth: "22rem", mb: "1rem" }}
                      >
                        <TextField
                          label="Servicio"
                          required
                          value={otros}
                          onChange={onChangeOtros}
                          helperText="Indique el servicio a abonar. Máx(15)"
                          inputProps={{
                            maxLength: 15,
                          }}
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
        </>
      )}
    </div>
  );
};
