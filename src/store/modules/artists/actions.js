import db from '@/database.js'

const actions = {
  LOAD_ARTISTS({commit}){
    // Your API calls need to be made here
    var data = db
    commit('SET_ARTISTS',data)
  }
}

export default actions