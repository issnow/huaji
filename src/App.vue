<template>
  <div id="app">
    <!-- 头部 -->
    <m-header></m-header>

    <!-- 导航 -->
    <tab></tab>

    <!-- keep-alive缓存,不用走created等生命周期 -->
    <keep-alive>
      <!-- 路由 -->
      <router-view></router-view>
    </keep-alive>

    <!-- 播放器 -->
    <player ></player>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header.vue';
  import Tab from 'components/tab/tab.vue';
  import Player from 'components/player/player.vue';
  export default {
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang='stylus'>
  // variable.styl的后缀名可省略
  // 组建内引入css样式使用 @import
  @import '~common/stylus/variable'
  #app
    color $color-theme
    touch-action none
</style>
