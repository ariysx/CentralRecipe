// Strictly for HTTP request back n forth
import axios from "axios";
import {toast} from "react-toastify";

const API_URL = "/api/user/"

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    // axios returns data in .data
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    // axios returns data in .data
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// remove user from local storage
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('favourites')
}

const updateProfile = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL, data, config)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// export functions here
const authService = {
    register,
    login,
    logout,
    updateProfile,
}

// export module
export default authService