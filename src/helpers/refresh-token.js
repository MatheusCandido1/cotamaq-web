import axios from 'axios'
import jsonWebTokenService from 'jsonwebtoken'

export function refreshToken() {
    let user = JSON.parse(sessionStorage.getItem('user'))
    
    axios.post('/auth/refresh', null)
    .then(response => {
        user = response.data
        const {id, name, email } = jsonWebTokenService.decode(user.token)
            if (user.token) {
                // store user details and jwt token in session storage to keep user logged in between page refreshes
                sessionStorage.setItem('user', JSON.stringify(Object.assign({}, user, {id, name, email})) )
            }
    })
    .catch(e => console.log(e.response))
}