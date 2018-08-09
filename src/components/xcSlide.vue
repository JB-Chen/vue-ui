<template>
  <div class="xc-slide">
      <!-- 我是滑动组件 -->
      <ul :data-type="type" :style="moveStyle">
        <li @touchstart.capture="touchStart($event)" @touchmove.capture="touchMove($event)" @touchend.capture="touchEnd($event)">
        </li>
        <div class="top">置顶</div>
        <div class="user">使用此汇率源</div>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      startX:0,
      moveX:0,
      endX:0,
      moveStyle:"",
      type:0
    }
  },
  methods:{
    touchStart(e){
      this.startX = e.changedTouches[0].clientX;
    },
    touchMove(e){
      // console.log(this.endX - this.startX)
      this.moveX = e.changedTouches[0].clientX;
      let moveLenght  = this.moveX - this.startX;
      // console.log(moveLenght)
      if(moveLenght<0 && moveLenght > -200 ){
        this.moveStyle = 'transform:translate3d('+moveLenght+'px,0,0);'
      }else if(moveLenght>0 && moveLenght<200){
        this.moveStyle = 'transform:translate3d('+moveLenght+'px,0,0);'
      }
      
    },
    touchEnd(e){
      this.endX  = e.changedTouches[0].clientX;
      if((this.moveX - this.startX)>-100){
        this.moveStyle = 'transform:translate3d(0,0,0);'
      }
      else if((this.moveX - this.startX)<-100){
          this.moveStyle = 'transform:translate3d(-200px,0,0);'
      }
    
    }
  }
}
</script>

<style lang="scss" scoped>
.xc-slide{
  width: 10rem;
  overflow: hidden;
  ul{
    margin-top:.5333rem;
    width:15.334rem;
    height:1.946667rem;
    display: flex;
    -webkit-transition:all 0.2s;
    transition:all 0.2s;
    li{
      width:10rem;
      height:1.946667rem;
      background-color: blue;
      list-style-type: none;
    }
    .top,.user{
      text-align: center;
      line-height: 1.9467rem;
    }
    .top{
      width: 1.8667rem;
      height: 1.946667rem;
      background: #d3dce6;
    }
    .user{
      width: 3.4667rem;
      height: 1.9467rem;
      background: #99a9bf;
    }
  }
}
ul[data-type="0"]{
  transform:translate3d(0,0,0);
}
</style>

