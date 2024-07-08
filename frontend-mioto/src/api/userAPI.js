import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND;


const editInformationUserById = async (userId, body, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/user/${userId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const changePasswordUserById = async (userId, body, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/user/change-password/${userId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getInformationLicenseById = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/license/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const postInformationLicenseById = async (userId, body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/license/${userId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const postAddress = async (userId, body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/address/${userId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllAddressByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/address/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const deleteAddress = async (addressId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/api/address/${addressId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const createNewUser = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/user`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const likeCar = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/like`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const dislikeCar = async (userId, carId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/api/like?userId=${userId}&carId=${carId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const postReviewCar = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/review`, body,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const reportCar = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/report`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const rentCar = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/rent`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const cancelTrip = async (rentId, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/rent/cancel-trip/${rentId}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const acceptTrip = async (rentId, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/rent/accept-trip/${rentId}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export {
    changePasswordUserById, editInformationUserById, getInformationLicenseById, postInformationLicenseById,
    postAddress, getAllAddressByUserId, deleteAddress, createNewUser, likeCar, dislikeCar, postReviewCar, reportCar, rentCar, cancelTrip, acceptTrip
}
