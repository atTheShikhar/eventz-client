import React from 'react'
import { Container, Button, Grid,Paper } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Forward from '@material-ui/icons/ArrowForwardIos'
import AddressDetailsInputs from '../../components/createEvents/AddressDetailsInputs';

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

                    <AddressDetailsInputs
                        details={details}
                        handleChange={handleChange}
                    />

                    <Grid item xs={12}>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <Button
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

