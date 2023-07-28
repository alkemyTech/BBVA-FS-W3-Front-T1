import React, { createContext, useContext, useState } from "react";
import { SimulatedFixedTerm } from "./SimulatedFixedTerm/SimulatedFixedTerm";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const FixedTerm = () => {
  const [fixTermData, setFixTermData] = useState(null);
  const [receivedData, setReceivedData] = useState(false);


  return (
    <DataContext.Provider
      value={{
        fixTermData,
        setFixTermData,
        receivedData,
        setReceivedData,
      }}
    >
      <SimulatedFixedTerm />
    </DataContext.Provider>
  );
};
