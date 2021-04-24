import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";

function GenericSnackbar(props) { 
    const {message,severity,open,setOpen} = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={5000} 
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
            <Alert 
                elevation={6}
                variant="filled"
                onClose={handleClose} 
                severity={severity}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default GenericSnackbar
