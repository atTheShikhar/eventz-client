import React,{useState} from 'react'
import AddressDetails from './AddressDetails';
import EventDetails from './EventDetails';
import OrganiserDetails from './OrganiserDetails';
import {StepLabel, Stepper, Step, Container, makeStyles, Grid} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    stepperStyles: {
        backgroundColor: theme.palette.background.default,
    },
    containerStyles: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4)
    }
}));

function CreateEvent() {
    const currentDate = new Date().toJSON().split('T')[0];
    

    const classes = useStyles();
    const [details,setDetails] = useState({
        //Event Details
        eventTitle: "",
        eventDescription: "",
        noOfPeople: "Upto 100",
        // isPaid: false,
        eventDate: currentDate,
        eventTime: "12:00",
        eventGenre: "",

        //Address Details
        apartment: "",
        street: "",
        pinCode: "",
        city: "",
        stateName: "Andaman and Nicobar Islands",
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
        <Container maxWidth="xl" className={classes.containerStyles}>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Container maxWidth="sm">
                        <Stepper activeStep={step} className={classes.stepperStyles}>
                            {
                                formSteps.map(label =>
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                )
                            }
                        </Stepper>
                    </Container>
                </Grid>
                <Grid item>
                    {renderForm}
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateEvent
