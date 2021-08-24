import Vue from 'vue';
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'
import Toast from "vue-toastification"
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import SmartTable from 'vuejs-smart-table'
import money from 'v-money'
import moment from 'moment'
import VTooltip from 'v-tooltip'
import { VueSpinners } from '@saeris/vue-spinners'
import CoolLightBox from 'vue-cool-lightbox'
import LottieAnimation from 'lottie-web-vue'
import VueSuggestion from 'vue-suggestion'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import './assets/css/tooltip.css';
import '@/assets/css/tailwind.css';
import "vue-toastification/dist/index.css";
import VueLazyload from 'vue-lazyload'
import Multiselect from 'vue-multiselect'

Vue.config.productionTip = false;


import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');
var user = JSON.parse(sessionStorage.getItem('user'))

// PRODUÇÃO

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: "local",
//   wsHost: "dominio",
//   wsPort: 6001,
//   encrypted: false,
//   wssPort: 6001,
//   disableStats: true,
//   enabledTransports: ['ws', 'wss'],
//   authEndpoint:"endpoint completo",
//   auth: {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("token")
//     }
//   }
// });

// DEVELOP
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "local",
  wsHost: "127.0.0.1",
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  authEndpoint:"http://127.0.0.1:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: "Bearer " +  user.token
    }
  }
});

const options = {
  // You can set your default options here
};

Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD/MM/YYYY')
  }
});

Vue.filter('Document', function(value) {
    value = value.padStart(14, '0');
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return value
});

Vue.component('multiselect', Multiselect)
Vue.use(Toast, options);
Vue.use(VueSpinners)
Vue.use(Vuelidate)
Vue.use(VueTheMask)
Vue.use(SmartTable)
Vue.use(money, {precision: 4})
Vue.use(VTooltip)
Vue.use(LottieAnimation)
Vue.use(VueLazyload)
Vue.use(CoolLightBox)
Vue.use(VueSuggestion)

export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
