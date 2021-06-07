import axios from 'axios';
import {infoHandler,errorHandler, successHandler} from "./feedbackHandler";

export const createEvent = async (formData,history,setFeedback,setButtonDisabled) => {
    const reqBody = {
        eventDetails: {
            title: formData.eventTitle,
            description: formData.eventDescription,
            noOfPeople: formData.noOfPeople,
            duration: formData.duration,
            isFree: formData.isFree,
            price: formData.price,
            dateAndTime: formData.eventDate+"T"+formData.eventTime,
            genre: formData.eventGenre
        },
        eventAddress: {
            apartment: formData.apartment,
            street: formData.street,
            district: formData.district,
            pincode: formData.pinCode,
            stateName: formData.countryStateName,
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

        const cb = () => {
            setButtonDisabled(false);
            const eventId = response.data.eventData._id;
            history.replace(`/user/myevents/uploadposter/${eventId}`)
        }

        if(response.data.eventData.status === "pending") {
            infoHandler(response,setFeedback,cb);
        } 

        if(response.data.eventData.status === "approved") {
            successHandler(response,setFeedback,cb);
        }
    } catch (err) {
        setButtonDisabled(false);
        errorHandler(err,history,setFeedback);
    }
}