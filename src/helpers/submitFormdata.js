import axios from 'axios';
import { errorHandler, successHandler } from './feedbackHandler';

export const submitFormdata = async (formData,history,setFeedback,setButtonDisabled,url,redirect) => {
    try {
        setButtonDisabled(true);
        const response = await axios.post(url,formData);
        successHandler(response,setFeedback,() => {
            setButtonDisabled(false)
            history.push(redirect)
        })
    } catch (e) {
       setButtonDisabled(false)
       errorHandler(e,history,setFeedback) 
    }
}