import React,{useState} from 'react'
import OrganiserDetails from './OrganiserDetails'
import EventDetails from './EventDetails'

function Create() {
    const [step,setStep] = useState(1) ;
    const [values,setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNum: "",
        additionInfo: "",
        eventTitle: "",
        eventDescription: "",
        eventDate: "",
        eventTime: "",
        eventAddress: ""
    })
    const prevStep = () => {
        setStep(step-1);
    }
    const nextStep = () => {
        setStep(step+1);
    }
    const handleChange = input => e => {
        setValues({[input]: e.target.value})
    }
    switch (step) {
        case 1:
            return (
                <OrganiserDetails 
                    nextStep={nextStep} 
                    handleChange={handleChange}
                    values={values}
                />
            )
            break;
        case 2: 
            return (
                <EventDetails/>
            )
            break;
        case 3: 
            return (
                <h1>Confirm?</h1>
            )
            break;
        default:
            break;
    }
}

export default Create
