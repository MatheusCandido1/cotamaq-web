import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

export const echoService = {
    connect,
};
export function connect() {
    
var token = sessionStorage.getItem('token')

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "83cb60f1b6a7a39928a5",
  wsHost: "stage.cotamaq.com.br",
  wsPort: 6002,
  encrypted: false,
  wssPort: 6002,
  cluster: 'mt1',
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  authEndpoint:"https://stage.cotamaq.com.br/broadcasting/auth",
  auth: {
    headers: {
      Authorization: token ? `Bearer ${token}`:null
    }
  }
});
}
  
