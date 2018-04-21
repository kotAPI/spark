const actions = {
   LOAD_PLAYLIST({commit},playlist){
    commit('SET_PLAYLIST',playlist)
   },
   LOAD_CURRENT_SONG({commit},song){
    commit('SET_CURRENT_SONG',song)
   }
}
  
  export default actions