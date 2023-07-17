import "./App.css";
import { Grid } from "@mui/material";
import Inicio from "./components/2.Inicio/Inicio";
import Contador from "./components/1.Contador/Contador";
import Formulario from "./components/3.Formulario/Formulario";
import EjemploUseContext from "./components/4.Context/EjemploUseContext/EjemploUseContext";
import GeneralTarea from "./components/4.Context/LivingCodding/GeneralTarea/GeneralTarea";
import AccesoDOM from "./components/4.Ref/AccesoDOM/AccesoDOM";
import Focus from "./components/4.Ref/Focus/Focus";
import Nombre from "./components/4.Ref/Nombre/Nombre";
import ContadorRef from "./components/4.Ref/LivingCodding/ContadorRef/ContadorRef";



function App() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item xs={12}>
          <Contador />
        </Grid>
        <Grid item xs={12}>
          <Inicio />
        </Grid>
        <Grid item xs={12}>
          <Formulario />
        </Grid>
        <Grid item xs={12}>
          <EjemploUseContext/>
        </Grid>
        <Grid item xs={12}>
          <GeneralTarea/>
        </Grid>
        <Grid item xs={12}>
          <AccesoDOM/>
        </Grid>
        <Grid item xs={12}>
          <Focus/>
        </Grid>
        <Grid item xs={12}>
          <Nombre/>
        </Grid>
        <Grid item xs={12}>
          <ContadorRef/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
