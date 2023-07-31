import React from "react";
import { Grid, Box, Typography, Card, CardActionArea } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FixedTermDetail } from "./FixedTermDetail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../UserInfo.css";

export const FixedTerms = ({ fixedTerms }) => {
  const [openFixedTerm, setOpenFixedTerm] = useState(false);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const handleOpenFixedTerm = () => {
    setOpenFixedTerm(true);
  };

  const handleCloseFixedTerm = () => {
    setOpenFixedTerm(false);
  };

  const handleFixedTermClick = () => {
    navigate("/plazo-fijo");
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignContent="center"
        marginTop={5}
        marginBottom={5}
      >
        <Grid item xs={12}>
          <Typography variant="h5" color="initial" gutterBottom>
            Tus Plazos fijos
          </Typography>
        </Grid>
        {fixedTerms.length == 0 ? (
          <Grid item xs={12} sm={12} md={6}>
            <Card className="card-style">
              <CardActionArea onClick={handleFixedTermClick}>
                <Box m={1} p={2}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "10px",
                    }}
                  >
                    <AddCircleIcon
                      style={{ fontSize: "40px", color: "#4c4f56" }}
                    />
                    <Typography variant="subtitle1" color="initial">
                      Creá tu primer plazo fijo
                    </Typography>
                  </div>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ) : (
          fixedTerms.map((term) => (
            <Grid item xs={4} key={term.id}>
              <Card className="card-style">
                <CardActionArea onClick={handleOpenFixedTerm}>
                  <Box m={1} p={2}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h4">
                          ${" "}
                          {term.amount.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                          })}
                        </Typography>
                        <Typography
                          variant="overline"
                          color="initial"
                          gutterbottom
                        >
                          Capital de origen
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Vencimiento {formatDate(term.closingDate)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardActionArea>
                <FixedTermDetail
                  openFixedTerm={openFixedTerm}
                  handleCloseFixedTerm={handleCloseFixedTerm}
                  term={term}
                />
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};
