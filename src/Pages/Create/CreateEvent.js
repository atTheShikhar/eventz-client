import React,{useState} from 'react'
import AddressDetails from './AddressDetails';
import EventDetails from './EventDetails';
import OrganiserDetails from './OrganiserDetails';
import {StepLabel, Stepper, Step} from '@material-ui/core';

function CreateEvent() {
    const [details,setDetails] = useState({
        //Event Details
        eventTitle: "",
        eventDiscription: "",
        noOfPeople: 100,
        isPaid: false,
        eventDate: "",
        eventDuration: "",
        eventGenre: "",

        //Address Details
        apartment: "",
        street: "",
        pinCode: "",
        city: "",
        stateName: "",
        country: "India",

        //Organiser Details
        organiserName: "",
        phone: "",
        email: "",
        organisationName: ""
    });
    const [step,setStep] = useState(0);

    const formSteps = [
        "Event Details",
        "Address Details",
        "Organiser Details"
    ];

    const nextStep = () => {
        setStep(step => step+1);
    }

    const prevStep = () => {
        setStep(step => step-1);
    }

    const handleChange = input => e => {
        setDetails({
            ...details,
            [input]: e.target.value
        });
    }
    let renderForm;
    switch(step) {
        case 0: renderForm = (
            <EventDetails
                nextStep={nextStep}
                handleChange={handleChange}
                details={details}
            />
        );
        break;
        case 1: renderForm = (
            <AddressDetails 
                prevStep={prevStep}
                nextStep={nextStep}
                handleChange={handleChange}
                details={details}
            />
        );
        break;
        case 2: renderForm = (
            <OrganiserDetails
                prevStep={prevStep}
                handleChange={handleChange}
                details={details}
            />
        );
        break;
        default: return (<CreateEvent/>)
    }
    
    return (
        <>
        <Stepper activeStep={step} >
            {
                formSteps.map(label => 
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                )
            }
        </Stepper>
        {renderForm}
        </>
    );
}

export default CreateEvent
