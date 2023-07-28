import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import StyledButton from "../../buttonStyles/buttonStyles";
import { useDataContext } from "../FixedTerm";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const CreatFixedTermDialog = ({ setIsTransferSucced }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { fixTermData, setFixTermData } = useDataContext();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage(null);
    setOpen(false);
  };

  const createFixedTerm = () => {
    const token = localStorage.getItem("token");
    const requestBody = {
      amount: fixTermData.amount,
      cantDias: fixTermData.cantDias,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("http://localhost:8080/fixedTerm", requestBody, config)
      .then((response) => {
        console.log(response);
        response.data.data.closingDate =
          response.data.data.closingDate.split("T")[0];
        response.data.data.creationDate =
          response.data.data.creationDate.split("T")[0];

        const newData = {
          montoInverito: response.data.data.amount,
          fechaCreacion: response.data.data.creationDate,
          fechaFinalizacion: response.data.data.closingDate,
          interes: response.data.data.interest,
          montoTotal: response.data.data.amount + response.data.data.interest,
          balance: response.data.data.account.balance,
        };

        setFixTermData(newData);
        setIsTransferSucced(true);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          tokenExpired(navigate, dispatch);
        }
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <StyledButton variant="outlined" onClick={handleClickOpen}>
        Crear plazo fijo
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Se creara una plazo fijo con los datos cargados"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No se podra mover este dinero hasta que no cumpla la fecha
            estipulada.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={createFixedTerm} autoFocus>
            Crear Plazo Fijo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
