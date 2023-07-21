import { TextField, Typography, Button, Grid, Box } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import {useForm } from "react-hook-form"
import { useState } from "react";
import StyledButton from "../../buttonStyles/buttonStyles";

export const TransferResume = ({ dataTransfer, handleBack, ResumeSubmit }) => {
  const [editingAmount, setEditingAmount] = useState(false);
  const [newAmount, setNewAmount] = useState(dataTransfer.amount);

  const handleEditAmount = () => {
    setEditingAmount(true);
  };

  const handleSaveAmount = () => {
    if (/^\d+$/.test(newAmount) && newAmount > 0) {
      dataTransfer.amount = parseInt(newAmount);
      setEditingAmount(false);
    }
  };

  const handleAmountChange = (e) => {
    if (/^\d+$/.test(e.target.value)) {
      setNewAmount(e.target.value);
    }
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <b>Nombre:</b>
          </Typography>
          <Typography>
            {dataTransfer.firstName}, {dataTransfer.lastName}
          </Typography>
        </Grid>

        {!editingAmount ? (
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h6">
                  <b>Cantidad:</b>{" "}
                </Typography>
                <Typography>
                  <b>$</b> {dataTransfer.amount}
                </Typography>
              </Grid>

              <Grid item xs={2} display={"flex"} justifyContent={"flex-end"}>
                <StyledButton
                  align="end"
                  variant="contained"
                //   sx={{ backgroundColor: "#2BA0B5" }}
                  endIcon={<BorderColorRoundedIcon />}
                  onClick={handleEditAmount}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Grid container spacing={14}>
                <Grid item xs={8}>
                  <TextField
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    value={newAmount}
                    onChange={handleAmountChange}
                    label="Cantidad"
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <StyledButton
                    variant="contained"

                    onClick={handleSaveAmount}
                  >
                    Guardar
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Typography variant="h6">
            <b>Tipo de moneda:</b>{" "}
          </Typography>
          <Typography>{dataTransfer.currency}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6"><b>CBU:</b></Typography>
          <Typography>{dataTransfer.cbu}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <StyledButton
            type="button"
            variant="contained"
            onClick={handleBack}
          >
            Anterior
          </StyledButton>
          {!editingAmount && <StyledButton
            type="submit"
            variant="contained"
            onClick={ResumeSubmit}
          >
            Confirmar
          </StyledButton>}
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};
