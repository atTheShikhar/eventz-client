import React from 'react'
import { Container, Button, Grid,MenuItem,Paper } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Textbox from '../../components/inputs/Textbox';
import statesArray from '../../helpers/statesArray'
import Forward from '@material-ui/icons/ArrowForwardIos'
import {
    reqErr,
    maxSize,
    maxSizeErr,
    regexText,
    textErr,
    numErr,
    exactDigit,
    exactDigitErr
} from '../../helpers/validators';

function AddressDetails(props) {
    const {details,prevStep,nextStep,handleChange} = props;    

    //Hooks
    const classes = useStyles();

    //Functions
    const forward = e => {
        e.preventDefault();
        nextStep();
    }
    const backward = e => {
        e.preventDefault();
        prevStep();
    }

    //Render Logic
    return (
        <ValidatorForm onSubmit={forward} instantValidate={true}>
            <Container maxWidth="sm">
                <Paper className={classes.paperContainer}>
                <Grid container spacing={1} className={classes.gridContainerStyles}>
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Apartment/Building/Floor"
                            value={details.apartment}
                            onChange={handleChange('apartment')}
                            name="apartment"
                            autoFocus
                            validators={['required',maxSize(50)]}
                            errorMessages={[reqErr,maxSizeErr(50)]}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Street/Area/Colony"
                            value={details.street}
                            onChange={handleChange('street')}
                            name="street"
                            validators={['required',maxSize(100)]}
                            errorMessages={[reqErr,maxSizeErr(100)]}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="City/District"
                            value={details.city}
                            onChange={handleChange('city')}
                            name="city"
                            validators={['required',maxSize(40),regexText]}
                            errorMessages={[reqErr,maxSizeErr(40),textErr]}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="PIN Code"
                            value={details.pinCode}
                            onChange={handleChange('pinCode')}
                            name="pinCode"
                            validators={['required','isNumber',exactDigit(6)]}
                            errorMessages={[reqErr,numErr,exactDigitErr(6)]}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="States/UT"
                            select
                            value={details.stateName}
                            onChange={handleChange('stateName')}
                            name="stateName"
                        >
                            {
                                statesArray.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                )
                                )
                            }
                        </Textbox>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Country"
                            value={details.country}
                            onChange={handleChange('country')}
                            name="country"
                            disabled
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <Button
                                    color="primary"
                                    onClick={backward}
                                >Previous</Button>

                                <SubmitButton 
                                    fullWidth={false}
                                    endIcon={<Forward/>}
                                >
                                    Next
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </Paper>
            </Container>
        </ValidatorForm>       
    )
}

export default AddressDetails
