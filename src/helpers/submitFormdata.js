import axios from 'axios';
import { errorHandler, successHandler } from './feedbackHandler';

export const submitFormdata = async (
    formData,
    history,
    setFeedback,
    setButtonDisabled,
    url,
    redirect
    ) => {
    try {
        setButtonDisabled(true);
        const response = await axios.post(url,formData);
        successHandler(response,setFeedback,() => {
            setButtonDisabled(false)
            if(redirect !== null)
                history.push(redirect)
        })
        if(redirect === null && Boolean(response))
            return "success"
    } catch (e) {
       setButtonDisabled(false)
       errorHandler(e,history,setFeedback) 
    }
}