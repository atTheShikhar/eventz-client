import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const login = async (email,password) => {
    try {
        const response = await axios.post(`${baseUrl}/api/login`, {
            email,
            password
        });
        return response;
    } catch(err) {
        return err.response;
    }
}

export const register = async (fname,lname,email,password) => {
    try {
        const response = await axios.post(`${baseUrl}/api/register`,{
            fname,
            lname,
            email,
            password
        });
        return response;
    } catch(err) {
        return err.response;
    }
}

//Account activation request
export const activateAccount = async (formData,setFormData,history) => {
    axios.post(`${baseUrl}/api/activate`, { token: formData.token })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                setFormData({
                    ...formData,
                    show: "success"
                })
            }
        })
        .catch((err) => {
            const { status } = err.response;
            if (err.message === "Network Error")
                history.push('/neterr');
            else if(status === 400 || status === 401)
                setFormData({
                    ...formData,
                    show: "failed"
                })
            else if(status === 403) 
                setFormData({
                    ...formData,
                    show: "already exists"
                })
            else if(status === 500) //TODO: Push to server error page instead
                history.push('/neterr');
            else
                console.log(err);
        });
}


//Auth
export const isAuth = true;