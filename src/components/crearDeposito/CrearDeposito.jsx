import React from 'react'
import { useState } from 'react';
import { RespuestaDeposito } from '../RespuestaDeposito/RespuestaDeposito';

export const CrearDeposito = () => {
    const [showForm, setShowForm] = useState(true);

    const handleSendForm = () => {
        // Aquí podrías realizar la lógica para enviar el formulario a la API
        // y luego cambiar el estado para mostrar el otro componente
        setShowForm(false);
      };

  return (
    <div>{showForm? (<FormularioDeposito onSubmit={handleSentForm} />
    ) : (
      <RespuestaDeposito />
    )}</div>
  );
}
