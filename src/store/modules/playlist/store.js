import actions from './actions'
import mutations from './mutations'

const state = ()=>({
  playlist:[],
  currentSong:''
})

const getters = {
    getPlaylist:state=>{
      return state.playlist
    },
    getCurrentSong:state=>{
      return state.currentSong
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