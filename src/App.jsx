import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Page } from "./pages/page";
import { Login } from "./components/Login/Login";

function App() {
  
  return (
    <>
      <Page>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<h1>Prueba home</h1>} />
        </Routes>
      </Page>
    </>
  );
}

export default App;
