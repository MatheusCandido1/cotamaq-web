import { refreshToken, authHeader } from '../helpers';
import { API_URL } from '../API_URL.js'
import axios from 'axios';

export const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductsByProposal,
    getProductsByEstimate,
    updateProductDetail,
    duplicateProduct
};

function updateProductDetail(data, proposalId) {
    return axios.put(`${API_URL}/products/${data.id}/proposal/${proposalId}`, JSON.stringify(data), {
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

function updateProduct(data) {
    return axios.put(`${API_URL}/products/${data.id}`, JSON.stringify(data), {
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

function duplicateProduct(id, data) {
    return axios.post(`${API_URL}/products/duplicate/${id}`, JSON.stringify(data), {
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


function createProduct(data) {
    return axios.post(`${API_URL}/products/${data.estimate_id}`, JSON.stringify(data), {
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

function deleteProduct(id) {
    return axios.delete(`${API_URL}/products/${id}`, {
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

function getProductsByProposal(id) {
    return axios.get(`${API_URL}/products/proposal/${id}`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
}

function getProductsByEstimate(id) {
    return axios.get(`${API_URL}/products/estimate/${id}`, {
        headers: { 
            ...authHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }).then(handleResponse)
    
}

function getProducts(id) {
    return axios.get(`${API_URL}/products/${id}`, {
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
