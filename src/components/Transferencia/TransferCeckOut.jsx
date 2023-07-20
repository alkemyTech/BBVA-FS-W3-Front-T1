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
import { BuscarCuentaForm } from "./BuscarCuentaForm1/BuscarCuentaForm";
import { SearchCbu } from "./SearchCbu/SearchCbu";
import { SelectAmount } from "./SelectAmount/SelectAmount";
import { TransferResume } from "./TransferResume/TransferResume";

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
    // TODO: buscar cuenta
    console.log(data);
    dataAccount.cbu = data.amount;

    handleNext();
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
          return <TransferResume dataTransfer={dataAccount} />;
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

          <>
            {getStepContent(activeStep)}
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Confirmar Transferencia' : 'Siguiente'}
                </Button>
            </Box> */}
          </>
        </Paper>
      </Container>
    </>
  );
};
