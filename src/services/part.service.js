import { authHeader, refreshToken } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const partService = {
    getParts,
    createPart,
    //duplicatePart,
    //deletePart
};



function getParts() {
    return axios.get(`${API_URL}/parts`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function createPart(data) {
    return axios.post(`${API_URL}/parts`, data, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        const data = response.data
        
        return data;
    })

}

function handleResponse(response) {
    const data = response.data;
    if (response.status !== 200) {
        if (response.status === 401) {
            refreshToken()
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;
}

