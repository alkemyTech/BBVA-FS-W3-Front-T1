import axios from "axios";
import React from "react";
import { UserDisplay } from "./UserDisplay/UserDisplay";
import { UserForm } from "./UserForm/UserForm";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";

export const UserInfo = () => {
  const [userBalance, setUserBalance] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const token = localStorage.getItem("token");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUserData) => {
    setUserData(updatedUserData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const isLoading = !userBalance || !userData;
  
  useEffect(() => {
    const getUserData = async (id) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/users/${id}`,
          config
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    const getUserBalance = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/accounts/balance`,
          config
        );
        const balance = response.data.data;
        setUserBalance(balance);
        balance.accountArs &&
          localStorage.setItem("balanceArs", balance.accountArs.balance);
        balance.accountUsd &&
          localStorage.setItem("balanceUsd", balance.accountUsd.balance);
        balance.accountArs &&
          localStorage.setItem("cbuArs", balance.accountArs.cbu);
        balance.accountUsd &&
          localStorage.setItem("cbuUsd", balance.accountUsd.cbu);
        balance.accountArs &&
          localStorage.setItem("idArs", balance.accountArs.id);
        balance.accountUsd &&
          localStorage.setItem("idUsd", balance.accountUsd.id);
        console.log(balance);
      } catch (error) {
        console.error("Error al obtener balance:", error);
      }
    };

    getUserData(userId);
    getUserBalance();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{minHeight: "86vh"}}>
        <Loader loader={true} />
        </div>
      ) : isEditing ? (
        <UserForm userData={userData} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <UserDisplay userData={userData} userBalance={userBalance} onEdit={handleEdit} />
      )}
    </div>
  );
};
