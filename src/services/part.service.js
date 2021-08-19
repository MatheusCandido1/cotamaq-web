import { authHeader, refreshToken } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const partService = {
    getParts,
    createPart,
    getPart,
    duplicatePart,
    updatePart,
    //deletePart
};

function updatePart(id, data) {
    return axios.post(`${API_URL}/parts/${id}`, data, {
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



function getPart(id) {
    return axios.get(`${API_URL}/parts/${id}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}



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
function duplicatePart(data){
    return axios.post(`${API_URL}/parts/duplicate/${data}`, null, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
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



