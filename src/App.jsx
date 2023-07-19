import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Page } from "./pages/page";
import { Login } from "./components/Login/Login";
import { useState } from "react";

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
            <Route path="/deposito" element={<h1>Prueba deposito</h1>} />
            <Route path="/transferencia" element={<h1>Prueba transferencia</h1>} />
            <Route path="/plazo-fijo" element={<h1>Prueba plazo fijo</h1>} />
            </>
          )}
        </Routes>
      </Page>
    </>
  );
}

export default App;
