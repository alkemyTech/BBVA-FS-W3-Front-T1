import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { SearchCbu } from "./SearchCbu/SearchCbu";
import { SelectAmount } from "./SelectAmount/SelectAmount";
import { TransferResume } from "./TransferResume/TransferResume";
import axios from "axios";
import StyledButton from "../buttonStyles/buttonStyles";
import { TransferSucces } from "./TransferSucces/TransferSucces";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tokenExpired } from "../../utils/tokenExpired";
import { Loader } from "../Loader/Loader";

const steps = ["Buscar Cuenta", "importe", "Resumen"];

const dataAccount = {
  id: 0,
  firstName: "",
  lastName: "",
  cbu: "",
  currency: "",
  amount: 0,
};

export const TransferCheckOut = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [userCbu, setUserCbu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    setError(null);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setError(null);
    setActiveStep(activeStep - 1);
  };

  const SearchCbuSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    const requestBody = {
      cbu: data.cbu,
    };
    //--------------
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`http://localhost:8080/accounts/cbu/${data.cbu}`, config)
      .then((response) => {
        setIsLoading(false);
        setError(null);
        dataAccount.cbu = data.cbu;
        dataAccount.currency = response.data.data.currency;
        dataAccount.id = response.data.data.id;
        dataAccount.firstName = response.data.data.userId.firstName;
        dataAccount.lastName = response.data.data.userId.lastName;
        setUserCbu({
          firstName: response.data.data.userId.firstName,
          lastName: response.data.data.userId.lastName,
          currency: response.data.data.currency,
        });
        let currency = ""
        if (response.data.data.currency === "ARS"){
          currency = localStorage.getItem("idArs");}
        else{
          currency = localStorage.getItem("idUsd");}
        (!currency) && setError("Usted no posee una cuenta en ese tipo de moneda")
        console.log(currency);
        console.log( response.data.data.id);
        console.log( currency === response.data.data.id);
        (currency == response.data.data.id) && setError("No puede enviarse dinero a uno mismo")
      })
      .catch((error) => {
        setIsLoading(false);
        if(error.response.status === 403){
          tokenExpired(navigate,dispatch);
        }
        setError(error.response.data.message);
        setUserCbu(null);
      });
  };

  const SearchCbuHandleNext = () =>{
    if (userCbu && !error){
      handleNext();
    }
  }

  const SelectAmountSubmit = (data) => {
    console.log(data);
    dataAccount.amount = data.amount;

    handleNext();
  };

  const ResumeSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const idAccount = dataAccount.id;
    const requestBody = {
      id: idAccount,
      amount: dataAccount.amount,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const apiUrl =
      dataAccount.currency === "ARS"
        ? "http://localhost:8080/transactions/sendArs"
        : "http://localhost:8080/transactions/sendUsd";

    axios
      .post(apiUrl, requestBody, config)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data.data[0]);
        setError(null);
        handleNext();
      })
      .catch((error) => {
        if(error.response.status === 403){
          tokenExpired(navigate,dispatch);
        }
        setError(error);
      });
  };

  const newTransfer = () => {
    dataAccount.id = 0;
    dataAccount.amount= 0;
    dataAccount.firstName = "";
    dataAccount.lastName = "";
    dataAccount.currency = "";
    setUserCbu(null);
    setActiveStep(0);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <SearchCbu
            SearchCbuSubmit={SearchCbuSubmit}
            handleNext={SearchCbuHandleNext}
            userCbu={userCbu}
          />
        );
      case 1:
        return (
          <SelectAmount
            SelectAmountSubmit={SelectAmountSubmit}
            firstName={dataAccount.firstName}
            lastName={dataAccount.lastName}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <TransferResume
            dataTransfer={dataAccount}
            handleBack={handleBack}
            ResumeSubmit={ResumeSubmit}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <div style={{ minHeight: "81vh" }}>
      {isLoading ?

      <Loader loader={isLoading}/>
      :
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
                sx={{
                  my: { xs: 3, md: 6 },
                  p: { xs: 2, md: 5 },
                  boxShadow: "5",
                  borderRadius: "20px 20px",
                }}
              >
          <Typography component="h1" variant="h4" align="center">
            Transferencia
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <TransferSucces response={response} newTrasfer={newTransfer}/>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              {error && (
                <Box marginTop={'10px'}>
                <Alert severity="error" >{error}</Alert>
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>}
    </div>
  );
};
