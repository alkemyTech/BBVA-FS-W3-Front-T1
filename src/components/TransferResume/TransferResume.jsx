import { TextField, Typography, Button, Grid, Box } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import "./TransferResume.css";
import { useState } from 'react';


export const TransferResume = ({ dataTransfer }) => {
    const [editingAmount, setEditingAmount] = useState(false);
    const [newAmount, setNewAmount] = useState(dataTransfer.amount);


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
                            <Grid container >
                                <Grid item xs={10} >
                                    <Typography className='w100'>Cantidad: </Typography>
                                    <Typography className='w200'>{dataTransfer.amount}$</Typography>
                                </Grid>

                                <Grid item xs={2} display="flex" direction="column" justifyContent="center" alignItems="flex-end">
                                    <Button className='boton' align='end' variant="contained" endIcon={<BorderColorRoundedIcon />} onClick={handleEditAmount} />
                                </Grid>
                            </Grid>
                        </Grid>

                    )
                        :
                        (<>
                            <Grid item xs={12} display="flex" alignItems="flex-end" className='contenedor'>
                                <Grid container >
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
                                        <Button variant="contained" onClick={handleSaveAmount}>
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
                        <Button variant="contained">
                            Transferir
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )

}
