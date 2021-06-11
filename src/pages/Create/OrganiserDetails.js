import { Container, Button, Grid,Paper } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Textbox from '../../components/inputs/Textbox';
import Submit from '@material-ui/icons/ArrowUpward'
import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom';
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
import { ComponentContext } from '../../context/Context';
import { createEvent } from '../../helpers/createEvent';

function OrganiserDetails(props) {
    const {prevStep,details,handleChange} = props;
    const history = useHistory();
    //Hooks
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

                    <Grid item>
                        <Textbox
                            label="Organiser Name"
                            value={details.organiserName}
                            onChange={handleChange('organiserName')}
                            name="organiserName"
                            autoFocus
                            validators={['required',regexText,maxSize(40)]}
                            errorMessages={[reqErr,textErr,maxSizeErr(40)]}
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
                        />
                    </Grid>

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
