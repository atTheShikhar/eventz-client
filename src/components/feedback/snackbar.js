import React,{useContext} from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";

import { ComponentContext } from '../../context/Context'

function GenericSnackbar() { 
    const { feedback,setFeedback } = useContext(ComponentContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFeedback({
            ...feedback,
            open: false
        });
    };

    return (
        <Snackbar 
            open={feedback.open} 
            autoHideDuration={5000} 
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
            <Alert 
                elevation={6}
                variant="filled"
                onClose={handleClose} 
                severity={feedback.severity}
            >
                {feedback.message}
            </Alert>
        </Snackbar>
    )
}

export default GenericSnackbar
