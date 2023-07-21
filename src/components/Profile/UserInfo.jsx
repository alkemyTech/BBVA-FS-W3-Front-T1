import React, { useState } from "react";
import { UserForm } from "./UserForm";
import { UserDisplay } from "./UserDisplay";

export const UserInfo = ({}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: 56,
    firstName: "Juan",
    lastName: "Martinez",
    email: "user0@example.com",
  });

  //Ejemplo de balance como viene del back 
  const userBalance = {
    accountArs: {
      id: 106,
      currency: "ARS",
      transactionLimit: 300000.0,
      balance: 120550.0,
      userId: {
        id: 77,
        firstName: "FistName",
        lastName: "LastName",
        email: "user0@example.com",
      },
      cbu: "9748233683865968157497",
      creationDate: "2023-07-19T20:41:36",
      updateDate: "2023-07-19T20:41:36",
    },
    accountUsd: {
      id: 107,
      currency: "USD",
      transactionLimit: 1000.0,
      balance: 6500.0,
      userId: {
        id: 77,
        firstName: "FistName",
        lastName: "LastName",
        email: "user0@example.com",
      },
      cbu: "0001562489321478523698",
      creationDate: "2023-07-19T20:41:36",
      updateDate: "2023-07-19T20:41:36",
    },
    historyArs: [],
    historyUsd: [],
    fixedTerms: [
      {
          "id": 1,
          "amount": 100.0,
          "account": {
              "id": 121,
              "currency": "ARS",
              "transactionLimit": 300000.0,
              "balance": 39323.0,
              "userId": {
                  "id": 89,
                  "firstName": "FistName",
                  "lastName": "LastName",
                  "email": "userCuentaEnPesos@example.com"
              },
              "cbu": "4304534308963772238902",
              "creationDate": "2023-07-19T22:20:46",
              "updateDate": "2023-07-19T22:25:35"
          },
          "interest": 6.0,
          "creationDate": "2023-07-20T01:25:00.000+00:00",
          "closingDate": "2023-08-19T01:25:00.000+00:00"
      },
      {
          "id": 2,
          "amount": 300.0,
          "account": {
              "id": 121,
              "currency": "ARS",
              "transactionLimit": 300000.0,
              "balance": 39323.0,
              "userId": {
                  "id": 89,
                  "firstName": "FistName",
                  "lastName": "LastName",
                  "email": "userCuentaEnPesos@example.com"
              },
              "cbu": "4304534308963772238902",
              "creationDate": "2023-07-19T22:20:46",
              "updateDate": "2023-07-19T22:25:35"
          },
          "interest": 39.0,
          "creationDate": "2023-07-20T01:25:17.000+00:00",
          "closingDate": "2023-09-23T01:25:17.000+00:00"
      },
  ],
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUserData) => {
    setUserData(updatedUserData);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <UserForm userData={userData} onSave={handleSave} />
      ) : (
        <UserDisplay
          userData={userData}
          userBalance={userBalance}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};
