import axios from "axios";
import React from "react";
import { UserDisplay } from "./UserDisplay/UserDisplay";
import { UserForm } from "./UserForm/UserForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { tokenExpired } from "../../utils/tokenExpired";

export const UserInfo = () => {
  const [userBalance, setUserBalance] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        const errorStatus = error.response.status;
        if (errorStatus === 400){
          navigate("/crearCuenta");
        }
        if ( errorStatus === 403) {
          tokenExpired(navigate,dispatch);
        }
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
      )
      :
      (
        <UserDisplay userData={userData} userBalance={userBalance}/>
      )}
    </div>
  );
};
