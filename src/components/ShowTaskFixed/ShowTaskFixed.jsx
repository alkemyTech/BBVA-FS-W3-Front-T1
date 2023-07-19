import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { TaskFixedInterface } from '../TaskFixedInterface/TaskFixedInterface';
import { Box, Button, Grid, Typography } from '@mui/material';
import "../TaskFixedInterface/TaskFixedInterface.css"

export const ShowTaskFixed = ({onClickOtro}) => {
    const navigate = useNavigate();

    const returnHome = () =>{
        navigate("/")
    }


    return (
        <>
            <Grid container spacing={6} textAlign="center">
                <Grid item xs={12}>
                    <Typography className='informacion'>Monto invertido </Typography>
                    <Typography className='datos'>10000 (Borrar)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className='informacion'>Interes obtenido </Typography>
                    <Typography className='datos'>600 (Borrar)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className='informacion' >Monto total a cobrar</Typography>
                    <Typography className='datos' >10600 (Borrar)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className='informacion'>Inicio del plazo fijo</Typography>
                    <Typography className='datos'>10-2-2023 (Boorar)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className='informacion'>Finalizacion del plazo fijo</Typography>
                    <Typography className='datos'>10-3-2023 (Boorar)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" >
                        <Grid item xs={2} >
                            <Button variant="contained" className='boton' onClick={returnHome}>
                                Home
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" className='boton' onClick={onClickOtro}>
                                otro
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
