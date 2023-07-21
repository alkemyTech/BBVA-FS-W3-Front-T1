import { Typography, Grid, Box,Alert, Divider,AlertTitle } from "@mui/material";

export const RespuestaDeposito = () => {
  return (
    <>
      <Grid
      container
      justifyContent="center"
      alignItems="center"
     
    >
      <Box width="100%" maxWidth="400px" mt={10}>
        <Alert variant="outlined" severity="success">
          <Typography> <b>¡Listo! Depósito exitoso</b></Typography>
       
        </Alert>
      </Box>
    </Grid> 
    <Grid
  container
  mt={4}
  direction="column"
  justifyContent="center"
  alignItems="center"
> <Box
        sx={{
          boxShadow: 2,
          width: '22rem',
          height: '11rem',
          p: 1,
          m: 1,
          borderRadius: 2,
        }}
      >
        <Typography fontSize={20} marginBottom={1} marginLeft={2} ><b>$9000</b></Typography>
        <Divider/>
        <Typography  marginTop={4} fontSize={15}>Se depositó en</Typography>
        <Typography fontSize={15}><b>CBU: 1234567890123456789012</b></Typography>
      </Box>
      <Alert severity="info">
 Se acreditará en unos instantes
</Alert>
        </Grid>  

    
    </>
  );
};
