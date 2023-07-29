import { Backdrop, Box, Button, Divider, Typography } from "@mui/material";
import StyledButton from "../../buttonStyles/buttonStyles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserId, addUserName } from "../../../redux/userSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

export const DialogLogout = ({ logout, setLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickCancelar = () => {
    setLogout(false);
  };

  const handleClickConfirmar = () => {
    setLogout(false);
    localStorage.clear();
    dispatch(addUserId(""));
    dispatch(addUserName(""));
    navigate("/");
  };

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={logout}
    >
      <Box
        textAlign={"center"}
        sx={{
          backgroundColor: "#F0F0F0 ",
          padding: "3.5rem",
          mb:"5rem",
          borderRadius: "25px 25px 25px 25px",
        }}
      >
        <Typography variant="subtitle1" color={"#585858"} mb="1rem">
          <b>¿CERRAR SESIÓN?</b>
        </Typography>
        <Divider/>
        <Box sx={{ mt: "1rem" }}>
          <Button
            sx={{
              borderRadius: "20px",
              border: "1px solid",
              px: "1rem",
              color: "#4b79a1",
              m: "1rem",
            }}
            variant="text"
            endIcon={<CancelIcon color="error" sx={{ mb: "0.2rem" }} />}
            onClick={handleClickCancelar}
          >
            CANCELAR
          </Button>
          <StyledButton
            sx={{ borderRadius: "20px" }}
            variant="contained"
            endIcon={<CheckIcon sx={{ mb: "0.2rem" }} />}
            onClick={handleClickConfirmar}
          >
            CONFIRMAR
          </StyledButton>
        </Box>
      </Box>
    </Backdrop>
  );
};
