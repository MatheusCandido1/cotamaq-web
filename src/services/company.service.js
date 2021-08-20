import { refreshToken, authHeader } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const companyService = {
    getCompanies,
    updateCompany,
    getAddresses,
    updateAddress,
    createAddress,
    deleteAddress,
    setDefaultAddress,
    createUser,
    getUsers,
    deleteUser
};

function getCompanies() {
    return axios.get(`${API_URL}/companies`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}

function updateCompany(data) {
    return axios.put(`${API_URL}/companies`, JSON.stringify(data), {
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

function updateAddress(data) {
    return axios.put(`${API_URL}/addresses/companies/${data.id}`, JSON.stringify(data), {
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

function createAddress(data) {
    return axios.post(`${API_URL}/addresses/companies`, JSON.stringify(data), {
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

function deleteAddress(id) {
    return axios.delete(`${API_URL}/addresses/companies/${id}`, {
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

function setDefaultAddress(id) {
    return axios.post(`${API_URL}/addresses/companies/main/${id}`, null, {
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

function getAddresses() {
    return axios.get(`${API_URL}/addresses/companies`, {
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

function getUsers() {
    return axios.get(`${API_URL}/companies/users`, {
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

function createUser(user) {
    return axios.post(`${API_URL}/companies/users`, user, {
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

function deleteUser(user) {
    return axios.delete(`${API_URL}/companies/users/${user}`,  {
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
