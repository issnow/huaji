<template>
  <div class='song-list'>
    <ul>
      <li class="item" v-for="(item,i) in songs" :key='i'>
        <div class="content">
          <div class="name">{{item.name}}</div>
          <div class="desc">{{getDesc(item)}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
    },
    methods: {
      getDesc(item) {
        return `${item.singer} - ${item.album}`
      }
    },
  }
</script>

<style scoped lang='stylus'>
  @import '~common/stylus/variable';
  @import '~common/stylus/mixin';
  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      .content
        flex  1
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color $color-text
        .desc
          no-wrap()
          margin-top 4px
          color $color-text-d
</style>