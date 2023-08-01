import React from "react";
import {
  TextField,
  Drawer,
  Grid,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledButton from "../../buttonStyles/buttonStyles";
import "../UserInfo.css";
import { FixedTerms } from "../FixedTerm/FixedTerms";
import { UserAccounts } from "../UserAccounts/UserAccounts";
import { QuickAccess } from "../QuickAccess/QuickAccess";
import { useSelector } from "react-redux";
import { UserData } from "./UserData/UserData";

export const UserDisplay = ({ userData, userBalance }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUsd, setOpenDialogUsd] = useState(false);
  const userName =useSelector((state) => state.user.userName);
  const [openFixedTerm, setOpenFixedTerm] = useState(false);

  const handleTransferClick = () => {
    navigate("/transferencias");
  };

  const handleDepositClick = () => {
    navigate("/depositos");
  };

  const handleFixedTermClick = () => {
    navigate("/plazo-fijo");
  };

  const handlePayServicesClick = () => {
    navigate("/pagos");
  };


  const { accountArs, historyArs, accountUsd, historyUsd, fixedTerms } =
    userBalance;

  return (
    <>
      <Container maxWidth="md" className="exterior">
        <Typography variant="h4" color="initial" gutterBottom>
          ¡Hola, {userName.split(" ")[0]}!
        </Typography>

        <UserData userData={userData}/>

        <UserAccounts accountArs={accountArs} accountUsd={accountUsd} />
        <FixedTerms fixedTerms={fixedTerms} />
        <QuickAccess />
      </Container>
    </>
  );
};
