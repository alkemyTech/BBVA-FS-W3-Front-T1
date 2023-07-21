import React from 'react'
import { useState } from 'react'
import { FormularioDeposito } from './FormularioDeposito/FormularioDeposito';
import { RespuestaDeposito } from './RespuestaDeposito/RespuestaDeposito';

export const CrearDeposito = () => {

const [mostrarFormularioDeposito,setMostrarFormularioDeposito] = useState(false);



  return (
    <> {!mostrarFormularioDeposito? <FormularioDeposito setMostrarFormularioDeposito={setMostrarFormularioDeposito} />:<RespuestaDeposito/>} </>
  
     );
}
