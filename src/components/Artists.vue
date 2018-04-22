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
                             <div class="row">
                                 <div class="small-4 columns">
                                     <div class="album-art-container" :style=applyAlbumArtBackground(album.album_art)></div>
                                 </div>
                                 <div class="small-8 columns">
                                     <div class="album-songs-item" v-for="(song,i) in album.songs">
                                        <div class="row">
                                            <div class="small-7 columns"  @click="playSong(song,album,i)">
                                                <span class="album-song-index">{{i+1}} .</span>
                                                <span class="artist-song-item-text">{{song.name}} </span> 
                                            </div>
                                            <div class="small-5 columns">
                                                <div class="song-details-container">
                                                    <a download :href="downloadSong(song.path)" target="_blank"><i class="material-icons song-download-icon">file_download</i></a>
                                                    <span><i class="material-icons song-playing-icon">{{markSongAsPlayingOrNot(song.path)}}</i></span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    
                                        
                                    </div>
                                 </div>
                             </div>
                             
                         </div>
                     </div>
                     
                 </div>
             </div>
         </div>
     </div>
     <iframe id="download_iframe_hack" style="display:none;"></iframe>
</div>
 
</template>

<script>
import notification from '@/utils/notification'
import siteConfig from '@/utils/urlConfig.js'
import {mapActions,mapGetters} from 'vuex'
export default {
  data(){
      return{
          artist:{name:'',cover_pic:''},
          currentSongPath:'',
          currentAlbum:'',
          currentTrackIndex:1,

      }
  },
  computed: {
    ...mapGetters('artists', [
      'getArtistByName'
    ]),
    ...mapGetters('playlist', [
      'getCurrentSong'
    ])
  },
  methods:{
      ...mapActions('artists', [
        'LOAD_ARTISTS'
        ]),
     ...mapActions('playlist', [
        'LOAD_PLAYLIST','LOAD_CURRENT_SONG'
        ]),
        downloadSong(songPath){
            var url = siteConfig.siteURL + "/"
            url += songPath

            return  url
            
        },
        applyAlbumArtBackground(url){
            return "background-image:url("+siteConfig.siteURL+"/" +url+");"
        },
        markSongAsPlayingOrNot(songPath){
            this.currentSongPath = this.getCurrentSong
            return this.currentSongPath===songPath?'volume_up':'a'
        },
        applyArtistDisplayPicture(){
            var url= siteConfig.siteURL

            var string = "background-image:url("+url+"/"+this.artist.profile_pic+")"

            return string
        },
        applyArtistCoverPage(){
           var url= siteConfig.siteURL
            
            var string = "background-image:url("+url+"/"+this.artist.cover_pic+")"

            return string
        },
        playSong(song,album,index){

            

            this.currentSongPath = song.path
            this.LOAD_CURRENT_SONG(this.currentSongPath)

            this.currentAlbum = album.name
            this.currentTrackIndex = index
            
            var songs = this.getcurrentAlbumPlaylist()
            this.LOAD_PLAYLIST(songs)

            this.$parent.$refs.player.setCurrentPlayList(songs,this.currentTrackIndex)

            this.$parent.$refs.player.playSongByPath(song.path,
            {
                name: this.artist.name,
                slug: this.artist.slug,
                thumb:album.album_art
            },
            song.name
            )

            var url = siteConfig.siteURL + "/" +album.album_art

            notification.notifySongPlaying(song.name, url,this.artist.name )
            setTimeout(function() { notification.close() }, 2000);
           
        },
        getAlbumIndexByName(name){
            for(var i=0;i<this.artist.albums.length;i++){
                if(this.artist.albums[i].name===name){
                    return i
                }
            }
            return "not_found"
        },
        getcurrentAlbumPlaylist(){
            var totalTracksAvailableForThisAlbum = this.artist
            var albumIndex = this.getAlbumIndexByName(this.currentAlbum)
            var currentAlbum = this.artist.albums[albumIndex]
            var totalNumberOfSongs = currentAlbum.songs.length

            var songs = this.artist.albums[albumIndex].songs;
            return songs
        },
        // When this component mounts, you need to have an idea of what song is currently being played, we identify it by taking the slug and cross check with
        // currently present slug names of this particular artist, if it exists, play icon is indicated, else... fuck it, wrong artist page bro, your song isnt here
        setCurrentPlayingTrack(){
            this.currentSongPath = this.$parent.$refs.player.getCurrentPlayingSong()

        }
  },
  mounted(){
    this.LOAD_ARTISTS()
    this.artist = this.getArtistByName(this.$route.params.id)

    this.setCurrentPlayingTrack()

   
     
  }
}
</script>



<style>
    .song-download-icon{
        color:#afa7a7;
    }
    .song-download-icon:hover{
        color:white;
    }
    .song-details-container{
        padding-right:15px;
        text-align: right;
    }
    .album-art-container{
        width:200px;
        height:200px;
        margin:auto;
        margin-bottom:30px;
        margin-top:40px;
        background-size: contain;
        box-shadow:1px 1px 40px black;
    }
    .artist-song-item-text{
        color:grey;
    }
    .artist-song-item-text:hover{
        cursor: pointer;
    }
    .album-songs-item:hover>.row>.columns>.artist-song-item-text{
        color:white !important;
    }

    .song-playing-icon{
        position: relative;
        top: 2px;
        left: 10px;
        color:#a0d65d;
        
    }
    .album-song-index{
        padding-right:4px;
        color:#bcbcbc;
    }
    .album-songs-item{
        width:90%;
        color: #a5a5a5;
        padding: 8px 20px;
        cursor: default;
        border-bottom: 1px solid #ffffff1f;
        margin:auto;
    }
    .album-songs-item:hover{
        color:white;
    }
    .album-songs-container{
        padding-top:10px;
        padding-bottom:10px;
       padding-left:20px;
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

