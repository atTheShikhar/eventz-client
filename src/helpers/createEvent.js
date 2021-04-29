import axios from 'axios';
import {successHandler,errorHandler} from "./successAndErrorHandler";

export const createEvent = async (formData,history,setFeedback,setButtonDisabled) => {
    const reqBody = {
        eventDetails: {
            title: formData.eventTitle,
            description: formData.eventDescription,
            noOfPeople: formData.noOfPeople,
            dateAndTime: formData.eventDate+"T"+formData.eventTime,
            genre: formData.eventGenre
        },
        eventAddress: {
            apartment: formData.apartment,
            street: formData.street,
            city: formData.city,
            pincode: formData.pinCode,
            stateName: formData.stateName,
            country: formData.country
        },
        eventOrganiser: {
            organiserName: formData.organiserName,
            phone: formData.phone,
            email: formData.email,
            orgName: formData.organisationName
        }
    }

    try {
        setButtonDisabled(true);
        const response = await axios.post('/api/create-event',reqBody);
        successHandler(response,setFeedback,() => {
            setButtonDisabled(false);
            history.replace('/')
        });
    } catch (err) {
        setButtonDisabled(false);
        errorHandler(err,history,setFeedback);
    }
}