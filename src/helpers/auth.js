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

export const isAuth = true;