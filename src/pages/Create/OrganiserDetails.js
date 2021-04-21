import { Container, Button, Grid } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import useStyles from './Styles';
import Textbox from '../../components/Inputs/Textbox';
import React from 'react'

function OrganiserDetails(props) {
    const {prevStep,details,handleChange} = props;

    const classes = useStyles();

    const backward = e => {
        e.preventDefault();
        prevStep();
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(details);
    }

    return (
        <ValidatorForm onSubmit={submitHandler}>
            <Container maxWidth="xs" className={classes.containerStyles}>
                <Grid container spacing={1} direction="column" className={classes.gridContainerStyles}>

                    <Grid item>
                        <Textbox
                            label="Organiser Name"
                            value={details.organiserName}
                            onChange={handleChange('organiserName')}
                            name="organiserName"
                            autoFocus
                        />
                    </Grid>

                    <Grid item>
                        <Textbox
                            label="Phone No."
                            value={details.phone}
                            onChange={handleChange('phone')}
                            name="phone"
                        />
                    </Grid>

                    <Grid item>
                        <Textbox
                            label="Email"
                            value={details.email}
                            onChange={handleChange('email')}
                            name="email"
                        />
                    </Grid>

                    <Grid item>
                        <Textbox
                            label="Organisation/Company/Institute Name"
                            value={details.organisationName}
                            onChange={handleChange("organisationName")}
                            name="organisationName"
                        />
                    </Grid>

                    <Grid item>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <Button
                                    color="primary"
                                    onClick={backward}
                                >Previous</Button>

                                <SubmitButton fullWidth={false}>
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
