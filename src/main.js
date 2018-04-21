import Vue from 'vue'

import App from './App.vue'
import router from './router/index'
// import vuex store 
import store from './store/index'
Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


