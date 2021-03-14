import {
    Snackbar,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React,{useState} from 'react'

function GenericSnackbar(props) {
    const [open,setOpen] = useState(props.open);

    const handleClose = (event) => {
        setOpen(false);
    }
    return (
        <Snackbar 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            action={
                <>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </>
            }
            {...props}
        />
    )
}

export default GenericSnackbar;