import { refreshToken, authHeader } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const paymentConditionService = {
    getPaymentConditions,
    createPaymentCondition,
    updatePaymentCondition,
    deletePaymentCondition,
    getPaymentConditionByProposal
};

function getPaymentConditionByProposal(id) {
    return axios.get(`${API_URL}/payment-conditions/proposal/${id}`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}


function createPaymentCondition(data) {
    return axios.post(`${API_URL}/payment-conditions`, JSON.stringify(data), {
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

function getPaymentConditions() {
    return axios.get(`${API_URL}/payment-conditions`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}

function updatePaymentCondition(data) {
    return axios.put(`${API_URL}/payment-conditions/${data.id}`, JSON.stringify(data), {
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

function deletePaymentCondition(id) {
    return axios.delete(`${API_URL}/payment-conditions/${id}`, {
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
