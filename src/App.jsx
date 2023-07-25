import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Page } from "./pages/Page";
import { UserInfo } from "./components/Profile/UserInfo";
import { SimulatedFixedTerm } from "./components/FixedTerm/SimulatedFixedTerm/SimulatedFixedTerm";
import { SingUp } from "./components/SingUp/SingUp";
import { TransferCheckOut } from "./components/Transferencia/TransferCheckOut";
import { CrearDeposito } from "./components/crearDeposito/CrearDeposito";
import { useSelector } from "react-redux";
import { useEffect } from "react";


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
              <Route path="/home" element={<UserInfo />} />
              <Route path="/deposito" element={<CrearDeposito />} />
              <Route
                path="/transferencia"
                element={
                  <>
                    <TransferCheckOut />
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
