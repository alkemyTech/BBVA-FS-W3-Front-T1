import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import "./UserInfo.css";

export const UserForm = ({ userData, onSave }) => {
  const [editedData, setEditedData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <Grid
      container
      className="exterior"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <form>
        <Grid item>
          <TextField
            label="Nombre"
            name="firstName"
            value={editedData.firstName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Apellido"
            name="lastName"
            value={editedData.lastName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            name="email"
            value={editedData.email}
            onChange={handleChange}
            disabled
            margin="normal"
          />
        </Grid>
        <Button
          variant="contained"
          onClick={handleSave}
          color="primary"
          endIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </form>
    </Grid>
  );
};
