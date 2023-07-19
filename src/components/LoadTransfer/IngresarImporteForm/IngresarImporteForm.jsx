import { Grid, Typography, TextField, Button, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form";


export const IngresarImporteForm = ({handleOnSumbit}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateAmount = (value) => {
        if (!/^\d+$/.test(value)) {
            return 'Ingresar solo numeros';
        }
        if (value <= 0){
            return 'Ingresar un importe positivo'
        }
        return true;
    }

    return (
        <Grid container spacing={4} component="form" onSubmit={handleSubmit(handleOnSumbit)}>
            <Grid item xs={12}>
                <Typography variant="h5">Ingrese importe a transferir</Typography>
            </Grid>
            <Grid item xs={10}>
                <TextField label="Importe a transferir" variant="standard" fullWidth {...register('amount', { validate: validateAmount })} />
                {errors.amount && <Alert severity="error">{errors.amount.message}</Alert> } 
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                    Transferir
                </Button>
            </Grid>
        </Grid>
    )
}
