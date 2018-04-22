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
                            <i class="material-icons controls-icon" @click="previousSong">skip_previous</i>
                            <span class="play-button" @click="playOrPause" >
                                <i class="material-icons play-icon">
                                    {{!playing?'play_arrow':'pause'}}
                                </i>
                                
                            </span>
                            <i class="material-icons controls-icon" @click="nextSong">skip_next</i>
                            <span>
                                <i :class="applyRepeatClasses()" @click="repeatToggler">
                                    {{repeatCode==2?'repeat_one':'repeat'}}
                                </i>
                                <!-- <i class="material-icons">repeat_one</i> -->
                            </span>
                        </div>
                        <div>
                            <input type="range" min="1" max="100" :value="songPlayedPercentage" id="slider" class="slider" @change="seekToDuration($event)">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="small-2 columns" style="margin-top:16px;">
                <div class="row">
                    <div class="small-3 columns">
                        <i class="material-icons volume-custom-class">volume_up</i>
                    </div>
                    <div class="small-5 columns">
                        <Slider :percentage="soundSliderPercentage" @SLIDER_CLICKED="handleSoundChangeEvent" />  
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import siteConfig from '@/utils/urlConfig.js'
import Slider from '@/components/shared/Slider'
import {mapGetters,mapActions} from 'vuex'

export default {
  components:{Slider},
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
          currentPlayingSongThumb:undefined,
          currentPlayingTrackIndex:undefined,
          //
          repeatCode:0,
          // 
          songQueue:undefined,

          soundSliderPercentage:100
      }
  },
    computed: {
    ...mapGetters('playlist', [
      'getPlaylist','getCurrentSong'
    ])
  },
  methods:{
      ...mapActions('playlist', [
        'LOAD_CURRENT_SONG'
        ]),
        handleSoundChangeEvent(e){
            this.soundSliderPercentage = e
            this.adjustVolume()
        },
      adjustVolume(){
          this.audioObject.volume = this.soundSliderPercentage/100
      },
      nextSong(){
          if(this.currentPlayingTrackIndex<this.songQueue.length-1){
                    this.currentPlayingTrackIndex++;

                    this.songPlayedPercentage = 0
                    this.audioObject.currentTime = 0

                    this.LOAD_CURRENT_SONG(this.songQueue[this.currentPlayingTrackIndex].path)

                    var url=siteConfig.siteURL +"/"+this.songQueue[this.currentPlayingTrackIndex].path

                    this.audioObject.src = url
                    this.audioObject.play()
                    this.intervalID = setInterval(this.tickUpdater,800)
              }
      },
      previousSong(){
          if(this.currentPlayingTrackIndex>0){
                    this.currentPlayingTrackIndex--;

                    this.songPlayedPercentage = 0
                    this.audioObject.currentTime = 0

                    this.LOAD_CURRENT_SONG(this.songQueue[this.currentPlayingTrackIndex].path)

                    var url=siteConfig.siteURL +"/"+this.songQueue[this.currentPlayingTrackIndex].path

                    this.audioObject.src = url
                    this.audioObject.play()
                    this.intervalID = setInterval(this.tickUpdater,800)
                    return
              }
      },
      repeatToggler(){
          // 0 means false
          // 1 means repeat tracks
          // 2 means repeat single track
          if(this.repeatCode==0){
              this.repeatCode =1
              return
          }
          else if(this.repeatCode==1){
              this.repeatCode=2
              return
          }
          else if(this.repeatCode==2){
              this.repeatCode =0
              return
          }
      },
      applyRepeatClasses(){
          var classes = ['material-icons', 'controls-icon']
          if(this.repeatCode!==0){
              classes.push('repeat-on')
          }
          return classes.join(' ')
      },
      playSongByPath(path,artistObject,songName){
        this.currentPlayingSongArtist = artistObject
        this.currentPlayingSongName = songName
   
        var url=siteConfig.siteURL

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

          if(this.repeatCode==2){
              this.currentTime = 0
              
              this.songPlayedPercentage = 0
              this.audioObject.currentTime = 0
              this.audioObject.play()
              this.intervalID = setInterval(this.tickUpdater,800)
              return
          }
          if(this.repeatCode==0){

              
             this.nextSong()
              

          }
          if(this.repeatCode==1){
              if(this.currentPlayingTrackIndex<this.songQueue.length-1){
                    this.currentPlayingTrackIndex++;
                   
              }
              else if(this.currentPlayingTrackIndex==this.songQueue.length-1){
                  this.currentPlayingTrackIndex =0

              }

            this.songPlayedPercentage = 0
            this.audioObject.currentTime = 0

            var url=siteConfig.siteURL +"/"+this.songQueue[this.currentPlayingTrackIndex].path
            this.LOAD_CURRENT_SONG(this.songQueue[this.currentPlayingTrackIndex].path)
            this.audioObject.src = url
            this.audioObject.play()
            this.intervalID = setInterval(this.tickUpdater,800)
            return
          }
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
      },
      setCurrentPlayList(playlist,currentTrackIndex){
          this.currentPlayingTrackIndex = currentTrackIndex
          this.songQueue = playlist
      }
  },
  mounted(){
    
    this.songQueue = this.getPlaylist
    if(this.audioObject == undefined){
        //
        //asdas
        this.audioObject =  new Audio();
        this.audioObject.src = this.currentPlayingTrack
        this.audioObject.onended = this.endSong

        this.adjustVolume()
    }
    
  }
}
</script>


<style>
    .volume-custom-class{
    position: relative;
    top: -10px;
    text-align: right;
    width: 100%;
    padding-right: 10px;
    color:white;
    }
    .repeat-on{
        color:#8de88d !important;
    }
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
        z-index:1000;
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
