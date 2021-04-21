import React from 'react'
import { Container, Button, Grid,MenuItem } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Textbox from '../../components/Inputs/Textbox';
import statesArray from '../../helpers/statesArray'

function AddressDetails(props) {
    const classes = useStyles();
    
    const {details,prevStep,nextStep,handleChange} = props;    

    const forward = e => {
        e.preventDefault();
        nextStep();
    }

    const backward = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <ValidatorForm onSubmit={forward}>
            <Container maxWidth="sm" className={classes.containerStyles}>
                <Grid container spacing={1} className={classes.gridContainerStyles}>
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Apartment/Building/Floor"
                            value={details.apartment}
                            onChange={handleChange('apartment')}
                            name="apartment"
                            autoFocus
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Street/Area/Colony"
                            value={details.street}
                            onChange={handleChange('street')}
                            name="street"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="City/District"
                            value={details.city}
                            onChange={handleChange('city')}
                            name="city"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="PIN Code (6 digits only)"
                            value={details.pinCode}
                            onChange={handleChange('pinCode')}
                            name="pinCode"
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

                                <SubmitButton fullWidth={false}>
                                    Next
                                </SubmitButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </ValidatorForm>       
    )
}

export default AddressDetails
