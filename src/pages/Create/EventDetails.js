import { MenuItem,Grid,Container,Paper } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import Textbox from '../../components/inputs/Textbox'
import useStyles from './Styles'
import Forward from '@material-ui/icons/ArrowForwardIos'
import {
    reqErr,
    maxSize,
    maxSizeErr,
    regexText, 
    textErr, 
    futureDateValidator, 
    pastDateErr,
    numErr
} from '../../helpers/validators';
import axios from 'axios';

function EventDetails(props) {
    const {details,nextStep,handleChange} = props;
    const [genre,setGenre] = useState([details.eventGenre]); 
    const [num,setNum] = useState([details.noOfPeople]);
    const [timeLimits, setTimeLimits] = useState([details.duration]);
    const isFreeOptions = ["Yes","No"]; 
    //Hooks
    const classes = useStyles();
    useEffect(() => {
        futureDateValidator();
        const getMetadata = async () => {
            try {
                const response = await axios.get('/api/events-metadata');
                // console.log(response)
                setNum(response.data.noOfPeople);
                setTimeLimits(response.data.timeLimits)
                setGenre(response.data.genre);
            } catch(e) {
                console.log(e);
            }
        }
    
        getMetadata();

    }, []);

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
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Title"
                            autoFocus
                            value={details.eventTitle}
                            onChange={handleChange('eventTitle')}
                            name="eventTitle"
                            validators={['required',maxSize(100),regexText]}
                            errorMessages={[reqErr,maxSizeErr(100),textErr]}
                        />
                    </Grid>
                        
                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Genre"
                            select
                            value={details.eventGenre}
                            onChange={handleChange('eventGenre')}
                            name="eventGenre"
                        >
                            {
                                genre.map(option => (
                                    <MenuItem key={option} value ={option}>
                                        {option}
                                    </MenuItem>
                                ))
                            }
                        </Textbox>
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

                    <Grid item xs={12} sm={6}>
                        <Textbox
                            label="Duration"
                            select
                            value={details.duration}
                            onChange={handleChange('duration')}
                            name="duration"
                        >
                            {
                                timeLimits.map( option => (
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
                            label="Free Event ?"
                            select
                            value={details.isFree}
                            onChange={handleChange('isFree')}
                            name="isFree"
                        >
                            {
                                isFreeOptions.map( option => (
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
                            label="Ticket Price (Rupee)"
                            value={details.price}
                            onChange={handleChange('price')}
                            name="price"
                            disabled={details.isFree === "Yes"}
                            validators={['isFloat']}
                            errorMessages={[numErr]}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Textbox
                            label="Description (2000 letters max)"
                            value={details.eventDescription}
                            onChange={handleChange('eventDescription')}
                            name="eventDescription"
                            multiline
                            rows={5}
                            validators={['required',maxSize(2000)]}
                            errorMessages={[reqErr,maxSizeErr(2000)]}
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
                </Paper>
               </Container>
            </ValidatorForm>
    )
}

export default EventDetails

