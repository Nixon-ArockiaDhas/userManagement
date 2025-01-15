import axios from 'axios';

const baseURL = 'https://reqres.in/api/users';
const loginURL = 'https://reqres.in/api/login';

export const login = async (email, password) => {
    const response = await axios.post(`${loginURL}`, { email, password });
    return response.data;
}

export const fetchUsers = async (page) => {
    const response = await axios.get(`${baseURL}?page=${page}`);
    return response.data;
}

export const createUsers = async (user) => {
    try {
        const response = await axios.post(`${baseURL}`, user);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response || error.message);
        throw error;
    }
};

export const updateUsers = async (id, user) => {
    const response = await axios.put(`${baseURL}/${id}`, user);
    return response.data;
}

export const deleteUsers = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`,);
    return response;
}