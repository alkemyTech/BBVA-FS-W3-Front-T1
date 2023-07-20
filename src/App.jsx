import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import { useState } from "react";
import { Page } from "./pages/Page";
import { UserInfo } from "./components/Profile/UserInfo";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer";
import { SimulatedFixedTerm } from "./components/FixedTerm/SimulatedFixedTerm/SimulatedFixedTerm";

function App() {
  const [userName, setUserName] = useState("Nombre de prueba");
  const [jwt, setJwt] = useState("token de prueba"); 

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
              <Route path="/home" element={<><UserInfo /></>} />
              <Route path="/deposito" element={<h1>Prueba deposito</h1>} />
              <Route
                path="/transferencia"
                element={
                  <>
                    <LoadTransfer />
                  </>
                }
              />
              <Route path="/plazo-fijo" element={<SimulatedFixedTerm />} />
            </>
          )}
        </Routes>
      </Page>
    </>
  );
}

export default App;
