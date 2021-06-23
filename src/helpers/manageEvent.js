import axios from 'axios';
import {infoHandler,errorHandler, successHandler} from "./feedbackHandler";
import { submitFormdata } from './submitFormdata';

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

export const updateEvent = async (id,updateField,details,setFeedback,setButtonDisabled,history) => {
    let update = null;
    switch (updateField) {
        case "eventDetails":
            update = {
                title: details.eventTitle,
                description: details.eventDescription,
                noOfPeople: details.noOfPeople,
                duration: details.duration,
                isFree: details.isFree,
                price: details.price,
                dateAndTime: details.eventDate+"T"+details.eventTime,
                genre: details.eventGenre
            }
            break;
        case "eventAddress":
            update = {
                apartment: details.apartment,
                district: details.district,
                street: details.street,
                pincode: details.pinCode,
                stateName: details.countryStateName,
                country: details.country
            }
            break;
        case "eventOrganiser":
            update = {
                organiserName: details.organiserName,
                phone: details.phone,
                orgName: details.organisationName
            }
            break;
        default:
            break;
    }
    if(update != null) {
        const formData = {eventId: id,updateField,update}
        const url = "/api/admin/event/update"
        await submitFormdata(formData,history,setFeedback,setButtonDisabled,url,null);
    }
}

//Admin action handler
export const approveDeleteEvent = async (
    id,history,setFeedback,setButtonDisabled,
    setDialog,action,updateList
) => {
    async function actionYes() {
        const url = `/api/admin/${action}/event`

        const status = await submitFormdata({id: id, action: action},
            history,setFeedback,setButtonDisabled,url,null
        ) 
        
        if(status === "success" && updateList != null)
        {
            if(action==="approve") {
                const newData = updateList.events.map(msg => {
                    if(msg._id === id) 
                        return {...msg,status: "approved"}
                    else 
                        return msg;
                })
                await updateList.setEvents(newData);
            } 
            if(action==="delete") {
                const newData = updateList.events.filter(msg => (msg._id !== id))
                await updateList.setEvents(newData);
            }
        }
        
    }

    setDialog({
        open: true,
        title: "Confirm Decision",
        message: `Are you sure you want to ${action} this event?`,
        actionYes: actionYes,
        actionNo: function() {
        }
    });
}