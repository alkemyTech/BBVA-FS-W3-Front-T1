import { useState } from "react";
import { TaskFixedInterface } from "../TaskFixedInterface/TaskFixedInterface";
import { Container, Paper } from "@mui/material";
import { ShowTaskFixed } from "../ShowTaskFixed/ShowTaskFixed";
import axios from "axios";
import { FixedTerm, useDataContext } from "../FixedTerm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tokenExpired } from "../../../utils/tokenExpired";
import { Loader } from "../../Loader/Loader";

export const SimulatedFixedTerm = () => {
  // const [fixTermData, setFixTermData] = useState(null);
  // const [recivedData, setrecivedData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { fixTermData, setFixTermData, receivedData, setReceivedData } =
    useDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("http://localhost:8080/fixedTerm/simulate", data, config)
      .then((response) => {
        setIsLoading(false);
        response.data.data.fechaCreacion =
          response.data.data.fechaCreacion.split("T")[0];
        response.data.data.fechaFinalizacion =
          response.data.data.fechaFinalizacion.split("T")[0];
        setFixTermData({ ...response.data.data, ...data });

        setReceivedData(true);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 403) {
          tokenExpired(navigate, dispatch);
        }
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div style={{ minHeight: "81vh" }}>
      {isLoading ? (
        <Loader loader={isLoading} />
      ) : (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 5 }, boxShadow:"5" }}>
            {!receivedData ? (
              <>
                <TaskFixedInterface onSubmit={handleSubmit} />
              </>
            ) : (
              <ShowTaskFixed />
            )}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Paper>
        </Container>
      )}
    </div>
  );
};
