import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Page } from "./pages/Page";
import { UserInfo } from "./components/Profile/UserInfo";
import { SingUp } from "./components/SingUp/SingUp";
import { TransferCheckOut } from "./components/Transferencia/TransferCheckOut";
import { CrearDeposito } from "./components/crearDeposito/CrearDeposito";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FixedTerm } from "./components/FixedTerm/FixedTerm";
import { Pagos } from "./components/Pagos/Pagos";
import { CrearCuenta } from "./components/CrearCuenta/CrearCuenta";


function App() {
  const user = useSelector((state) => state.user.userName);

  const handleUnload = () => {
    localStorage.clear();
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
          <Route path="sing-up" element={<SingUp />} />
          {user && (
            <>
              <Route path="/inicio" element={<UserInfo />} />
              <Route path="/depositos" element={<CrearDeposito />} />
              <Route
                path="/transferencias"
                element={
                  <>
                    <TransferCheckOut />
                  </>
                }
              />
              <Route path="/pagos" element={<Pagos/>} />
              <Route path="/plazo-fijo" element={<FixedTerm />} />
              <Route path="/crearcuenta" element={<CrearCuenta/>} />
            </>
          )}
        </Routes>
      </Page>
    </>
  );
}

export default App;
