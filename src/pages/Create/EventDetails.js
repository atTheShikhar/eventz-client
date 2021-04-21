import { MenuItem,Grid,Container } from '@material-ui/core'
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import Textbox from '../../components/Inputs/Textbox'
import useStyles from './Styles'

function EventDetails(props) {
    const {details,nextStep,handleChange} = props;
    const classes = useStyles();

    const forward = e => {
        e.preventDefault();
        nextStep();
    }

    const num = ["Upto 100","Upto 500","Upto 1000","More than 1000"];
    return (
    <ValidatorForm onSubmit={forward}>
            <Container maxWidth="sm" className={classes.containerStyles}>
                <Grid container spacing={1} className={classes.gridContainerStyles}>
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Title"
                            autoFocus
                            value={details.eventTitle}
                            onChange={handleChange('eventTitle')}
                            name="eventTitle"
                        />
                    </Grid>
                        
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Genre"
                            value={details.eventGenre}
                            onChange={handleChange('eventGenre')}
                            name="eventGenre"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Expected No. of persons"
                            select
                            value={details.noOfPeople}
                            onChange={handleChange('noOfPeople')}
                            name="noOfPeople"
                        >
                            {
                                num.map( option => (
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
                            label="Date of Event"
                            type="date"
                            value={details.eventDate}
                            onChange={handleChange('eventDate')}
                            name="eventDate"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Time of Event"
                            type="time"
                            value={details.eventTime}
                            onChange={handleChange('eventTime')}
                            name="eventTime"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>

                    {/* <Grid item xs={12} sm={6}>
                        
                    </Grid> */}
                    
                    <Grid item xs={12}>
                        <Textbox
                            label="Description (150 words max)"
                            value={details.eventDescription}
                            onChange={handleChange('eventDescription')}
                            name="eventDescription"
                            multiline
                            rows={5}
                        />
                    </Grid>

                    <Grid item xs>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
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

export default EventDetails
