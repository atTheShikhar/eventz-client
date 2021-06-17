import React, { useContext } from 'react'
import {Dialog,DialogTitle,DialogContent,
    DialogContentText,DialogActions,Button
} from '@material-ui/core';
import { ComponentContext } from '../../context/Context';

function CustomDialog() {
    const {dialog,setDialog} = useContext(ComponentContext);

    const yesHandler = (e) => {
        dialog.actionYes();
        setDialog(dialog => ({
            ...dialog,
            open: false
        }))
    }
    const noHandler = (e) => {
        dialog.actionNo();
        setDialog(dialog => ({
            ...dialog,
            open: false
        }))
    }

    return (
        <Dialog
            open={dialog.open}
            onClose={() => {
                setDialog(dialog => ({
                    ...dialog,
                    open: false
                }))
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {dialog.message}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={noHandler} color="primary">
                No
            </Button>
            <Button onClick={yesHandler} color="primary" autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog
