<template>
  <div>
    <!-- img标签可以设置width和heighit属性,div标签没有 -->
    <img src="./logo01.jpg" width='100' height='100' alt="">
    <div width='100' height='100' class="box"></div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang='stylus'>
  .box
    width 100px
    height: 100px
    display inline-block
    background-color violet
</style>