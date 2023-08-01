import React, { useEffect, useState } from "react";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import StyledButton from "../../buttonStyles/buttonStyles";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loader } from "../../Loader/Loader";

export const Movements = ({ openDialog, handleCloseDialog, currency }) => {
  const [movements, setMovements] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("DESC");
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.user.userId);
  const [totalElements, setTotalElements] = useState(0);
  const [type, setType] = useState("");
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const toggleOrder = () => {
    setOrder(order === "ASC" ? "DESC" : "ASC");
  };

  const getMovements = async (url) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, config);
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
    }
  };

  useEffect(() => {
    const fetchMovements = async () => {
      setIsLoading(true);
      const curr = currency;
      const filter = type ? `&transactionType=${type}` : "";
      const url = `http://localhost:8080/transactions/user/${userId}?page=${page}&sortDirection=${order}&currencies=${curr}${filter}`;
      const data = await getMovements(url);
      console.log(data);
      setIsLoading(false);
      setTotalElements(data.totalElements);
      setMovements(data.collectionModel.content);
    };

    fetchMovements();
  }, [userId, page, order, type]);

  useEffect(() => {
    if (!openDialog) {
      setPage(0);
      setType("");
    }
  }, [openDialog]);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth={"md"}
      >
        {isLoading ? (
          <Loader loader={isLoading} />
        ) : (
          <>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={12}>
                <DialogTitle sx={{ paddingBottom: 0, fontSize: "24px" }}>
                  Movimientos
                </DialogTitle>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item marginRight={"1.8vw"}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="type">Tipo</InputLabel>
                    <Select
                      labelId="select-type"
                      id="select-type"
                      value={type}
                      label="Tipo"
                      onChange={handleChangeType}
                    >
                      <MenuItem value="">
                        <em>Todos</em>
                      </MenuItem>
                      <MenuItem value={"DEPOSIT"}>Depósito</MenuItem>
                      <MenuItem value={"PAYMENT"}>Pago a terceros</MenuItem>
                      <MenuItem value={"INCOME"}>Ingreso</MenuItem>
                      <MenuItem value={"FIXED_TERM"}>Plazo fijo</MenuItem>
                      <MenuItem value={"SERVICEPAYMENT"}>
                        Pago servicio
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <DialogContent>
              {movements.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="table-header" width="150">
                          Fecha
                          <Button onClick={toggleOrder}>
                            {order === "ASC" ? (
                              <ArrowUpwardIcon
                                fontSize="small"
                                color="disabled"
                              />
                            ) : (
                              <ArrowDownwardIcon
                                fontSize="small"
                                color="disabled"
                              />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell
                          className="table-header"
                          align="left"
                          width="150"
                        >
                          Tipo
                        </TableCell>
                        <TableCell className="table-header" align="left">
                          Descripción
                        </TableCell>
                        <TableCell
                          className="table-header"
                          align="right"
                          width="150"
                        >
                          Importe
                        </TableCell>
                        <TableCell
                          className="table-header"
                          align="right"
                          width="150"
                        >
                          Saldo
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {movements.map((row) => (
                        <TableRow
                          key={row.id}
                          className="movement"
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {formatDate(row.transactionDate)}
                          </TableCell>
                          <TableCell align="left">
                            {row.type === "DEPOSIT"
                              ? "Depósito"
                              : row.type === "INCOME"
                              ? "Ingreso"
                              : row.type === "FIXED_TERM"
                              ? "Plazo fijo"
                              : row.type === "PAYMENT"
                              ? "Pago a terceros"
                              : row.type === "SERVICEPAYMENT"
                              ? "Pago de servicio"
                              : "Otros"}
                          </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell
                            sx={{
                              color:
                                row.type === "DEPOSIT" || row.type === "INCOME"
                                  ? "rgb(82, 141, 82)"
                                  : "rgb(175, 68, 68)",
                            }}
                            align="right"
                          >
                            {row.type === "DEPOSIT" || row.type === "INCOME"
                              ? `$ ${row.amount.toLocaleString("es-AR", {
                                  minimumFractionDigits: 2,
                                })}`
                              : `- $ ${row.amount.toLocaleString("es-AR", {
                                  minimumFractionDigits: 2,
                                })}`}
                          </TableCell>
                          <TableCell align="right"
                          >
                            ${" "}
                            {row.accountBalance.toLocaleString("es-AR", {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div>
                  <Typography variant="body1">No hay movimientos.</Typography>
                </div>
              )}
            </DialogContent>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <TablePagination
                  component="div"
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[rowsPerPage]}
                />
              </Grid>
              <Grid item>
                <DialogActions>
                  <StyledButton onClick={handleCloseDialog} color="primary">
                    Cerrar
                  </StyledButton>
                </DialogActions>
              </Grid>
            </Grid>
          </>
        )}
      </Dialog>
    </>
  );
};
