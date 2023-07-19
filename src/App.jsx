import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Page } from "./pages/page";

function App() {
  return (
    <>
      <Page>
        <Routes>
          <Route path="/" element={<h1>Elemento de prueba</h1>} />
        </Routes>
      </Page>
    </>
  );
}

export default App;
