import React from 'react'
// import { TextField } from '@material-ui/core'
import {TextValidator} from 'react-material-ui-form-validator'

function Textbox(props) {

    return (
        <TextValidator
            variant="outlined"
            margin="normal"
            autoComplete={props.name}
            fullWidth
            {...props}
        >
            {props.children}
        </TextValidator>
    )
}

export default Textbox
