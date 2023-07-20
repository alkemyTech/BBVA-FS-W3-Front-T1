import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import { useState } from "react";
import { Page } from "./pages/Page";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer";
import { SimulatedFixedTerm } from "./components/FixedTerm/SimulatedFixedTerm/SimulatedFixedTerm";

function App() {
  const [userName, setUserName] = useState("Evaristo");
  const [jwt, setJwt] = useState("prueba");

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
              <Route path="/deposito" element={<h1>Prueba deposito</h1>} />
              <Route
                path="/transferencia"
                element={
                  <>
                    <LoadTransfer />
                  </>
                }
              />
              <Route path="/plazo-fijo" element={<SimulatedFixedTerm/>}/>
            </>
          )}
          
        </Routes>
      </Page>
    </>
  );
}

export default App;
