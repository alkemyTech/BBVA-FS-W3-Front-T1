import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Page } from "./pages/Page";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer";
import { SimulatedFixedTerm } from "./components/FixedTerm/SimulatedFixedTerm/SimulatedFixedTerm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user.userName);

  const handleUnload = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nombre");
  };

  useEffect(() => {
    window.onunload = handleUnload;
    return () => {
      window.onunload = null;
    };
  }, []);

  return (
    <>
      <Page>
        <Routes>
          <Route path="*" element={<Login />} />
          {user && (
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
              <Route path="/plazo-fijo" element={<SimulatedFixedTerm />} />
            </>
          )}
        </Routes>
      </Page>
    </>
  );
}

export default App;
