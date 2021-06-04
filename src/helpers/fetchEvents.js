import axios from 'axios';
import {errorHandler } from './successAndErrorHandler';

export const fetchEventsAuth = async (pastOrUpcoming,page,successHandler,setFeedback,history) => {
    try {
        const response = await axios.post(`/api/get-events-auth?type=${pastOrUpcoming}&page=${page}`);
        successHandler(response.data);
    } catch(e) {
        errorHandler(e,history,setFeedback)
    }
}