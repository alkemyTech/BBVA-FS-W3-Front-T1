import { Table, TableBody, TableCell, TableRow, Paper, TextField, Typography, Button, Grid, Box } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import "./TransferResume.css";
import { useState } from 'react';
import { Pattern } from '@mui/icons-material';

export const TransferResume = ({ dataTransfer }) => {
    const [editingAmount, setEditingAmount] = useState(false);
    const [newAmount, setNewAmount] = useState(dataTransfer.amount);
    

    const handleEditAmount = () => {
        setEditingAmount(true);
    };

    const handleSaveAmount = () => {
        if(/^\d+$/.test(newAmount) && newAmount > 0 ){
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
            <Box justifyContent="center" textAlign="center" width="60vw">
            <Grid container spacing={4}>
                <Grid item xs={12} className='contendor'>
                    <Typography >Nombre: {dataTransfer.fistName}, {dataTransfer.lastName}</Typography>
                </Grid>

                {!editingAmount ? (
                    <Grid item xs={12} className='contendor'>
                        <Grid container display="flex" justifyContent="space-between" textAlign="center" >
                            <Typography variant='h4'>Cantidad: {dataTransfer.amount}$</Typography>
                            <Button variant="contained" endIcon={<BorderColorRoundedIcon />} onClick={handleEditAmount} />
                        </Grid>
                    </Grid>

                )
                    :
                    (<>
                        <Grid item xs={10} className='border-bottom'>
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
                        <Grid item xs={2} className='border-bottom'>
                            <Button variant="contained" onClick={handleSaveAmount}>
                                Guardar
                            </Button>
                        </Grid>
                    </>
                    )}

                <Grid item xs={12} className='contendor'>
                    <Typography >Tipo de moneda: {dataTransfer.currency}</Typography>
                </Grid>
                <Grid item xs={12} className='contendor'>
                    <Typography >CBU: {dataTransfer.cbu}</Typography>
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
