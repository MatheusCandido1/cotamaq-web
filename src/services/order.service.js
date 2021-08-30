import { authHeader, refreshToken } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const orderService = {
    getOrdersByBuyer,
    getOrdersBySeller,
    createOrder,
    getOrderByBuyer,
    getOrderBySeller,
    updateStatus,
    updatePdf,
    updateXml,
    updateBillet,
    showPdf,
    uploadFiles,
    selectPaymentBySeller,
    getPaymentOptions,
    updatePaymentOptionsByBuyer
};

function getOrdersByBuyer(data) {
    return axios.get(`${API_URL}/orders/buyer/${data}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function getOrdersBySeller(data) {
    return axios.get(`${API_URL}/orders/seller/${data}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}



function showPdf(id) {
    return axios.get(`${API_URL}/orders/${id}/pdf`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function createOrder(data) {
    return axios.post(`${API_URL}/orders/${data.proposal_id}`, JSON.stringify(data), {
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


function uploadFiles(data,id, onUploadProgress) {
    return axios.post(`${API_URL}/orders/${id}/pdf`, data, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    })
    .then(response => {
        const data = response.data
        
        return data;
    })
}

function getPaymentOptions(id) {
    return axios.get(`${API_URL}/orders/${id}/payments`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function updatePdf(data,id, onUploadProgress) {
    return axios.post(`${API_URL}/orders/${id}/pdf`, data, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    })
    .then(response => {
        const data = response.data
        
        return data;
    })
}


function updatePaymentOptionsByBuyer(data) {
    return axios.post(`${API_URL}/orders/${data.id}/payments`, data, {
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

function updateXml(data,id, onUploadProgress) {
    return axios.post(`${API_URL}/orders/${id}/xml`, data, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    })
    .then(response => {
        const data = response.data
        
        return data;
    })
}



function selectPaymentBySeller(data) {
    return axios.post(`${API_URL}/orders/${data.id}/payment/seller`, JSON.stringify(data), {
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

function updateBillet(data,id,onUploadProgress) {
    return axios.post(`${API_URL}/orders/${id}/billet`, data, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
    })
    .then(response => {
        const data = response.data
        
        return data;
    })
}

function updateStatus(data) {
    return axios.put(`${API_URL}/orders/${data.id}`, JSON.stringify(data), {
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

function getOrderByBuyer(id) {
    return axios.get(`${API_URL}/orders/${id}/buyer`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function getOrderBySeller(id) {
    return axios.get(`${API_URL}/orders/${id}/seller`,  {
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
}

