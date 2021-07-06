import React from 'react'
import { Grid } from '@material-ui/core';
import Textbox from '../../components/inputs/Textbox';
import {
    reqErr,
    maxSize,
    maxSizeErr,
    regexText,
    textErr,
    numErr,
    exactDigit,
    exactDigitErr,
    emailErr
} from '../../helpers/validators';

function OrganiserDetailsInputs(props) {
    const {details,handleChange,disabled} = props;

    return (
        <>
            <Grid item>
                <Textbox
                    label="Organiser Name"
                    value={details.organiserName}
                    onChange={handleChange('organiserName')}
                    name="organiserName"
                    autoFocus
                    validators={['required',regexText,maxSize(40)]}
                    errorMessages={[reqErr,textErr,maxSizeErr(40)]}
                    disabled={disabled}
                />
            </Grid>

            <Grid item>
                <Textbox
                    label="Phone No."
                    value={details.phone}
                    onChange={handleChange('phone')}
                    name="phone"
                    validators={['required','isNumber',exactDigit(10)]}
                    errorMessages={[reqErr,numErr,exactDigitErr(10)]}
                    disabled={disabled}
                />
            </Grid>

            <Grid item>
                <Textbox
                    label="Email"
                    value={details.email}
                    onChange={handleChange('email')}
                    name="email"
                    validators={['isEmail']}
                    errorMessages={[emailErr]}
                    disabled={true}
                />
            </Grid>

            <Grid item>
                <Textbox
                    label="Organisation/Company/Institute Name"
                    value={details.organisationName}
                    onChange={handleChange("organisationName")}
                    name="organisationName"
                    validators={[regexText, maxSize(100)]}
                    errorMessages={[textErr, maxSizeErr(100)]}
                    disabled={disabled}
                />
            </Grid>
        </>
    )
}

export default OrganiserDetailsInputs
