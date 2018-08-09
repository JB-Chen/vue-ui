<template>
  <div id="app">
    <div class="head">XCurrency组件库</div>

    <router-link to="/xcSlide">滑动组件</router-link>
    <router-link to="/xcCaculator">计算器组件</router-link>

    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:.426667rem;
   
}
</style>
<style lang="scss" scoped>
.head{
  width: 100%;
  height: 1.3333rem;
  text-align: center;
  color: #2c3e50;
  // color: #fff;
  // background: #303133;
  margin-bottom: 1.75rem;
  line-height: 1.3333rem;
}

</style>

