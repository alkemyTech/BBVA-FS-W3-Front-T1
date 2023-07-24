import React from 'react'
import { useState } from 'react'
import { FormularioDeposito } from './FormularioDeposito/FormularioDeposito';
import { RespuestaDeposito } from './RespuestaDeposito/RespuestaDeposito';
import axios from 'axios';

export const CrearDeposito = () => {


const [mostrarFormularioDeposito,setMostrarFormularioDeposito] = useState(false);
const [data,setData] = useState("");
const [msgError, setMsgError] = useState("");

const onSubmit = async (data) => {
  setData(data);


  try {
    const token = localStorage.getItem("token");
    const  headers = {'Authorization': `Bearer ${token}`,
  'Content-Type':'application/json'};
    
    const response = await axios.post("http://localhost:8080/transactions/deposit", 
    data,
      {headers}
    );
   

setMostrarFormularioDeposito(true)
}

catch (error) {
 
  setMsgError(error);
  console.log(error);
}

}


  return (
    <> {!mostrarFormularioDeposito? <FormularioDeposito onSubmit={onSubmit}/>:<RespuestaDeposito data={data}/>} </>
  
     );
}
