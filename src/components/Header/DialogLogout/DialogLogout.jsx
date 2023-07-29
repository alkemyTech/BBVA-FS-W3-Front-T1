import { Backdrop, Box, Button, Typography } from "@mui/material"
import StyledButton from "../../buttonStyles/buttonStyles"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addUserId, addUserName } from "../../../redux/userSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from '@mui/icons-material/Check';

export const DialogLogout = ({ logout, setLogout}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickCancelar = ()=>{
        setLogout(false);
    }

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
                    padding: "4rem",
                    borderRadius: "25px 25px 25px 25px",
                  }}
                >
                  <Typography variant="subtitle1" color={"#585858 "}>
                    <b>¿CERRAR SESIÓN?</b>
                  </Typography>
                  <Box sx={{mt:"1rem"}}>
                    <Button
                    sx={{mr:"2rem"}}
                      variant="contained"
                      color="warning"
                      endIcon={<CancelIcon />}
                      onClick={handleClickCancelar}
                    >
                      CANCELAR
                    </Button>
                    <StyledButton
                      variant="contained"
                      endIcon={<CheckIcon />}
                      onClick={handleClickConfirmar}
                    >
                      CONFIRMAR
                    </StyledButton>
                  </Box>
                </Box>
              </Backdrop>
  )
}



