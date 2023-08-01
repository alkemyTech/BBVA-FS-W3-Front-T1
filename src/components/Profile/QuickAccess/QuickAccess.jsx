import React from "react";
import { Typography, Grid, Card } from "@mui/material";
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import { useNavigate } from "react-router-dom";

export const QuickAccess = () => {
  const navigate = useNavigate();
  const handleTransferClick = () => {
    navigate("/transferencias");
  };

  const handleDepositClick = () => {
    navigate("/depositos");
  };

  const handleFixedTermClick = () => {
    navigate("/plazo-fijo");
  };

  const handlePayServicesClick = () => {
    navigate("/pagos");
  };

  return (
    <>
      <Typography variant="h5" color="initial" gutterBottom>
        Accesos rápidos
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Card
            className="card-style"
            style={{
              padding: "20px",
              width: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleTransferClick}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <MultipleStopIcon
                style={{ fontSize: "40px", color: "#4c4f56" }}
              />
            </div>
            <Typography variant="subtitle2" color="initial">
              Transferencias
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className="card-style"
            style={{
              padding: "20px",
              width: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleDepositClick}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <PaidIcon style={{ fontSize: "40px", color: "#4c4f56" }} />
            </div>
            <Typography variant="subtitle2" color="initial">
              Depósitos
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className="card-style"
            style={{
              padding: "20px",
              width: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handlePayServicesClick}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <WbIncandescentIcon
                style={{ fontSize: "40px", color: "#4c4f56" }}
              />
            </div>
            <Typography variant="subtitle2" color="initial">
              Pagar Servicios
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            className="card-style"
            style={{
              padding: "20px",
              width: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleFixedTermClick}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <SavingsIcon style={{ fontSize: "40px", color: "#4c4f56" }} />
            </div>
            <Typography variant="subtitle2" color="initial">
              Plazos Fijos
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
