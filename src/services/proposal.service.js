import { refreshToken, authHeader } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const proposalService = {
    createProposal,
    getProposal,
    updateProposal,
    getBuyerProposals,
    getProposalsByEstimate,
    declineProposal,
    getProposalDetails,
    togglePaymentMethods,
    togglePaymentConditions,
    deleteProposal,
    declineProposalByBuyer,
    approveProposalByBuyer,
    deleteImage,
    getImages,
    ReOpenProposal
};

function declineProposalByBuyer(id) {
    return axios.post(`${API_URL}/proposals/${id}/buyer`, null, {
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

function approveProposalByBuyer(id, subTotal) {
    return axios.post(`${API_URL}/proposals/${id}/approve`, subTotal, {
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

function deleteProposal(id) {
    return axios.delete(`${API_URL}/proposals/${id}`, {
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

function updateProposal(id,data) {
    return axios.post(`${API_URL}/proposals/${id}`, data, {
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
function ReOpenProposal(id,data) {
    return axios.post(`${API_URL}/proposals/re-open/estimates/${id}`, data, {
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


function createProposal(data) {
    return axios.post(`${API_URL}/proposals`, data, {
        headers: { 
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        const data = response.data
        console.log(data)
        
        return data;
    })
}

function getBuyerProposals() {
    return axios.get(`${API_URL}/buyer/proposals`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function declineProposal(data) {
    return axios.post(`${API_URL}/proposals/decline/estimates/${data.estimate_id}`, JSON.stringify(data), {
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

function getProposalDetails(id) {
    return axios.get(`${API_URL}/proposals/details/${id}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function togglePaymentMethods(paymentMethods,id) {
    return axios.post(`${API_URL}/proposals/${id}/payment-method`, {paymentMethods: paymentMethods}, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
            }
        }).then(response => {
            const data = response.data
            return data;
        })
}

function togglePaymentConditions(paymentConditions,id) {
    return axios.post(`${API_URL}/proposals/${id}/payment-condition`, {paymentConditions: paymentConditions}, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
            }
        }).then(response => {
            const data = response.data
            return data;
        })
}


function getProposalsByEstimate(id) {
    return axios.get(`${API_URL}/proposals/estimate/${id}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}

function getProposal(id) {
    return axios.get(`${API_URL}/proposals/${id}`,  {
        headers: { 
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}
function deleteImage(id) {
    return axios.delete(`${API_URL}/proposals/image/${id}`,  {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(handleResponse)
}
function getImages(proposal, estimate) {
    return axios.get(`${API_URL}/proposals/images/${proposal}/${estimate}`,  {
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
            // auto logout if 401 response returned from api
            refreshToken()
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;
}

