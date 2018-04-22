<template>
  <div id="app">
    <div class="background-wallpaper">

    </div>
    <div class="container">
      <MusicPlayer ref="player"/>
    <div class="row">
      <div class="small-2 columns">
        <div class="menu-container">
          <div @click="goToPage('/')">LOGO</div>
          <div class="menu-category">
            <div class="menu-category-title">SEARCH</div>
            <input type="text" class="search-bar" v-model="searchQuery" @input="performSearchQuery">
          </div>
          <div class="divider-category">&nbsp;</div>
          <div class="menu-category">
            <div class="menu-category-title">YOUR LIBRARY</div>
            <div class="menu-item">Your Daily Mix</div>
            <div class="menu-item">Recently Played</div>
            <div class="menu-item" @click="goToPage('artists')">Artists</div>
          </div>
        </div>
      </div>
      <div class="small-10 columns">
        <div class="main-section">
          <div class="main-section-wrapper">
            
            <router-view></router-view>
          </div>
             
        </div>
      </div>
    </div>
  </div>
   
    
    
  </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer'
export default {
  components:{MusicPlayer},
  data(){
    return{
      searchQuery:'',
    }
  },
  mounted(){
    
  },
  methods:{
    goToPage(url){
      this.$router.push("/"+url)
    },
    performSearchQuery(){
      if(this.searchQuery.length>0){
        this.$router.push("/search/"+this.searchQuery)
      }
      else{
        this.$router.push("/")
      }
      
    }
  }
}
</script>

<style>
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
/*
 *  STYLE 2
 */

body::-webkit-scrollbar {
    width: 1em;
}
 
body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
 
body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

  .section-content-container{
    position: relative;
    width:100%;
    height:calc(100vh - 280px);
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 100;
    padding:10px;
    box-sizing: border-box;
    background-color:rgba(0,0,0,0.4);
  }
  .img-responsive {
      display: block;
      width: 100%;
      height: auto;
  }
  .section-main-title{
    color: #c3bcbc;
    font-weight: 700;
    font-size: 3.2em;
    text-transform: uppercase;
  }
  .section-mini-title{
    color:#bbafaf;
    text-transform:uppercase;
    font-weight: 500;
    
  }
  .section-title-container{
    padding-top:40px;
    padding-left:40px;
    width:100%;
    min-height:200px;
    z-index: 2;
    position: relative;
    background: linear-gradient(to bottom,  #56565687,#000000cc);
  }
  

  .divider-category{
    width:60%;
    left:-20px;
    margin:auto;
    position: relative;
    border-bottom:1px solid #e4e4e4;
  }
  .search-bar{
    border:0;
    background-color:transparent;
    border:1px solid white;
    border-radius:100px;
    margin-top:4px;
    color:white;
    padding:4px 10px;
    font-weight: 700;
    font-size:0.9em;
    letter-spacing: 0.5px;
    width:80%;
    transition:width 0.2s ease-in,color, 0.2s ease-in;
    margin-left:8px;
  }
  .search-bar:focus{
    color:rgba(0,0,0,0.5);
    background-color: rgba(255,255,255,0.5);
    width:92%;
    border:1px solid white;
    outline:none;
  }
  .search-bar:hover{
    border:1px solid white;
  }
  .menu-category-title{
    padding-left: 10px;
    padding-top: 10px;
    color: white;
    cursor: default;
    font-size: 0.75em;
  }
  .menu-item{
    letter-spacing:0.2px;
    color: #525252;
    padding-left: 10px;
    font-size: 0.8em;
    padding-top: 8px;
    font-weight: 600;
    cursor: pointer;
  }
  .menu-item:hover{
    color:black;
  }
  .menu-category{
    width:100%;
  }
  .main-section{
    width:100%;
    height:100vh;
    box-sizing: border-box;
    background-color:rgba(255,255,255,0.9);
    
  }
  .menu-container{
    width: 100%;
    height: 100vh;
    margin: auto;
    z-index: 10;
    position: relative;
    padding-left: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: rgba(255,255,255,0.7);
  }
  .container{
    position: relative;
    width:100%;
    margin:auto;
    z-index:100;
  }
  body{
    margin:0;
    overflow: hidden;
  }

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
