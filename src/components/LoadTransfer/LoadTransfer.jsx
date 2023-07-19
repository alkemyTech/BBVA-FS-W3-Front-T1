import React, { useState } from 'react';
import { BuscarCuentaForm } from './BuscarCuentaForm/BuscarCuentaForm';
import { IngresarImporteForm } from './IngresarImporteForm/IngresarImporteForm';
import { TransferResume } from '../TransferResume/TransferResume';

const dataAccount = {
  fistName: "Evaristo",
  lastName: "Compagnucci",
  cbu: "1234567890123456789012",
  currency: 'ARS',
  amount: 10.0
};

export const LoadTransfer = () => {
  const [cuentaEncontrada, setCuentaEncontrada] = useState(false);

  const buscarCuentaSumit = (data) =>{
    // TODO: buscar cuenta
    console.log(data)
    dataAccount.cbu = data
    setCuentaEncontrada(true);
  }

  return (
    <>
      {/* {!cuentaEncontrada ?
      <BuscarCuentaForm buscarCuentaSumit={buscarCuentaSumit}/>
      :
      <IngresarImporteForm/>
      } */}
      <TransferResume dataTransfer={dataAccount}/>
    </>
  );
};
