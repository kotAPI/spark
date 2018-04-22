<template>
  <div>
      <div class="section-cover-page"></div>
    <div class="section-title-container">
        <div class="row">
            <div class="small-12 columns">
                <div class="section-mini-title">Artists</div>
            </div>
        </div>
        
    </div>
    <div class="section-content-container">
        <div class="row">
            <div class="small-3 columns" v-for="x in artistsData">
                <div class="artist-search-container" @click="goToArtistPage(x.slug)">
                    <div class=""></div>
                    <div class="artist-img" :style="applyImageStyle(x.profile_pic)"></div>
                    <div class="artist-search-name">{{x.name}}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import urlconfig from "@/utils/urlConfig"

import {mapGetters,mapActions} from 'vuex'

export default {
  data(){
      return{
          /// We need only the names, key name and profile pics
          artistsData:{
              "charlie-puth":{
                  "slug":"charlie-puth",
                  "name":"Charlie Puth",
                  "profile_pic":"assets/images/dp_charlieputh.jpg",
                  "cover_pic":"assets/images/cover_charlieputh.jpg",
                  "albums":{
                      "album_name":{
                          songs:[
                              "songs/charlieputh/how_long.mp3"
                          ]
                      }
                  }
              }
          }
      }
  },
  computed: {
    ...mapGetters('artists', [
      'getArtists'
    ])
  },
  methods:{
       ...mapActions('artists', [
        'LOAD_ARTISTS'
        ]),

      goToArtistPage(artistSlug){
          this.$router.push("artists/"+artistSlug)
          console.log(artistSlug)
          console.log(this.getArtists)
      },
      applyImageStyle(url){
          var url = urlconfig.siteURL +"/" +url
          return "background-image:url("+url+")"
      }
  },
  mounted(){
      this.LOAD_ARTISTS()
      this.artistsData = this.getArtists
  }
}
</script>


<style>
   
    
</style>