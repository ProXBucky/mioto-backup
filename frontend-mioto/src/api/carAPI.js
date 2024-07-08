import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND;

const postNewCar = async (userId, body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/car/register/${userId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const getListCar = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/car/owner/${userId}`)
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const getListCarByCity = async (city, userId, limit) => {
    try {
        const response = await axios.get(`${API_URL}/api/car/all-car-by-city?city=${city}&userId=${parseInt(userId)}&limit=${parseInt(limit)}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const getListCarByCityByAdmin = async (city, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/car/all-car-by-city-by-admin/${city}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const getDetailCar = async (carId) => {
    try {
        const response = await axios.get(`${API_URL}/api/car/car-detail/${carId}`)
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const editCar = async (carId, body, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/car/edit/${carId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const findCarUsingParam = async (params) => {
    try {
        const response = await axios.get(`${API_URL}/api/car/find`, { params })
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getListCarS = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/car/all-car`);
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const postNewCarByAdmin = async (userId, body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/car/register-by-admin/${userId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}


const editCarByAdmin = async (carId, body, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/car/edit-by-admin/${carId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}



export {
    postNewCar, getListCar, getListCarByCity, getDetailCar, editCar, findCarUsingParam, getListCarS, postNewCarByAdmin, editCarByAdmin
    , getListCarByCityByAdmin
}