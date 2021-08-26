import { authHeader, refreshToken } from '../helpers';
import { API_URL } from '../API_URL.js'
import jsonWebTokenService from 'jsonwebtoken'
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    toggleCategories,
    me,
    createAddress,
    getAddresses,
    deleteAddress,
    setDefaultAddress,
    updateAddress,
    changePassword,
    updateUser,
    recoverPassword,
    resetPassword,
    notifications
};
 
async function me() {
    return await axios.get(`${API_URL}/users/me`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}
 function notifications() {
    return  axios.get(`${API_URL}/users/me`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}



function resetPassword(data) {
    return axios.post(`${API_URL}/auth/reset-password`, JSON.stringify(data), {
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

function recoverPassword(data) {
    return axios.post(`${API_URL}/auth/forgot-password`, JSON.stringify(data), {
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

function login(credentials) {
    return axios.post(`${API_URL}/auth/login`, JSON.stringify({ email: credentials.email, password: credentials.password }),{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }} )
        .then(response => {
            const user = response.data
            // login successful if there's a jwt token in the response
            const {id, name, email } = jsonWebTokenService.decode(user.token)
            if (user.token) {
                // store user details and jwt token in session storage to keep user logged in between page refreshes
                sessionStorage.setItem('user', JSON.stringify(Object.assign({}, user, {id, name, email})) );
                sessionStorage.setItem('token', user.token);
            }

            return user;
        })
}

function logout() {
    // remove user from session storage to log user out
    return axios.post(`${API_URL}/auth/logout`, null, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    })
}

function register(user) {
    return axios.post(`${API_URL}/auth/account`, JSON.stringify(user), {
        headers: { 
            'Content-Type': 'application/json' ,
            'Accept': 'application/json'
        }
    })
    .then(response => {
        const user = response.data
        // login successful if there's a jwt token in the response
        const {id, name, email } = jsonWebTokenService.decode(user.token)
        if (user.token) {
            // store user details and jwt token in session storage to keep user logged in between page refreshes
            sessionStorage.setItem('user', JSON.stringify(Object.assign({}, user, {id, name, email})) );
        }

        return user;
    })
}

function updateUser(data) {
    return axios.put(`${API_URL}/users`, JSON.stringify(data), {
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

function changePassword(data) {
    return axios.put(`${API_URL}/users/password`, JSON.stringify(data), {
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
    return axios.put(`${API_URL}/addresses/users/${data.id}`, JSON.stringify(data), {
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
    return axios.post(`${API_URL}/addresses/users`, JSON.stringify(data), {
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
    return axios.delete(`${API_URL}/addresses/users/${id}`, {
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
    return axios.post(`${API_URL}/addresses/users/main/${id}`, null, {
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
    return axios.get(`${API_URL}/addresses/users`, {
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

function toggleCategories(categories) {
    return axios.post(`${API_URL}/users/categories`, {categories: categories}, {
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
            // auto logout if 401 response returned from api
            refreshToken()
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return response;
}
