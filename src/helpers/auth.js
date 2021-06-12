import axios from 'axios';
import Cookies from 'js-cookie';
import {
    successHandler,
    errorHandler
} from './feedbackHandler';
// const baseUrl = process.env.REACT_APP_BASE_URL;


//Auth
export const isAuth = () => {
    if (Cookies.get('jwt')) {
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        return userData;
    }
    //Remove user info if cookie is not present
    localStorage.removeItem('user');
    return false;
};

export const login = async (formData,history,setUser,setFeedback,routes) => {
    try {
        const response = await axios.post(routes.hit,formData);
        // Setting user info to localStorage 
        const { user } = response?.data;
        setUser(user);
        localStorage.setItem("user",JSON.stringify(user));
        successHandler(response,setFeedback,() => {history.replace(routes.redirect)});
    } catch(err) { 
        errorHandler(err, history, setFeedback);
    }
}

export const logout = (setUser,history) => {
    Cookies.remove('jwt');
    localStorage.removeItem('user');
    setUser(null);
    if(history !== null)
        history.push('/');
}

export const register = async (formData, history, setFeedback,setButtonDisabled) => {
    try {
        setButtonDisabled(true);
        const response = await axios.post(`/api/register`,formData);
        successHandler(response, setFeedback,() => {
            setButtonDisabled(false);
            history.replace('/')
        });
    } catch(err) {
        setButtonDisabled(false);
        errorHandler(err, history, setFeedback);
    }
}

export const forgetPassword = async (email, history,setFeedback,setButtonDisabled) => {
    try {
        setButtonDisabled(true);
        const response = await axios.post('/api/forgetpassword',{email});
        successHandler(response,setFeedback,() => {
            setButtonDisabled(false);
            history.replace('/')
        });
    } catch(err) {
        setButtonDisabled(false);
        errorHandler(err, history, setFeedback);
    }
}

//Account activation request
export const activateAccount = async (formData,setFormData,history) => {
    try {
        const response = await axios.post(`/api/activate`, { token: formData.token })
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

export const resetPassword = async (formData,history,setFeedback,setButtonDisabled) => {
    try {
        setButtonDisabled(true);
        const response = await axios.put('/api/resetpassword', formData);
        Cookies.remove("jwt");
        localStorage.removeItem("user");
        successHandler(response,setFeedback,() => {
            setButtonDisabled(false);
            history.replace("/")
        });
    } catch(err) {
        setButtonDisabled(false);
        errorHandler(err, history, setFeedback);
    }
}

// setUser(user);
// localStorage.setItem("user",JSON.stringify(user));
export const changePassword = async (formData,history,setFeedback,setButtonDisabled) => {
    try {
        setButtonDisabled(true);
        const response = await axios.post('/api/user/changepassword',formData);
        // logout(setUser,null);
        successHandler(response,setFeedback,() => {
            setButtonDisabled(false);
            history.goBack();
        })
    } catch(err) {
        setButtonDisabled(false);
        errorHandler(err,history,setFeedback);
    }
}




