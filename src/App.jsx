import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { useState } from "react";
import { Page } from "./pages/Page";
import { UserInfo } from "./components/Profile/UserInfo";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer";
import { SimulatedFixedTerm } from "./components/FixedTerm/SimulatedFixedTerm/SimulatedFixedTerm";
import { SingUp } from "./components/SingUp/SingUp";

function App() {
  const [userName, setUserName] = useState("Diego Perez");
  const [jwt, setJwt] = useState("Prueba");

  return (
    <>
      <Page userName={userName} setUserName={setUserName} setJwt={setJwt}>
        <Routes>
          <Route
            path="*"
            element={<Login setUserName={setUserName} setJwt={setJwt} />}
          />
          <Route
            path="sing-up"
            element={<SingUp/>}
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
