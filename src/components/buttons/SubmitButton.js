import {Button} from '@material-ui/core';
import React from 'react';

function SubmitButton(props) {

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            {...props}
        >
            {props.children}
        </Button>
    );
}

export default SubmitButton