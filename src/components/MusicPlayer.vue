<template>
    <div class="music-player-container">
        <audio src="" style="display:hidden" ref="audioplayer"></audio>
        <div class="row" style="margin-top:10px;">
            <div class="small-2 columns">
                <div class="row">
                    <div class="small-3 columns">
                        <div class="image-container">
                             <img :src="currentPlayingSongThumb" alt="" class="player-artist-image">
                        </div>
                       
                    </div>
                    <div class="small-9 columns">
                        <div class="player-artist-song">{{currentPlayingSongName}}</div>
                        <div class="player-artist-name">{{currentPlayingSongArtist.name}}</div>
                    </div>
                </div>
            </div>
            <div class="small-8 columns">
                <div class="row">
                    <div class="small-12 columns">
                        <div class="controls-container">
                            <i class="material-icons controls-icon">shuffle</i>
                            <i class="material-icons controls-icon">skip_previous</i>
                            <span class="play-button" @click="playOrPause" >
                                <i class="material-icons play-icon">
                                    {{!playing?'play_arrow':'pause'}}
                                </i>
                                
                            </span>
                            <i class="material-icons controls-icon">skip_next</i>
                            <i class="material-icons controls-icon">repeat</i>
                        </div>
                        <div>
                            <input type="range" min="1" max="100" :value="songPlayedPercentage" id="slider" class="slider" @change="seekToDuration($event)">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="small-2 columns">
                c
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
      return{
          audioObject:undefined,
          playing:false,
          currentTime:undefined,
          soundTotalDuration:undefined,
          songPlayedPercentage:0,
          sliderval:undefined,
          // Interval for calling a function ever N millisecons, having it here helps not having the IDs to change unexpectedly
          intervalID:undefined,
          //
          currentPlayingTrack:"/lp.mp3",

          ///Song Details
          currentPlayingSongArtist:{name:'',slug:''},
          currentPlayingSongName:undefined,
          currentPlayingSongThumb:undefined
      }
  },
  methods:{
      playSongByPath(path,artistObject,songName){
        this.currentPlayingSongArtist = artistObject
        this.currentPlayingSongName = songName
   
        var url= document.referrer.split( '/' );
        url = url[0]+"//"+url[1]+url[2]

        var string = url+"/"+path
        
        
        this.currentPlayingSongThumb = url+"/"+artistObject.thumb
        this.currentPlayingTrack = path
        this.audioObject.src=string
        this.playOrPause()
      },
      getCurrentPlayingSong(){
          return this.currentPlayingTrack
      },
      endSong(){
          clearInterval(this.intervalID)
          this.currentTime = 0
          this.songPlayedPercentage = 0;
          this.playing=false

      },
      seekToDuration(event){
          var seekPercentage = event.target.value

          this.currentTime = seekPercentage*this.soundTotalDuration/100

          this.audioObject.currentTime = this.currentTime
          this.songPlayedPercentage = this.currentTime/this.soundTotalDuration*100

      },
      playOrPause(){
         

          
          if(this.audioObject.paused){
              this.playing = true
              this.audioObject.play()

              this.intervalID = setInterval(this.tickUpdater,800)
              
          }
          else{
              this.audioObject.pause()
              this.playing=false

              clearInterval(this.intervalID)
              
          }
          
      },
      tickUpdater(){
          this.currentTime = this.audioObject.currentTime
          this.soundTotalDuration = this.audioObject.duration

          this.songPlayedPercentage = this.currentTime/this.soundTotalDuration*100
      }
  },
  mounted(){
    if(this.audioObject == undefined){
        //
        //asdas
        this.audioObject =  new Audio();
        this.audioObject.src = this.currentPlayingTrack
        this.audioObject.onended = this.endSong
    }
    
  }
}
</script>


<style>
    #slider{
        position: relative;
        top:6px;
        width: 50%;
        border: 0px;
        outline: none;
        margin: auto;
        display: block;
        transition:all 0.2s;
        background-color: transparent;
    }
    .controls-icon{
        display: inline-block;
        color:white;
        user-select: none;
        cursor: pointer;
        margin-right:10px;
    }
    .controls-icon:hover{
        color:#4caf50;
    }
    .play-icon{
        position: relative;
        padding: 6px;
        color: white;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
    }
    .play-button{
        box-sizing: border-box;
        border-radius:100%;
        display:inline-block;
        border:2px solid white;
        width:40px;
        height:40px;
        transition: all 0.3s;
        margin-right:10px;
    }
    .play-button:hover{
        border:2px solid #4caf50;
    }
    .play-button:hover>.play-icon{
        color:#4caf50;
    }
    .controls-container{
        width:200px;
        height:40px;
        margin:auto;

    }
    .player-artist-name{
        color: #6b6b6b;
        font-size: 0.9em;
        padding-top: 2px;
        cursor: default;
    }
    .player-artist-song{
        color:#d2cfcf;
        padding-top:12px;
        font-size: 0.8em;
        cursor: default;
    }
    .player-artist-image{
        display: block;
        
        width:48px;
        height:48px;
        margin:auto;
        margin-top:6px;
    }
    .image-container{
        width:48px;
        height:48px;
        margin:auto;
    }
    .music-player-container{
        padding-left:20px;
        box-sizing: border-box;
        width:100vw;
        height:80px;
        position: fixed;
        bottom:0px;
        border:1px solid black;
        z-index:100;
        background-color:rgba(0,0,0,0.95);
    }





    input[type=range].slider {
  -webkit-appearance: none;
  width: 100%;
  margin: 2px 0;
}
input[type=range].slider:focus {
  outline: none;
}
input[type=range].slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  box-shadow: 0.2px 0.2px 0px #000000, 0px 0px 0.2px #0d0d0d;
  background: #7fcd00;
  border-radius: 23.9px;
  border: 0px solid #010101;
}
input[type=range].slider::-webkit-slider-thumb {
  box-shadow: 1.9px 1.9px 6.2px #000000, 0px 0px 1.9px #0d0d0d;
  border: 0px solid #009c00;
  height: 12px;
  width: 12px;
  border-radius: 50px;
  background: #4caf50;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5px;
}
input[type=range].slider:focus::-webkit-slider-runnable-track {
  background: #82d200;
}
input[type=range].slider::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  box-shadow: 0.2px 0.2px 0px #000000, 0px 0px 0.2px #0d0d0d;
  background: #7fcd00;
  border-radius: 23.9px;
  border: 0px solid #010101;
}
input[type=range].slider::-moz-range-thumb {
  box-shadow: 1.9px 1.9px 6.2px #000000, 0px 0px 1.9px #0d0d0d;
  border: 0px solid #009c00;
  height: 12px;
  width: 12px;
  border-radius: 50px;
  background: #4caf50;
  cursor: pointer;
}
input[type=range].slider::-ms-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range].slider::-ms-fill-lower {
  background: #7cc800;
  border: 0px solid #010101;
  border-radius: 47.8px;
  box-shadow: 0.2px 0.2px 0px #000000, 0px 0px 0.2px #0d0d0d;
}
input[type=range].slider::-ms-fill-upper {
  background: #7fcd00;
  border: 0px solid #010101;
  border-radius: 47.8px;
  box-shadow: 0.2px 0.2px 0px #000000, 0px 0px 0.2px #0d0d0d;
}
input[type=range].slider::-ms-thumb {
  box-shadow: 1.9px 1.9px 6.2px #000000, 0px 0px 1.9px #0d0d0d;
  border: 0px solid #009c00;
  height: 12px;
  width: 12px;
  border-radius: 50px;
  background: #4caf50;
  cursor: pointer;
  height: 8px;
}
input[type=range].slider:focus::-ms-fill-lower {
  background: #7fcd00;
}
input[type=range].slider:focus::-ms-fill-upper {
  background: #82d200;
}

</style>
