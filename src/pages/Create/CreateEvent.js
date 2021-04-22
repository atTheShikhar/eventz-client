import React,{useState} from 'react'
import AddressDetails from './AddressDetails';
import EventDetails from './EventDetails';
import OrganiserDetails from './OrganiserDetails';
import {StepLabel, Stepper, Step, Container, Grid, Box} from '@material-ui/core';
import Copyright from '../../components/Copyright';
import useStyles from './Styles'

function CreateEvent() {
    //Attributes
    const currentDate = new Date().toJSON().split('T')[0];
    const formSteps = [
        "Event Details",
        "Address Details",
        "Organiser Details"
    ];
    let renderForm;

    //Hooks
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

    //Functions
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

    //Multistep Form Logic
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
    
    //Render Logic
    return (
        <Container maxWidth="xl" component="main" className={classes.mainStyles}>
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
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Grid>
        </Container>
    );
}

export default CreateEvent
