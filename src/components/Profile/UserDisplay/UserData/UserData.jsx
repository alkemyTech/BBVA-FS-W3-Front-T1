import {
  Alert,
  Box,
  Drawer,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import StyledButton from "../../../buttonStyles/buttonStyles";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { addUserName } from "../../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tokenExpired } from "../../../../utils/tokenExpired";
import { Loader } from "../../../Loader/Loader";
import { ShowUserData } from "./ShowUserData/ShowUserData";

export const UserData = ({ userData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSucces, setIsEditingSucces] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.userName);
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const toggleDrawer = () => {
    setIsEditing(false);
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let updatedData = {
        nombre: data.firstName,
        apellido: data.lastName,
      };

      if (data.password != "") {
        updatedData = {
          ...updatedData,
          contraseña: data.password,
        };
      }

      const response = await axios.patch(
        `http://localhost:8080/users/${userId}`,
        updatedData,
        config
      );
      dispatch(addUserName(data.firstName + " " + data.lastName));
      localStorage.setItem("nombre", data.firstName + " " + data.lastName);
      setIsLoading(false);
      setIsEditingSucces(true);
      toggleDrawer();
    } catch (error) {
      if (error.response.status === 403) {
        tokenExpired(navigate, dispatch);
      }
      setIsLoading(false);
      console.error("Error al actualizar usuario:", error);
    }
  };

  useEffect(() => {
    // Si isEditingSucces es true, programamos el cambio a false después de 5000 ms (5 segundos)
    if (isEditingSucces) {
      const timer = setTimeout(() => {
        setIsEditingSucces(false);
      }, 4000);

      return () => clearTimeout(timer); // Limpiamos el timer si el componente se desmonta antes de que se cumpla el tiempo
    }
  }, [isEditingSucces]);

  return (
    <>
      {isLoading ? (
        <Loader loader={isLoading} />
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Typography variant="h5" color="initial" style={{ marginRight: 8 }}>
              Tus datos
            </Typography>
            <IconButton aria-label="Toggle First Grid" onClick={toggleDrawer}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            PaperProps={{
              sx: { width: "30%" },
            }}
          >
            <Box p={2}>
              <Grid container >
              <Grid item xs={1}>
                <IconButton onClick={toggleDrawer}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={11} >
                <img src="src/assets/profile-picture.svg" alt="perfil" />
              </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={"1.5vh"}
              >
                <Grid item>
                  <Typography variant="h5" color="initial">
                    Tus datos
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
              {isEditing ? (
                <>
                  <Grid
                    container
                    component="form"
                    onSubmit={handleSubmit(handleSave)}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        margin="dense"
                        defaultValue={userName.split(" ")[0]}
                        {...register("firstName", {
                          required: "El nombre es requerido",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message:
                              "el nombre no puede incluir numeros ni espacios",
                          },
                        })}
                      />
                    </Grid>
                    {errors.firstName && (
                      <Grid item>
                        <Alert severity="error">
                          {errors.firstName.message}
                        </Alert>
                      </Grid>
                    )}
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Apellido"
                        variant="outlined"
                        margin="dense"
                        defaultValue={userName.split(" ")[1]}
                        {...register("lastName", {
                          required: "El apellido es requerido",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message:
                              "el apellido no puede incluir numeros ni espacios",
                          },
                        })}
                      />
                    </Grid>
                    {errors.lastName && (
                      <Grid item>
                        <Alert severity="error">
                          {errors.lastName.message}
                        </Alert>
                      </Grid>
                    )}
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Contraseña"
                        variant="outlined"
                        type={"password"}
                        {...register("contraseña")}
                        margin="dense"
                      />
                    </Grid>

                    <Grid item marginTop={"1rem"}>
                      <StyledButton type="submit">Actualizar</StyledButton>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <ShowUserData email={userData.email} />
              )}
            </Box>
          </Drawer>

          <Snackbar open={isEditingSucces} autoHideDuration={10}>
            <Alert
              severity="success"
              elevation={8}
              variant="filled"
              sx={{ width: "200%" }}
            >
              Los datos se actualizaron correctamente
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};
