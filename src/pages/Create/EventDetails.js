import { Container, MenuItem, } from '@material-ui/core'
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator';
import SubmitButton from '../../components/buttons/SubmitButton';
import Textbox from '../../components/Inputs/Textbox'

function EventDetails(props) {
    const {details,nextStep,handleChange} = props;

    const forward = e => {
        e.preventDefault();
        nextStep();
    }

    const num = ["Upto 100","Upto 500","Upto 1000","More than 1000"];

    return (
        <Container component="main" maxWidth="xs" style={{border: "solid 1px red"}}>

            <ValidatorForm onSubmit={forward}>
                <Textbox
                    label="Title"
                    value={details.eventTitle}
                    onChange={handleChange('eventTitle')}
                    name="eventTitle"
                    validators={['required', 'isEmail']}
                />
                <Textbox
                    label="Description (150 words max)"
                    value={details.eventDescription}
                    onChange={handleChange('eventDescription')}
                    name="eventDescription"
                    multiline
                    rows={5}
                />
                    
                <Textbox
                    label="Genre"
                    value={details.eventGenre}
                    onChange={handleChange('eventGenre')}
                    name="eventGenre"
                />

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
                    
                <SubmitButton fullWidth={false}>
                    Next
                </SubmitButton>
            </ValidatorForm>
        </Container>
    )
}

export default EventDetails
