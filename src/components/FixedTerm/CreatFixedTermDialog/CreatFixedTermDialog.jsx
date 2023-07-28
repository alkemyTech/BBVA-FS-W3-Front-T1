import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import StyledButton from "../../buttonStyles/buttonStyles";
import { useDataContext } from "../FixedTerm";
import { Loader } from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Alert } from "@mui/material";

export const CreatFixedTermDialog = ({ setIsTransferSucced }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { fixTermData, setFixTermData } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage(null);
  };

  const createFixedTerm = () => {
    setIsLoading(true);
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
        setTimeout(() => {
          console.log(response);
          setIsLoading(false);
          response.data.data.savedFixedTerm.closingDate =
            response.data.data.savedFixedTerm.closingDate.split("T")[0];
          response.data.data.savedFixedTerm.creationDate =
            response.data.data.savedFixedTerm.creationDate.split("T")[0];

          const newData = {
            montoInverito: response.data.data.savedFixedTerm.amount,
            fechaCreacion: response.data.data.savedFixedTerm.creationDate,
            fechaFinalizacion: response.data.data.savedFixedTerm.closingDate,
            interes: response.data.data.savedFixedTerm.interest,
            montoTotal:
              response.data.data.savedFixedTerm.amount +
              response.data.data.savedFixedTerm.interest,
            balance: response.data.data.savedFixedTerm.account.balance,
          };
          console.log("antes");
          setFixTermData(newData);
          setIsTransferSucced(true);
          handleClose();
          console.log("despues");
        }, 500);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (error.response.status === 403) {
          tokenExpired(navigate, dispatch);
        }
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <StyledButton onClick={handleClickOpen}>crear</StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isLoading ? (
          <Loader loader={isLoading} />
        ) : (
          <>
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
          </>
        )}
      </Dialog>
    </>
  );
};
