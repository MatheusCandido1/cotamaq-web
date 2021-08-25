import { authHeader, refreshToken } from '../helpers';
import { API_URL } from '../API_URL.js'
import jsonWebTokenService from 'jsonwebtoken'
import axios from 'axios';
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

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
    resetPassword
};
 
async function me() {
    return await axios.get(`${API_URL}/users/me`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(response => {
        const data = response.data;
        if (response.status !== 200) {
            if (response.status === 401) {
                refreshToken()
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        window.Echo = new Echo({
            broadcaster: "pusher",
            key: "83cb60f1b6a7a39928a5",
            wsHost: "stage.cotamaq.com.br",
            wsPort: 6002,
            wssPort: 6002,
            disableStats: true,
            enabledTransports: ['ws', 'wss'],
            authEndpoint:"https://stage.cotamaq.com.br/broadcasting/auth",
            auth: {
              headers: {
                Authorization: authHeader().Authorization,
              }
            }
          });
        return response;
    })
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
