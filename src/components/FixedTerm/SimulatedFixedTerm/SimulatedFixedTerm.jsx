import { useState } from 'react'
import { TaskFixedInterface } from '../TaskFixedInterface/TaskFixedInterface';
import { Box} from '@mui/material';
import "../FixedTermStyles.css"
import { ShowTaskFixed } from '../ShowTaskFixed/ShowTaskFixed';


export const SimulatedFixedTerm = () => {
    const [formData, setFormData] = useState({ amount: '', days: '' });
    const [recivedData, setrecivedData] = useState(false);

    const handleSubmit = (data) => {
        console.log(data);
        setFormData(data);
        //TODO hacer fetch
        setrecivedData(true);
    }


    return (
        <>
            <Box className="containerBox">
                {!recivedData ?
                    <>
                    <TaskFixedInterface onSubmit={handleSubmit} tipoCarga={"Esto es una simulacion"}/>
                    </>
                    :
                    <ShowTaskFixed onClickOtro={() => {setrecivedData(false)}}/>
                }
            </Box>
        </>
    )
}
