import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// import moduleName from './modules/{moduleName}/store.js'
import artists from './modules/artists/store.js'

export default new Vuex.Store({
  modules: {
    // add your modules here
    artists
  }
})
