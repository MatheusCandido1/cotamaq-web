import Vue from 'vue';
import router from '@/router';
import store from '@/store'
import App from '@/App.vue';
import Toast from "vue-toastification";
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import SmartTable from 'vuejs-smart-table'
import money from 'v-money'
import moment from 'moment';
import VTooltip from 'v-tooltip'
import { VueSpinners } from '@saeris/vue-spinners'

import LottieAnimation from 'lottie-web-vue'

import './assets/css/tooltip.css';

import '@/assets/css/tailwind.css';
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;


import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');
window.Echo = new Echo({
     broadcaster: 'pusher',
     key: process.env.VUE_APP_PUSHER_APP_KEY,
     cluster: process.env.VUE_APP_PUSHER_APP_SECRET,
     wsHost: 'https://plataforma.cotamaq.com.br/api/v1',
     wsPort: 6001,
     forceTLS: false,
     disableStats: true
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

Vue.use(Toast, options);
Vue.use(VueSpinners)
Vue.use(Vuelidate)
Vue.use(VueTheMask)
Vue.use(SmartTable)
Vue.use(money, {precision: 4})
Vue.use(VTooltip)
Vue.use(LottieAnimation);

export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
