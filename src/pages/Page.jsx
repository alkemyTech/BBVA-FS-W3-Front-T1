import { useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export const Page = (props) => {
  const [userName, setUserName] = useState("Diego Perez"); //Cuando conecte con bbdd, al existir usuario paso por aca el nombre al header, y cambio el estilo.(Falta agregar funcion del boton, y agregar logout)

  return (
    <>
      <Header userName={userName} />
      <div>{props.children}</div>
      <Footer />
    </>
  );
};
