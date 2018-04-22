import Router from 'vue-router'
import Vue from 'vue'
import Home from '@/components/Home.vue'
import Artists from '@/components/Artists.vue'
import ArtistSearch from '@/components/ArtistSearch.vue'
import SearchResults from '@/components/SearchResults.vue'

Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/artists',
      name: 'ArtistSearch',
      component: ArtistSearch
    },
    {
      path: '/artists/:id',
      name: 'Artists',
      component: Artists
    },
    {
      path: '/search/:searchterm',
      name: 'Search',
      component: SearchResults
    },
  ]
})