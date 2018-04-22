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
    .artist-search-name{
        color: #c5c1c1;
        text-align: center;
        padding-top: 10px;
        font-weight: 700;
    }
    .artist-img{
        width:180px;
        height:180px;
        border-radius: 100px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin: auto;
        transition: background 0.8s;
        cursor: pointer;
    }
    .artist-img:hover{
        background-size: 170%;
    }
    .artist-search-container{
        padding-top:20px;
        position: relative;
        z-index: 100;
        width:200px;
        height: 200px;
        margin:auto;
    }
    .section-cover-page{
        background-image:url("https://orig00.deviantart.net/0450/f/2011/291/5/7/carbon_wallpaper_redone_by_5urface-d4d87gf.jpg");
        position: fixed;
        top:0px;
        left:0px;
        width:100%;
        background-size:cover;
        background-position: center;
        height:100%;
        z-index:1;
        filter:brightness(0.5)
    }
</style>