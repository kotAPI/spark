import actions from './actions'
import mutations from './mutations'

const state = ()=>({
  artists:{}
})

const getters = {
  getArtists: state =>{
    return state.artists
  },
  getArtistByName:(state)=>{
    return function(args){
      return state.artists[args]
    }
  }
}

const module ={
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}

export default module