import axios from 'axios';
import Cookies from 'js-cookie';
// const baseUrl = process.env.REACT_APP_BASE_URL;

const successHandler = (response,history,setFeedback) => {
    if (response.status === 200) {
        setFeedback({
            open: true,
            severity: "success",
            message: "Welcome " + response.data.user.name
        });
        //Redirect to homepage after 3 seconds
        setTimeout(() => {
            history.replace('/');
        }, 3000);
    }
}

const errorHandler = (err,history,setFeedback,timeout) => {
    if (err.message === "Network Error") {
        //Clear timeout before pushing since this timeout changes the state
        clearTimeout(timeout);
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

//Auth
export const isAuth = () => {
    if (Cookies.get('jwt')) {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user);
        return userObj;
    }
    //Remove user info if cookie is not present
    localStorage.removeItem('user');
    return false;
};

export const login = async (formData,history,setUser,setFeedback,timeout) => {
    try {
        const response = await axios.post(`/api/login`,formData);
        // Setting user info to localStorage 
        const { user } = response.data;
        setUser(user);
        localStorage.setItem("user",JSON.stringify(user));
        successHandler(response,history,setFeedback);
    } catch(err) { 
        errorHandler(err, history, setFeedback,timeout);
    }
}

export const logout = async (setUser,history) => {
    Cookies.remove('jwt');
    localStorage.removeItem('user');
    setUser(null);
    history.push('/');
}

export const register = async (formData, history, setFeedback,timeout) => {
    try {
        const response = await axios.post(`/api/register`,formData);
        successHandler(response, history, setFeedback);
    } catch(err) {
        errorHandler(err, history, setFeedback,timeout);
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






