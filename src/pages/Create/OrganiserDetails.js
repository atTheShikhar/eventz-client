import { Container, Button, Grid,Paper } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Submit from '@material-ui/icons/ArrowUpward'
import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom';
import { ComponentContext } from '../../context/Context';
import { createEvent } from '../../helpers/manageEvent';
import OrganiserDetailsInputs from '../../components/createEvents/OrganiserDetailsInputs';

function OrganiserDetails(props) {
    const {prevStep,details,handleChange} = props;

    //Hooks
    const history = useHistory();
    const classes = useStyles();
    const { setButtonDisabled,setFeedback } = useContext(ComponentContext);

    //Functions
    const backward = e => {
        e.preventDefault();
        prevStep();
    }
    const submitHandler = e => {
        e.preventDefault();
        createEvent(details,history,setFeedback,setButtonDisabled);
        // console.log(details)
   }

    //Render Logic
    return (
        <ValidatorForm onSubmit={submitHandler} instantValidate={true}>
            <Container maxWidth="xs" className={classes.containerStyles}>
                <Paper className={classes.paperContainer}>
                <Grid 
                    container 
                    spacing={1} 
                    direction="column" 
                    className={classes.gridContainerStyles}
                >

                    <OrganiserDetailsInputs
                        details={details}
                        handleChange={handleChange}
                    />

                    <Grid item>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <Button
                                    onClick={backward}
                                >Previous</Button>

                                <SubmitButton 
                                    fullWidth={false} 
                                    endIcon={<Submit/>}
                                >
                                    Submit
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

export default OrganiserDetails
