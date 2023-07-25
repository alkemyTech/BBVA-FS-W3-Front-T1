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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUserName } from "../../../redux/userSlice"
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import "../UserInfo.css";

export const UserForm = ({ userData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState(userData);
  const userId = useSelector((state) => state.user.userId);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let updatedData={
        nombre: editedData.firstName,
        apellido: editedData.lastName,
      };
  
      if (editedData.password != "") {
        updatedData={
          nombre: editedData.firstName,
          apellido: editedData.lastName,
          contraseña: editedData.password
        };
      }

      const response = await axios.patch(
        `http://localhost:8080/users/${id}`,
          updatedData,
        config
      );
      dispatch(addUserName(editedData.firstName+" "+editedData.lastName));
      localStorage.setItem("nombre",editedData.firstName+" "+editedData.lastName)
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
    <Container maxWidth="md" className="exterior">
      <Card>
        <Grid
          container
          className="exterior"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" color="initial">
              Actualizar mis datos
            </Typography>
          </Grid>
          <form>
            <FormControl fullWidth>
              <TextField
                label="Nombre"
                name="firstName"
                value={editedData.firstName}
                onChange={handleInputChange}
                margin="dense"
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <TextField
                label="Apellido"
                name="lastName"
                value={editedData.lastName}
                onChange={handleInputChange}
                margin="dense"
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <TextField
                label="Email"
                value={editedData.email}
                disabled
                margin="dense"
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <TextField
                name="password"
                label="Nueva contraseña"
                value={editedData.password}
                placeholder="Nueva contraseña"
                onChange={handleInputChange}
                autoComplete='off'
                margin="dense"
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
        </Grid>
      </Card>
    </Container>
  );
};
