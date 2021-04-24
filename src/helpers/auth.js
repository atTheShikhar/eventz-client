import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const successHandler = (response,history,setFeedback) => {
    if (response.status === 200) {
        setFeedback({
            open: true,
            severity: "success",
            message: response.data.message
        });
        //Redirect to homepage after 3 seconds
        setTimeout(() => {
            history.push('/');
        }, 3000);
    }
}

const errorHandler = (err,history,setFeedback) => {
    if (err.message === "Network Error") {
        history.push('/neterr');
    } else {
        const message = err.response?.data?.error ?? err.message;
        setFeedback({
            open: true,
            severity: "error",
            message: message
        })
    }
}

export const login = async (formData,history,setFeedback) => {
    try {
        const response = await axios.post(`${baseUrl}/api/login`,formData);
        //TODO: Set token 
        successHandler(response,history,setFeedback);
    } catch(err) { 
        errorHandler(err, history, setFeedback);
    }
}

export const register = async (formData, history, setFeedback) => {
    try {
        const response = await axios.post(`${baseUrl}/api/register`,formData);
        successHandler(response, history, setFeedback);
    } catch(err) {
        errorHandler(err, history, setFeedback);
    }
}

//Account activation request
export const activateAccount = async (formData,setFormData,history) => {
    try {
        const response = await axios.post(`${baseUrl}/api/activate`, { token: formData.token })
        if (response.status === 200) {
            setFormData({
                ...formData,
                show: "success"
            })
        }
    } catch(err) {
        if (err.message === "Network Error")
            history.push('/neterr');
        else {
            const { status } = err.response;
            if (status === 400 || status === 401)
                setFormData({
                    ...formData,
                    show: "failed"
                })
            else if (status === 403)
                setFormData({
                    ...formData,
                    show: "already exists"
                })
            else if (status === 500) //TODO: Push to server error page instead
                history.push('/neterr');
            else
                console.log(err);
        }
    }
}


//Auth
export const isAuth = true;