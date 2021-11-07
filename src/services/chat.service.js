import { refreshToken, authHeader } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const chatService = {
    newChat,
    getChat,
    newMessage,
    loadMessage,
    sendImage
};
function getChat() {
    return axios.get(`${API_URL}/chat`, {
        headers: {
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(handleResponse)
}
function sendImage(data) {
    return axios.post(`${API_URL}/chat/image`,data, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    }).then(handleResponse)
}
function newChat(userReceiver) {
    return axios.post(`${API_URL}/chat`,userReceiver, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}
function newMessage(data) {
    return axios.post(`${API_URL}/chat/new`,data, {
        headers: {
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(handleResponse)
}

function loadMessage(data) {
    return axios.get(`${API_URL}/chat/${data}`, {
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
