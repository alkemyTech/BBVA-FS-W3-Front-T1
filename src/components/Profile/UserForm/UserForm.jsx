import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Card,
  FormControl,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUserName } from "../../../redux/userSlice";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import "../UserInfo.css";

export const UserForm = ({ userData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState(userData);
  const [errorMsg, setErrorMsg] = useState("");
  const [validation, setValidation] = useState(false);

  const userId = useSelector((state) => state.user.userId);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (/^[A-Za-z\s]*$/.test(e.target.value) && e.target.name != "password") {
      setValidation(false);
      setErrorMsg("");
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value })); 
  }else if(e.target.name === "password"){
    setValidation(false);
      setErrorMsg("");
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value })); 
  }
  else{
    setErrorMsg("Solo puede ingresar letras");
    setValidation(true)
  }
  };

  const handleSave = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let updatedData = {
        nombre: editedData.firstName,
        apellido: editedData.lastName,
      };

      if (editedData.password != "") {
        updatedData = {
          nombre: editedData.firstName,
          apellido: editedData.lastName,
          contraseña: editedData.password,
        };
      }

      const response = await axios.patch(
        `http://localhost:8080/users/${id}`,
        updatedData,
        config
      );
      dispatch(addUserName(editedData.firstName + " " + editedData.lastName));
      localStorage.setItem(
        "nombre",
        editedData.firstName + " " + editedData.lastName
      );
      onSave(editedData);
      editedData.password = "";
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedData(userData);
    onCancel();
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "85.6vh" }}>
      <Card sx={{ mt: "3rem", boxShadow: "5", borderRadius: "20px 20px" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sx={{ mt: 3 }}>
            <Typography variant="h5" color="initial">
              Actualizar mis datos
            </Typography>
          </Grid>
          <Box textAlign={"center"} maxWidth={"20rem"}>
            <form>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Nombre"
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleInputChange}
                  margin="dense"
                  helperText="Máx(15)"
                  inputProps={{
                    maxLength: 15,
                  }}
                />
              </FormControl>

              <FormControl fullWidth sx={{mb:".1rem"}}>
                <TextField
                  label="Apellido"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleInputChange}
                  margin="dense"
                  helperText="Máx(15)"
                  inputProps={{
                    maxLength: 15,
                  }}
                />
              </FormControl>

              <FormControl fullWidth sx={{mb:".9rem"}}>
                <TextField
                  label="Email"
                  value={editedData.email}
                  disabled
                  margin="dense"
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  name="password"
                  type="password"
                  label="Nueva contraseña"
                  value={editedData.password}
                  placeholder="Nueva contraseña"
                  onChange={handleInputChange}
                  autoComplete="off"
                  margin="dense"
                  helperText="Máx(10)"
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </FormControl>
              <Box m={2}>
                <Grid container spacing={4}>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleCancelClick}
                      color="error"
                      endIcon={<CancelIcon />}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => handleSave(userId)}
                      color="primary"
                      endIcon={<SaveIcon />}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
            {validation && (
                    <Alert sx={{ my: "1rem" }} severity="error">
                      {errorMsg}
                    </Alert>
                  )}
          </Box>
        </Grid>
      </Card>
    </Container>
  );
};
