import { TextField, Typography, Button, Grid, Box } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import "../LoadTransfer.css";
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
            <Box className='containerGrande'>
                <Grid container className='containerResume'>
                    <Grid item xs={12} className='contendor'>
                        <Typography className='w100'>Nombre: </Typography>
                        <Typography className='w200'>{dataTransfer.fistName}, {dataTransfer.lastName}</Typography>
                    </Grid>

                    {!editingAmount ? (
                        <Grid item xs={12} className='contendor'>
                            <Grid container display="flex" justifyContent="space-between" alignItems="center">
                                <Grid item xs={11} >
                                    <Typography className='w100'>Cantidad: </Typography>
                                    <Typography className='w200'>{dataTransfer.amount}$</Typography>
                                </Grid>

                                <Grid item xs={1} >
                                    <Button className='boton' align='end' variant="contained" endIcon={<BorderColorRoundedIcon />} onClick={handleEditAmount} />
                                </Grid>
                            </Grid>
                        </Grid>

                    )
                        :
                        (<>
                            <Grid item xs={12}  className='contenedor'>
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
                                        <Button className='boton' variant="contained" onClick={handleSaveAmount}>
                                            Guardar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                        )}

                    <Grid item xs={12} className='contendor'>
                        <Typography className='w100'>Tipo de moneda: </Typography>
                        <Typography className='w200'>{dataTransfer.currency}</Typography>
                    </Grid>
                    <Grid item xs={12} className='contendor'>
                        <Typography className='w100'>CBU: </Typography>
                        <Typography className='w200'>{dataTransfer.cbu}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container display="flex" direction="column" alignItems="flex-end">
                            <Grid item xs={12}>
                                <Button className='boton' variant="contained">
                                    Transferir
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )

}