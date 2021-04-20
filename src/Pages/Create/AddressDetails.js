import { Container, TextField, Button } from '@material-ui/core';
import React from 'react'

function AddressDetails(props) {
    const {details,prevStep,nextStep,handleChange} = props;

    const forward = e => {
        e.preventDefault();
        nextStep();
    }

    const backward = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <Container component="main" maxWidth="xs" style={{ border: "solid 1px red" }}>
            <TextField
                label="Apartment/Building/Floor"
                value={details.apartment}
                onChange={handleChange('apartment')}
                name="apartment"
                />
            <br />
            <TextField
                label="Street/Area/Colony"
                value={details.street}
                onChange={handleChange('street')}
                name="street"
            />
            <br />
            <TextField
                label="PIN Code (6 digits only)"
                value={details.pinCode}
                onChange={handleChange('pinCode')}
                name="pinCode"
            />
            <br />
            <Button
                color="primary"
                variant="contained"
                onClick={backward}
            >Previous</Button>
            
            <Button
                color="primary"
                variant="contained"
                onClick={forward}
            >Next</Button>
        </Container>        
    )
}

export default AddressDetails
