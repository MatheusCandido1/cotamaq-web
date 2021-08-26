import { refreshToken, authHeader } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const notificationService = {
    toggleRead,
};

function toggleRead(data) {
    return axios.put(`${API_URL}/notification/${data}`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}

function handleResponse(response) {
    const data = response.data;
    if (response.status !== 200) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            refreshToken()
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;
}
