import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { Page } from "./pages/Page";
import { LoadTransfer } from "./components/LoadTransfer/LoadTransfer"
import { UserInfo } from "./components/Profile/UserInfo";

function App() {
  return (
    <>
      <Page>
        <Routes>
          <Route path="/" element={<h1>Prueba footer</h1>} />
          <Route path="transferencia" element={<><LoadTransfer /></>}>
          </Route>
          <Route path="home" element={<><UserInfo /></>}></Route>
        </Routes>
      </Page>
    </>
  );
}

export default App;
