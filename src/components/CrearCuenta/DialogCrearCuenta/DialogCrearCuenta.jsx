import { Backdrop, Box, Button, Typography } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from '@mui/icons-material/Check';
import StyledButton from "../../buttonStyles/buttonStyles"


export const DialogCrearCuenta = ({currency, handleClickConfirmar, handleClickCancelar, confirmar}) => {
  return (
        <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={confirmar}
              >
                <Box
                  textAlign={"center"}
                  sx={{
                    backgroundColor: "#F0F0F0 ",
                    padding: "3rem",
                    borderRadius: "25px 25px 25px 25px",
                  }}
                >
                  <Typography variant="subtitle1" color={"#585858 "}>
                    <b>¿DESEA CREAR UNA CUENTA EN {currency === "ARS" ? "PESOS" : "DÓLARES"}? </b>
                  </Typography>
                  <Box display={"flex"} justifyContent={"space-around"} mt={2}>
                    <Button
                      sx={{borderRadius:"20px", border:"1px solid", px:"1rem",color:"#4b79a1" }}
                      variant="text"
                      endIcon={<CancelIcon color="error" sx={{ mb: "0.1rem" }} />}
                      onClick={handleClickCancelar}
                    >
                      CANCELAR
                    </Button>
                    <StyledButton
                    sx={{borderRadius:"20px"}}
                      variant="contained"
                      endIcon={<CheckIcon sx={{ mb: "0.2rem" }} />}
                      onClick={handleClickConfirmar}
                    >
                      CONFIRMAR
                    </StyledButton>
                  </Box>
                </Box>
              </Backdrop>
  )
}
