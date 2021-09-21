window.Pusher = require('pusher-js');
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import {API_URL} from "../API_URL";


export const beansService = {
    connect,
};
export function connect() {
    console.log('conect to beams...')
    var token = sessionStorage.getItem('token')

    const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
        url: `${API_URL}/auth/beams`,
        headers: {
            Authorization: token ? `Bearer ${token}`:null
        }
    });
    localStorage.setItem('beamsToken',JSON.stringify(beamsTokenProvider))
    console.log(localStorage.getItem('beamsToken'))
    return beamsTokenProvider
}

