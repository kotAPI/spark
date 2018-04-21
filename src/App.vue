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
            <input type="text" class="search-bar">
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
  props: {
    msg: String
  },
  mounted(){
    
  },
  methods:{
    goToPage(url){
      this.$router.push("/"+url)
    }
  }
}
</script>

<style>
  .section-content-container{
    position: relative;
    width:100%;
    height:calc(100vh - 280px);
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 100;
    padding:10px;
    box-sizing: border-box;
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
</style>
