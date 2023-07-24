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

  const handleNext = () => {
    setError(null);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setError(null);
    setActiveStep(activeStep - 1);
  };

  const SearchCbuSubmit = async (data) => {
    console.log(data);
    const requestBody = {
      cbu: data.cbu,
    };
    //--------------
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("llegue");
    axios
      .get(`http://localhost:8080/accounts/cbu/${data.cbu}`, config)
      .then((response) => {
        console.log(response.data);
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
      })
      .catch((error) => {
        console.log(error);
        console.log(error.data);
        setError(error);
        setUserCbu(null);
      });
    //--------------
  };

  const SearchCbuHandleNext = () =>{
    if (userCbu){
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
        console.log(error);
        console.log(error.data);
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
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 } }}>
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
                <Alert severity="error">{error.response.data.message}</Alert>
              )}
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};
