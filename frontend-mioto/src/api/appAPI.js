import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND;


const getAllCarFeature = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/feature`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const checkLikeCar = async (userId, carId) => {
    try {
        const response = await axios.get(`${API_URL}/api/like/checkLike?userId=${userId}&carId=${carId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllCarLiked = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/like/${userId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllReviewOfCar = async (carId) => {
    try {
        const response = await axios.get(`${API_URL}/api/review/${carId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllReviewByCity = async (cityCode) => {
    try {
        const response = await axios.get(`${API_URL}/api/review/city/${cityCode}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getReviewScore = async (carId) => {
    try {
        // const response = await axios.get(`${API_URL}/api/review/reviewScore/${carId}`)
        const response = await axios.get(`${API_URL}/api/car/statistic/${carId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllVoucherByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/voucher/${userId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getInformationUserById = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/user/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllTripByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/all-trip/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllOrderByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/all-order/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getTripByRentId = async (rentId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/detail-trip/${rentId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const checkStatusRent = async (carId, beginDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/check-status?carId=${carId}&beginDate=${beginDate}&endDate=${endDate}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllUser = async (token, page, limit) => {
    try {
        const response = await axios.get(`${API_URL}/api/user?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return { users: [], total: 0 };
    }
};

const getAllUserByAdmin = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/user/get-all-by-admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return { users: [] }
    }
};

const getAllAdmin = async (token, page, limit) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch admins:', error);
        return { admins: [], total: 0 };
    }
};

const getAllVoucher = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/voucher`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllReport = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/report/all`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllPendingTrip = async (city, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/all-trip-pending-by-city/${city}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllFinishedTrip = async (city, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/all-trip-finish-by-city/${city}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllBlogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/blog`,)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllBlogsWithLimit = async (limit) => {
    try {
        const response = await axios.get(`${API_URL}/api/blog/limit/${limit}`,)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getOneBlogByBlogId = async (blogId) => {
    try {
        const response = await axios.get(`${API_URL}/api/blog/${blogId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const countTrip = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/count/${userId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const statistic = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/statistic`,
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
};

const statisticIncome = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/income`,
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
};


export {
    getAllCarFeature, checkLikeCar, getAllCarLiked, getAllReviewOfCar, getAllReviewByCity, getReviewScore, getAllVoucherByUserId, getInformationUserById, getAllTripByUserId,
    getTripByRentId, checkStatusRent, getAllUser, getAllAdmin, getAllVoucher, getAllReport, getAllPendingTrip, getAllFinishedTrip, getAllOrderByUserId,
    getAllBlogs, getOneBlogByBlogId, statistic, countTrip, getAllBlogsWithLimit, statisticIncome, getAllUserByAdmin
}