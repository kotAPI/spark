<template>
  <div class="controls-slider-container" @click="getClickedPercentage($event)" id="slider-controls-container">
    <div class="slider-progress-completed" :style="setPercentageStyle()">

    </div>
  </div>
</template>

<script>
export default {
  props:['percentage'],
  methods:{
    getClickedPercentage(e){
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var width = document.getElementById("slider-controls-container").offsetWidth

      this.$emit("SLIDER_CLICKED",Math.round(x/width*100))
    },
    setPercentageStyle(){
      return "width:"+this.percentage+"%;"
    }
  }
}
</script>


<style>
  .slider-progress-completed{
    height:2px;
    margin-top:1px;
    position: absolute;
    background-color: #a0d65d;
    transition:all 0.2s;
    transition-timing-function:ease-in;
  }
  .controls-slider-container{
    width:100%;
    height:5px;
    background-color:#424242;
    cursor: pointer;
    margin:auto;
    position: relative;

  }
</style>
