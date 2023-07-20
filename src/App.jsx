import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Login } from "./components/login/Login";
import { Page } from "./pages/Page";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer";
import { SimulatedFixedTerm } from "./components/FixedTerm/SimulatedFixedTerm/SimulatedFixedTerm";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=>state.user.userName)
  
  return (
    <>
      <Page>
        <Routes>
          <Route
            path="*"
            element={<Login/>}
          />
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
