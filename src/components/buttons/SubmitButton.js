import {Button,makeStyles} from '@material-ui/core';
import React, { useContext } from 'react';
import { ComponentContext } from '../../context/Context';

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: "#20232a",
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.grey[800]
        }
    }
}))

function SubmitButton(props) {
    const {buttonDisabled} = useContext(ComponentContext);
    const classes = useStyles();
    return (
        <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            disabled={buttonDisabled}
            {...props}
            className={`${props.className} ${classes.button}`}
        >
            {props.children}
        </Button>
    );
}

export default SubmitButton