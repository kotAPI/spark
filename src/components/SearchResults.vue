<template>
 <div>
    <div class="section-cover-page"></div>
    <div class="section-title-container">
        <div class="row">
            <div class="small-12 columns">
                <div class="section-mini-title">Search</div>
            </div>
        </div>
        
    </div>
    <div class="section-content-container">
        <div class="row" >
            <div class="small-12 columns" style="padding:10px;">
                <div class="section-mini-title">Artists</div>
                <div class="search-artists-container">
                    <div class="row">
                        <div class="no-search-results" v-if="searchData.artists.length==0">No Results</div>
                        <div class="small-3 columns" v-for="x in searchData.artists">
                            <div class="artist-search-container" @click="goToArtistPage(x.slug)">
                                <div class="artist-img" :style="applyImageStyle(x.profile_pic)"></div>
                                <div class="artist-search-name">{{x.name}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="row" style="margin-top:40px;">
            <div class="small-12 columns" style="padding:10px;">
                <div class="section-mini-title">Songs</div>
                <div class="search-artists-container">
                    <div class="row">
                        <div class="no-search-results" v-if="searchData.songs.length==0">No Results</div>
                        <div class="small-12 columns" v-for="(x,i) in searchData.songs">
                                
                                <div class="album-songs-item">
                                    <span class="album-song-index">{{i+1}} .</span>
                                    <span class="artist-song-item-text">{{x.name}} </span> 
                                </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>


        <!--  -->
        
        <div class="row" style="margin-top:40px;">
            <div class="small-12 columns" style="padding:10px;">
                <div class="section-mini-title">Albums</div>
                <div class="search-artists-container">
                    <div class="row">

                        <div class="no-search-results" v-if="searchData.albums.length==0">No Results</div>
                        <div class="small-3 columns" v-for="x in searchData.albums">
                            <div class="artist-search-container" @click="goToArtistPage(x.artist.path)">
                                <div class="artist-img" :style="applyImageStyle(x.album_art)"></div>
                                <div class="artist-search-name">{{x.name}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <!--  -->

    </div>
  </div>
</template>

<script>
import urlconfig from "@/utils/urlConfig"
import {mapActions, mapGetters} from 'vuex'
export default {
    data(){
        return{
            searchParams:'',
            searchData:{artists:[],songs:[],albums:[]}
        }
    },
    watch:{
        '$route'(to, from) {
            this.searchParams = from.params.searchterm
        },
        'searchParams'(){
            
            this.searchFromQuery(this.$route.params.searchterm)

           
        }
    },
    computed:{
    ...mapGetters('artists', [
      'getArtistByName','getArtists'
    ]),
    },
    methods:{
         ...mapActions('artists', [
        'LOAD_ARTISTS'
        ]),
        goToArtistPage(artistSlug){
          this.$router.push("/artists/"+artistSlug)
          console.log(artistSlug)
          console.log(this.getArtists)
      },
       applyImageStyle(url){
          var url = urlconfig.siteURL +"/" +url
          return "background-image:url("+url+")"
      },
        searchFromQuery(query){
            var artists = []
            var songs = []
            var albums = []

            var data = this.getArtists
            for(var obj in data){
                var name = data[obj].name
                if(name.toLowerCase().includes(this.searchParams.toLowerCase())){
                    artists.push(data[obj])
                }
                for(var song in data[obj].albums){
                    var currAlbums = data[obj].albums
                    for(var i=0;i<currAlbums.length;i++){
                        if(currAlbums[i].name.toLowerCase().includes(this.searchParams.toLowerCase())){
                            if(!albums.includes(currAlbums[i])){
                                currAlbums[i].artist = {name:data[obj].name,path:data[obj].slug}
                                albums.push(currAlbums[i])
                            }
                            
                        }
                    }
                    if(this.searchParams.length==0){
                        albums=[]
                    }

                    
                }

                for(var j=0;j<currAlbums.length;j++){
                        var currSongs = currAlbums[j].songs
                        for(var k = 0;k<currSongs.length;k++){
                            var song = currSongs[k]
                            if(song.name.toLowerCase().includes(this.searchParams.toLowerCase())){
                                
                                songs.push(song)
                            }
                        }
                    }
            }

            


            this.searchData.artists = artists
            this.searchData.songs = songs
            this.searchData.albums = albums
        }
    },
    mounted(){
        this.LOAD_ARTISTS()
        this.searchParams = this.$route.params.searchterm
    }
}
</script>

<style>
 .no-search-results{
     padding-left:40px;
     margin-top:10px;
     color:white;
 }
</style>
