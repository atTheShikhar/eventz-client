import axios from 'axios';
import { errorHandler, successHandler } from './feedbackHandler';

const imageUploadHandler = async (url,file,fileName,history,setFeedback,onUploadProgress) => {
    let formData = new FormData();

    formData.append(fileName, file);
    try {
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
        successHandler(response,setFeedback,() => {

        });
        const s = "success";
        return s;
    } catch(e) {
        errorHandler(e,history,setFeedback);
    }
}

export default imageUploadHandler;