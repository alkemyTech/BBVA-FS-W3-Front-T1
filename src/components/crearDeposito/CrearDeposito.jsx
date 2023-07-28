import React from "react";
import { useState } from "react";
import { FormularioDeposito } from "./FormularioDeposito/FormularioDeposito";
import { RespuestaDeposito } from "./RespuestaDeposito/RespuestaDeposito";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tokenExpired } from "../../utils/tokenExpired";
import { Container, Paper } from "@mui/material";

export const CrearDeposito = () => {
  const [mostrarFormularioDeposito, setMostrarFormularioDeposito] =
    useState(false);
  const [data, setData] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [msgError, setMsgError] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setMostrarFormularioDeposito(false);
    setMsgError("");
    setValidation(false);
    setError("");
  };

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

      setDate(new Date(response.data.transactionDate).toLocaleDateString());

      setMostrarFormularioDeposito(true);
    } catch (error) {
      setError(error);
      const errorStatus = error.response.status;
      setValidation(true);
      if (errorStatus === 403) {
        tokenExpired(navigate, dispatch);
      } else {
        setMsgError(error.response.data.message);
      }
    }
  };

  return (
    <div style={{ minHeight: "81vh" }}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 } }}>
          {!mostrarFormularioDeposito ? (
            <FormularioDeposito
              onSubmit={onSubmit}
              validation={validation}
              msgError={msgError}
            />
          ) : (
            <RespuestaDeposito
              data={data}
              date={date}
              handleClick={handleClick}
            />
          )}
        </Paper>
      </Container>
    </div>
  );
};
