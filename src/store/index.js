import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user';
import estimate from './estimate/index'
import order from './order/index'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    user,
    estimate,
    order
  }
})
