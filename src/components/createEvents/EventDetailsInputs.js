import React,{useEffect,useState} from 'react'
import { MenuItem,Grid } from '@material-ui/core'
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
import Textbox from '../inputs/Textbox';

function EventDetailsInputs(props) {
    const {details,handleChange,disabled} = props;     
    const [genre,setGenre] = useState([details.eventGenre]); 
    const [num,setNum] = useState([details.noOfPeople]);
    const [timeLimits, setTimeLimits] = useState([details.duration]);
    const isFreeOptions = ["Yes","No"]; 
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
    return (
        <>
            <Grid item xs={12} sm={6}>
                <Textbox
                    label="Title"
                    autoFocus
                    value={details.eventTitle}
                    onChange={handleChange('eventTitle')}
                    name="eventTitle"
                    disabled={disabled}
                    validators={['required',maxSize(100),regexText]}
                    errorMessages={[reqErr,maxSizeErr(100),textErr]}
                />
            </Grid>
                
            <Grid item xs={12} sm={6}>
                <Textbox
                    label="Genre"
                    select
                    value={details.eventGenre}
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Textbox
                    label="Duration"
                    select
                    value={details.duration}
                    onChange={handleChange('duration')}
                    name="duration"
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={details.isFree === "Yes" || disabled}
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
                    disabled={disabled}
                />
            </Grid>
        </>
    )
}

export default EventDetailsInputs
