import { MenuItem,Grid,Container} from '@material-ui/core'
import React,{useEffect} from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import Textbox from '../../components/Inputs/Textbox'
import useStyles from './Styles'
import Forward from '@material-ui/icons/ArrowForwardIos'
import {
    reqErr,
    maxSize,
    sizeErr,
    regexText, 
    textErr, 
    futureDateValidator, 
    pastDateErr
} from '../../helpers/validators';

function EventDetails(props) {
    const {details,nextStep,handleChange} = props;
    const num = ["Upto 100", "Upto 500", "Upto 1000", "More than 1000"];

    //Hooks
    const classes = useStyles();
    useEffect(() => {
        futureDateValidator();
    }, []);

    //Functions
    const forward = e => {
        e.preventDefault();
        nextStep();
    }

    //Render Logic
    return (
    <ValidatorForm onSubmit={forward} instantValidate={true}>
            <Container maxWidth="sm" className={classes.containerStyles}>
                <Grid container spacing={1} className={classes.gridContainerStyles}>
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Title"
                            autoFocus
                            value={details.eventTitle}
                            onChange={handleChange('eventTitle')}
                            name="eventTitle"
                            validators={['required',maxSize(100),regexText]}
                            errorMessages={[reqErr,sizeErr(100),textErr]}
                        />
                    </Grid>
                        
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Genre"
                            value={details.eventGenre}
                            onChange={handleChange('eventGenre')}
                            name="eventGenre"
                            validators={['required', maxSize(50), regexText]}
                            errorMessages={[reqErr, sizeErr(50), textErr]}
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
                            validators={["futureDate"]}
                            errorMessages={[pastDateErr]}
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
                            label="Description (2000 letters max)"
                            value={details.eventDescription}
                            onChange={handleChange('eventDescription')}
                            name="eventDescription"
                            multiline
                            rows={5}
                            validators={['required',maxSize(2000)]}
                            errorMessages={[reqErr,sizeErr(2000)]}
                        />
                    </Grid>

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
               </Container>
            </ValidatorForm>
    )
}

export default EventDetails

