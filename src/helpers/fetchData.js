import axios from 'axios';
import {errorHandler } from './feedbackHandler';

//`/api/get-events-auth?type=${pastOrUpcoming}&page=${page}`
export const fetchDataAuth = async (url,setFeedback,history,postData) => {
    try {
        const response = await axios.post(url,postData);
        return response.data;
    } catch(e) {
        errorHandler(e,history,setFeedback)
    }
}

export const fetchData = async (url,setFeedback,history) => {
    try {
        const response = await axios.get(url)
        return response.data;
    } catch (er) {
        errorHandler(er,history,setFeedback); 
    }
}