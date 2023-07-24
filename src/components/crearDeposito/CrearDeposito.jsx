import React from "react";
import { useState } from "react";
import { FormularioDeposito } from "./FormularioDeposito/FormularioDeposito";
import { RespuestaDeposito } from "./RespuestaDeposito/RespuestaDeposito";
import axios from "axios";
import { Alert, Box, Grid, Typography } from "@mui/material";

export const CrearDeposito = () => {

  const [mostrarFormularioDeposito, setMostrarFormularioDeposito] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [msgError, setMsgError] = useState("");

  const onSubmit = async (data) => {
    
    setData(data);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8080/transactions/deposit",
        data,
        { headers }
      );

      setMostrarFormularioDeposito(true);

    } catch (error) {
      setError(error);
      const errorStatus = error.response.status;
      if (errorStatus === 400) {
        setMsgError(error.response.data.message);
      } else {
        setMsgError("intente nuevamente en unos instantes");
      }
    }
  };

  if (error) {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding={"2.5rem"}
      >
        <Grid item>
          <Alert variant="outlined" severity="error">
            <Typography>
              <b>{msgError}</b>
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  if (!error) {
    return (
      <>
        {!mostrarFormularioDeposito ? (
          <FormularioDeposito onSubmit={onSubmit}/>
        ) : (
          <RespuestaDeposito data={data}/>
        )}
      </>
    );
  }
};
