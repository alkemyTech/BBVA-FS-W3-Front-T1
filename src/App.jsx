import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Page } from "./pages/Page";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer"
import { SimulatedFixedTerm } from "./components/SimulatedFixedTerm/SimulatedFixedTerm";

function App() {
  return (
    <>
      <Page>
        <Routes>
          <Route path="/" element={<h1>Prueba footer</h1>} />
          <Route path="transferencia" element={<><LoadTransfer /></>}>
          </Route>
          <Route path="/plazo-fijo" element={<SimulatedFixedTerm/>}/>
        </Routes>
      </Page>
    </>
  );
}

export default App;
