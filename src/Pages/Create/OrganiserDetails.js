import { Container, TextField, Button } from '@material-ui/core'
import React from 'react'

function OrganiserDetails(props) {
    const {prevStep,details,handleChange} = props;

    const backward = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <Container maxWidth="xs" component="main">
            <TextField
                label="Organizer Name"
                value={details.organiserName}
                onChange={handleChange('organiserName')}
                name="organiserName"
                fullWidth
            />
            <br/>
            <TextField
                label="Phone No."
                value={details.phone}
                onChange={handleChange('phone')}
                name="phone"
                fullWidth
            />
            <br/>
            <TextField
                label="Email"
                value={details.email}
                onChange={handleChange('email')}
                name="email"
                fullWidth
            />
            <br/>
            <TextField
                label="Organisation/Company/Institute Name"
                value={details.organisationName}
                onChange={handleChange("organisationName")}
                name="organisationName"
                fullWidth
            />
            <br/>
            <Button
                color="primary"
                variant="contained"
                onClick={backward}
            >Previous</Button>

        </Container>
    )
}

export default OrganiserDetails
