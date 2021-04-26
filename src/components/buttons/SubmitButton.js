import {Button} from '@material-ui/core';
import React, { useContext } from 'react';
import { ComponentContext } from '../../context/Context';

function SubmitButton(props) {
    const {buttonDisabled} = useContext(ComponentContext);

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
            {...props}
        >
            {props.children}
        </Button>
    );
}

export default SubmitButton