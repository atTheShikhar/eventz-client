import axios from 'axios';
import {successHandler,errorHandler} from './feedbackHandler';

export const bookEvents = async (data,history,setFeedback,setButtonDisabled) => {
    try {
        setButtonDisabled(true);
        const response = await axios.post('/api/book-tickets',data);
        successHandler(response,setFeedback,() => {
            setButtonDisabled(false);
            history.push('/user/mybookings',{tickets: response.data.createdTickets});
        })
    } catch(err) {
        setButtonDisabled(false);
        errorHandler(err,history,setFeedback);
    }
}