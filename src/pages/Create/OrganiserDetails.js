import { Container, Button, Grid } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Textbox from '../../components/Inputs/Textbox';
import Submit from '@material-ui/icons/ArrowUpward'
import React from 'react'
import {
    reqErr,
    maxSize,
    sizeErr,
    regexText,
    textErr,
    numErr,
    exactDigit,
    exactDigitErr,
    emailErr
} from '../../helpers/validators';

function OrganiserDetails(props) {
    const {prevStep,details,handleChange} = props;
    //Hooks
    const classes = useStyles();

    //Functions
    const backward = e => {
        e.preventDefault();
        prevStep();
    }
    const submitHandler = e => {
        e.preventDefault();
        console.log(details);
    }

    //Render Logic
    return (
        <ValidatorForm onSubmit={submitHandler} instantValidate={true}>
            <Container maxWidth="xs" className={classes.containerStyles}>
                <Grid 
                    container 
                    spacing={1} 
                    direction="column" 
                    className={classes.gridContainerStyles}
                >

                    <Grid item>
                        <Textbox
                            label="Organiser Name"
                            value={details.organiserName}
                            onChange={handleChange('organiserName')}
                            name="organiserName"
                            autoFocus
                            validators={['required',regexText,maxSize(40)]}
                            errorMessages={[reqErr,textErr,sizeErr(40)]}
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
                        />
                    </Grid>

                    <Grid item>
                        <Textbox
                            label="Email"
                            value={details.email}
                            onChange={handleChange('email')}
                            name="email"
                            validators={['required','isEmail']}
                            errorMessages={[reqErr,emailErr]}
                        />
                    </Grid>

                    <Grid item>
                        <Textbox
                            label="Organisation/Company/Institute Name"
                            value={details.organisationName}
                            onChange={handleChange("organisationName")}
                            name="organisationName"
                            validators={['required', regexText, maxSize(100)]}
                            errorMessages={[reqErr, textErr, sizeErr(100)]}
                        />
                    </Grid>

                    <Grid item>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <Button
                                    color="primary"
                                    onClick={backward}
                                >Previous</Button>

                                <SubmitButton fullWidth={false} endIcon={<Submit/>}>
                                    Submit
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </ValidatorForm>
    )
}

export default OrganiserDetails
