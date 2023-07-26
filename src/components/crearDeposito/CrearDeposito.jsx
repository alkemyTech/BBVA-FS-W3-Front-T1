import React from "react";
import { useState } from "react";
import { FormularioDeposito } from "./FormularioDeposito/FormularioDeposito";
import { RespuestaDeposito } from "./RespuestaDeposito/RespuestaDeposito";
import axios from "axios";
import { Alert, Box, Grid, Typography } from "@mui/material";

export const CrearDeposito = () => {

  const [mostrarFormularioDeposito, setMostrarFormularioDeposito] = useState(false);
  const [data, setData] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [msgError, setMsgError] = useState("");
  const [validation, setValidation] = useState(false);

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
     
    setDate((new Date(response.data.transactionDate)).toLocaleDateString());
   


      setMostrarFormularioDeposito(true);

    } catch (error) {
      setError(error);
      const errorStatus = error.response.status;
      setValidation(true);
      if (errorStatus === 400) {
        setMsgError(error.response.data.message);
      } else {
        setMsgError("intente nuevamente en unos instantes");
      }
    }
  };

  

    return (
      <>
        {!mostrarFormularioDeposito ? (
          <FormularioDeposito onSubmit={onSubmit} validation={validation} msgError={msgError}/>
        ) : (
          <RespuestaDeposito data={data} date={date}/>
        )}
      </>
    );
  }

