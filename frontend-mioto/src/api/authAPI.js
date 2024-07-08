import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND;

const loginUser = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const logoutUser = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/logout`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const loginAdmin = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login-admin`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const logoutAdmin = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/logout-admin`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const resetPassword = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/reset-password`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { loginUser, logoutUser, loginAdmin, logoutAdmin, resetPassword }