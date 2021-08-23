import { authHeader, refreshToken } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const estimateService = {
    getEstimates,
    createEstimate,
    getEstimate,
    duplicateEstimate,
    updateEstimate,
    deleteEstimate,
    getAvailableEstimates
};

function getAvailableEstimates() {
    return axios.get(`${API_URL}/available/estimates`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function updateEstimate(id, data) {
    return axios.post(`${API_URL}/estimates/${id}`, data, {
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



function getEstimate(id) {
    return axios.get(`${API_URL}/estimates/${id}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}



function getEstimates() {
    return axios.get(`${API_URL}/estimates`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function createEstimate(data) {
    return axios.post(`${API_URL}/estimates`, data, {
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
function duplicateEstimate(data){
    return axios.post(`${API_URL}/estimates/duplicate/${data}`, null, {
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
}function deleteEstimate(data){
    return axios.delete(`${API_URL}/estimates/${data}`, null, {
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



/*
function getProductsByEstimate(id) {
    return axios.get(`${API_URL}/products/estimate/${id}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function getAvailableEstimates() {
    return axios.get(`${API_URL}/available/estimates`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function deleteEstimate(id) {
    return axios.delete(`${API_URL}/estimates/${id}`, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        },
    })
    .then(response => {
        const data = response.data
        return data;
    })

}

function updateEstimate(data) {
    return axios.put(`${API_URL}/estimates/${data.id}`, JSON.stringify(data), {
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

function duplicateEstimate(id) {
    return axios.post(`${API_URL}/estimates/duplicate/${id}`, null, {
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


function createEstimate(data) {
    return axios.post(`${API_URL}/estimates`, JSON.stringify(data), {
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

function getEstimates() {
    return axios.get(`${API_URL}/estimates`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function getEstimate(id) {
    return axios.get(`${API_URL}/estimates/${id}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
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
}*/

