import { useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export const Page = (props) => {
 //Cuando conecte con bbdd, al existir usuario paso por aca el nombre al header, y cambio el estilo.(Falta agregar funcion del boton, y agregar logout)


  return (
    <>
      <Header userName={props.userName} setUserName={props.setUserName} setJwt={props.setJwt} />
      <div>{props.children}</div>
      <Footer />
    </>
  );
};
