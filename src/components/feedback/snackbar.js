import {
    Snackbar,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'

function GenericSnackbar(props) {
    const {setOpen} = props;
    const handleClose = (e) => {
        setOpen(false)
    }
    return (
        <Snackbar 
            {...props}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            autoHideDuration={4000}
            onClose={handleClose}
            action={
                <>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </>
            }
        />
    )
}

export default GenericSnackbar;