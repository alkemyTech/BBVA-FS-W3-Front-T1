import { TextField, Typography, Button, Grid, Box } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
// import "../LoadTransfer.css";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


export const TransferResume = ({ dataTransfer }) => {
    const [editingAmount, setEditingAmount] = useState(false);
    const [newAmount, setNewAmount] = useState(dataTransfer.amount);
    const location = useLocation();
    const dataAccount = location.state;

    const handleEditAmount = () => {
        setEditingAmount(true);
    };

    const handleSaveAmount = () => {
        if (/^\d+$/.test(newAmount) && newAmount > 0) {
            dataTransfer.amount = parseInt(newAmount);
            setEditingAmount(false);
        }

    };

    const handleAmountChange = (e) => {
        if (/^\d+$/.test(e.target.value)) {
            setNewAmount(e.target.value);
        }

    };

    return (
        <>
                <Grid container  spacing={4}>
                    <Grid item xs={12}   >
                        <Typography    >Nombre: </Typography>
                        <Typography    >{dataTransfer.firstName}, {dataTransfer.lastName}</Typography>
                    </Grid>

                    {!editingAmount ? (
                        <Grid item xs={12}   >
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item xs={10} >
                                    <Typography    >Cantidad: </Typography>
                                    <Typography    >{dataTransfer.amount}$</Typography>
                                </Grid>

                                <Grid item xs={2} >
                                    <Button     align='end' variant="contained" endIcon={<BorderColorRoundedIcon />} onClick={handleEditAmount} />
                                </Grid>
                            </Grid>
                        </Grid>

                    )
                        :
                        (<>
                            <Grid item xs={12}     >
                                <Grid container margin="2%" display="flex" justifyContent="space-between" alignItems="flex-end">
                                    <Grid item xs={10}>
                                        <TextField
                                            inputProps={{
                                                inputMode: "numeric",
                                                pattern: "[0-9]*"
                                            }}
                                            value={newAmount}
                                            onChange={handleAmountChange}
                                            label="Cantidad"
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button     variant="contained" onClick={handleSaveAmount}>
                                            Guardar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                        )}

                    <Grid item xs={12}   >
                        <Typography    >Tipo de moneda: </Typography>
                        <Typography    >{dataTransfer.currency}</Typography>
                    </Grid>
                    <Grid item xs={12}   >
                        <Typography    >CBU: </Typography>
                        <Typography    >{dataTransfer.cbu}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container display="flex" direction="column" alignItems="flex-end">
                            <Grid item xs={12}>
                                <Button     variant="contained">
                                    Transferir
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            {/* </Box> */}
        </>
    )

}
