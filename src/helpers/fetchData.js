import axios from 'axios';
import {errorHandler } from './feedbackHandler';

//`/api/get-events-auth?type=${pastOrUpcoming}&page=${page}`
export const fetchDataAuth = async (url,successHandler,setFeedback,history) => {
    try {
        const response = await axios.post(url);
        successHandler(response.data);
    } catch(e) {
        errorHandler(e,history,setFeedback)
    }
}