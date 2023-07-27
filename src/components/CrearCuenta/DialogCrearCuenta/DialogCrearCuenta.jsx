import { Backdrop, Box, Button, Typography } from "@mui/material"
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
                    padding: "4rem",
                    borderRadius: "25px 25px 25px 25px",
                  }}
                >
                  <Typography variant="subtitle1" color={"#585858 "}>
                    <b> VA A CREAR UNA CUENTA EN {currency} </b>
                  </Typography>
                  <Box display={"flex"} justifyContent={"space-between"} mt={4}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleClickCancelar}
                    >
                      CANCELAR
                    </Button>
                    <StyledButton
                      variant="contained"
                      onClick={handleClickConfirmar}
                    >
                      CONFIRMAR
                    </StyledButton>
                  </Box>
                </Box>
              </Backdrop>
  )
}
