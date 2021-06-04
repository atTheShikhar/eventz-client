import React from 'react'
import {TextValidator} from 'react-material-ui-form-validator'
import {
    withStyles,
} from '@material-ui/core';


const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#20232a'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#20232a',
            },
        },
    }
})(TextValidator);


function Textbox(props) {

    return (
        <CustomTextField
            variant="outlined"
            margin="normal"
            autoComplete={props.name}
            fullWidth
            style={{color: "black"}}
            {...props}
        >
            {props.children}
        </CustomTextField>
    )
}

export default Textbox
