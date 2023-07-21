import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { SearchCbu } from "./SearchCbu/SearchCbu";
import { SelectAmount } from "./SelectAmount/SelectAmount";
import { TransferResume } from "./TransferResume/TransferResume";
import axios from "axios";

const steps = ["Buscar Cuenta", "importe", "Resumen"];

const dataAccount = {
  firstName: "Evaristo",
  lastName: "Compagnucci",
  cbu: "1234567890123456789012",
  currency: "ARS",
  amount: 10.0,
};

export const TransferCeckOut = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const SearchCbuSubmit = (data) => {
    // TODO: buscar cuenta
    console.log(data);
    dataAccount.cbu = data.cbu;
    dataAccount.currency = data.moneda;

    handleNext();
  };

  const SelectAmountSubmit = (data) => {
    console.log(data);
    dataAccount.amount = data.amount;

    handleNext();
  };

  const ResumeSubmit = async () => {
    console.log(dataAccount);
    const token = localStorage.getItem("token");
    console.log(token);
    const idAccount = 28;

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
      })
      .catch((error) => {
        console.error(error);
      });
    // handleNext();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SearchCbu SearchCbuSubmit={SearchCbuSubmit} />;
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
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 } }}
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

          <>{getStepContent(activeStep)}</>
        </Paper>
      </Container>
    </>
  );
};
