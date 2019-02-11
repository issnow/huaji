<template>
  <!-- 基础组件,歌曲列表组件,主要用在歌手详情下面的歌曲 -->
  <div class='song-list'>
    <ul>
      <li @click='selectItem(item,i)' v-for="(item,i) in songs" :key='i' class="item">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(i)">{{getRankText(i)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      //(100) [Song, Song, Song, Song,...]
      // Song实例 :{
      //   album: "周杰伦的床边故事",
      //   duration: 215,
      //   id: 107192078,
      //   image: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000",
      //   mid: "003OUlho2HcRHC",
      //   name: "告白气球",
      //   singer: "周杰伦",
      //   url: "https://api.bzqll.com/music/tencent/url?key=579621905&id=003OUlho2HcRHC"
      // }
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getDesc(item) {
        return `${item.singer}.${item.album}`
      },
      // rank class名字
      getRankCls(i) {
        if(i <= 2) {
          return `icon icon${i}`
        }else {
          return 'text'
        }
      },
      // rank内容
      getRankText(i) {
        if(i > 2) {
          return i+1
        }
      },
      // 选择歌曲播放
      selectItem(song, index) {
        // 传给父组件
        this.$emit('select', song, index)
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
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
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