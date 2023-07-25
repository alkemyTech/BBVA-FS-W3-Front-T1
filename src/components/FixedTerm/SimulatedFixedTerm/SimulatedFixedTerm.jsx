import { useState } from "react";
import { TaskFixedInterface } from "../TaskFixedInterface/TaskFixedInterface";
import { Container, Paper } from "@mui/material";
import { ShowTaskFixed } from "../ShowTaskFixed/ShowTaskFixed";
import axios from "axios";
import { FixedTerm, useDataContext } from "../FixedTerm";


export const SimulatedFixedTerm = () => {
  // const [fixTermData, setFixTermData] = useState(null);
  // const [recivedData, setrecivedData] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const { fixTermData, setFixTermData, receivedData, setReceivedData } = useDataContext();


  const handleSubmit = (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("http://localhost:8080/fixedTerm/simulate", data, config)
      .then((response) => {

        response.data.data.fechaCreacion = response.data.data.fechaCreacion.split("T")[0];
        response.data.data.fechaFinalizacion = response.data.data.fechaFinalizacion.split("T")[0];
        setFixTermData({ ...response.data.data, ...data });

        setReceivedData(true);

      })
      .catch((error) => {
        
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 } }}>
          {!receivedData ? (
            <>
              <TaskFixedInterface onSubmit={handleSubmit} />
            </>
          ) : (
            <ShowTaskFixed/>
          )}
          {errorMessage && (
                <Alert severity="error">{errorMessage}</Alert>
              )}
        </Paper>
      </Container>
    </>
  );
};
