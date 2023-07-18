import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Page } from "./pages/page";

function App() {
  return (
    <>
      <Page>
        <Routes>
          <Route path="/" element={<h1>Prueba footer</h1>} />
        </Routes>
      </Page>
    </>
  );
}

export default App;
