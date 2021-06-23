import { Grid,Container,Paper } from '@material-ui/core'
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles'
import Forward from '@material-ui/icons/ArrowForwardIos'
import EventDetailsInputs from '../../components/createEvents/EventDetailsInputs';

function EventDetails(props) {
    const {details,nextStep,handleChange} = props;
    //Hooks
    const classes = useStyles();

    //Functions
    const forward = e => {
        e.preventDefault();
        nextStep();
    }

    //Render Logic
    return (
    <ValidatorForm onSubmit={forward} instantValidate={true}>
            <Container maxWidth="sm">
                <Paper className={classes.paperContainer}>
                <Grid container spacing={1}>
                    
                    <EventDetailsInputs
                        details={details}
                        handleChange={handleChange}
                    />

                    <Grid item xs>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
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

export default EventDetails