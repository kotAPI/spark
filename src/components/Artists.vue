<template>
<div>
    <div class="section-cover-page" :style="applyArtistCoverPage()"></div>
    <div class="section-title-container">
        <div class="row">
            <div class="small-12 columns">
                <div class="section-mini-title">Artist</div>
            </div>
            <div class="small-5 columns">
                <div class="section-main-title">{{ artist.name }}</div>
            </div>
            <div class="small-7 columns">
                <div class="artist-page-dp" :style="applyArtistDisplayPicture()"></div>
            </div>
        </div>
        
    </div>
     <div class="section-content-container">
         <div v-for="album in artist.albums">
             <div class="row">
                 <div class="small-12 columns">
                     <div class="album-container">
                         <div class="album-title">{{album.name}} <span class="album-release-year">{{album.year}} </span></div>
                         <div class="album-songs-container">
                             <div class="album-songs-item" v-for="(song,i) in album.songs" @click="playSong(song,album)">
                                <span class="album-song-index">{{i+1}} .</span>  {{song.name}}  
                                <span><i class="material-icons song-playing-icon">{{currentSongPath===song.path?'volume_up':'a'}}</i></span>
                             </div>
                         </div>
                     </div>
                     
                 </div>
             </div>
         </div>
     </div>
</div>
 
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data(){
      return{
          artist:{name:'',cover_pic:''},
          currentSongPath:''
      }
  },
  computed: {
    ...mapGetters('artists', [
      'getArtistByName'
    ])
  },
  methods:{
      ...mapActions('artists', [
        'LOAD_ARTISTS'
        ]),
        applyArtistDisplayPicture(){
            var url= document.referrer.split( '/' );
            url = url[0]+"//"+url[1]+url[2]

            var string = "background-image:url("+url+"/"+this.artist.profile_pic+")"

            return string
        },
        applyArtistCoverPage(){
            var url= document.referrer.split( '/' );
            url = url[0]+"//"+url[1]+url[2]
            
            var string = "background-image:url("+url+"/"+this.artist.cover_pic+")"

            return string
        },
        playSong(song,album){
            this.currentSongPath = song.path
            

            this.$parent.$refs.player.playSongByPath(song.path,
            {
                name: this.artist.name,
                slug: this.artist.slug,
                thumb:album.album_art
            },
            song.name
            )
        },
        setCurrentPlayingTrack(){
            this.currentSongPath = this.$parent.$refs.player.getCurrentPlayingSong()

        }
  },
  mounted(){
    this.LOAD_ARTISTS()
    this.artist = this.getArtistByName(this.$route.params.id)

      
     
  }
}
</script>



<style>
    .song-playing-icon{
        position: relative;
        top: 6px;
        left: 10px;
        
    }
    .album-song-index{
        padding-right:4px;
        color:#bcbcbc;
    }
    .album-songs-item{
        color: #a5a5a5;
        padding: 0px 20px;
        cursor: default;
    }
    .album-songs-item:hover{
        color:white;
    }
    .album-songs-container{
        padding-top:10px;
        padding-bottom:10px;
        background-color:rgba(0,0,0,0.2);
    }
    .album-release-year{
        color: #9a9a9a;
        font-size: 0.4em;
    }
    .album-title{
        color: #e2dbdb;
        font-size:2em;
        font-weight: 700;
    }
    .album-container{
        width:100%;
        margin:4px 20px;
        padding:10px;
        cursor: default;
        user-select: none;
    }
    .artist-page-dp{
        position: relative;
        top:-32px;
        width:120px;
        height:120px;
        border-radius:200px;
        background-size:cover;

    }
    .section-cover-page{
        background-image:url("http://wallpaperfav.com/wp-content/uploads/plixpapers1610/linkin_park_wallpaper_background_34788.jpg");
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

