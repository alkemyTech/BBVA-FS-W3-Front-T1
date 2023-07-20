import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { useState } from "react";
import { Page } from "./pages/Page";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer";
import { CrearDeposito } from "./components/crearDeposito/CrearDeposito";

function App() {
  const [userName, setUserName] = useState("");
  const [jwt, setJwt] = useState("");

  return (
    <>
      <Page userName={userName} setUserName={setUserName} setJwt={setJwt}>
        <Routes>
          <Route
            path="*"
            element={<Login setUserName={setUserName} setJwt={setJwt} />}
          />
          {jwt && (
            <>
              <Route path="/home" element={<h1>Prueba Home</h1>} />
              <Route path="/deposito" element={<>
                    <CrearDeposito/>
                  </>} />
              <Route
                path="/transferencia"
                element={
                  <>
                    <LoadTransfer />
                  </>
                }
              />
              <Route path="/plazo-fijo" element={<h1>Prueba plazo fijo</h1>} />
            </>
          )}
        </Routes>
      </Page>
    </>
  );
}

export default App;
