import { Container, } from '@material-ui/core'
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

    return (
        <Container component="main" maxWidth="xs" style={{border: "solid 1px red"}}>

            <ValidatorForm onSubmit={forward}>
                <Textbox
                    label="Title"
                    value={details.eventTitle}
                    onChange={handleChange('eventTitle')}
                    name="eventTitle"
                    validators={['required', 'isEmail']}
                    fullWidth
                />
                
                <Textbox
                    label="Expected No. of persons"
                    value={details.noOfPeople}
                    onChange={handleChange('noOfPeople')}
                    name="noOfPeople"
                    fullWidth
                />
    
                <Textbox
                    label="Genre"
                    value={details.eventGenre}
                    onChange={handleChange('eventGenre')}
                    name="eventGenre"
                    fullWidth
                />
                
                <SubmitButton fullWidth={false}>
                    Next
                </SubmitButton>
            </ValidatorForm>
        </Container>
    )
}

export default EventDetails
