<template>
  <!-- 歌手详情 -->
  <div class='music-list'>

    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <div class="title">{{name}}</div>

    <div class="bg-image" :style='bgStyle' ref='img'>
      <div class="play-wrapper" v-show='songs.length'>
        <div class="play" ref='play'>
          <i class="icon-play"></i>
          <div class="text">随机播放全部</div>
        </div>
      </div>
      <div class="filter"></div>
    </div>

    <!-- 控制滚动 -->
    <div class="bg-layer" ref='layer'></div>
    <!-- SongList -->
    <scroll @scroll='scroll' class="list" ref='list' :data='songs' :probeType='3' :listenScroll='true'>
      <div class="song-list-wrapper">
        <song-list :songs='songs'></song-list>
      </div>
      <div class="loading-container" v-show='!songs.length'>
        <loading></loading>
      </div>
    </scroll> 
  </div>
</template>

<script>
  import SongList from './_song-list.vue';
  import Scroll from 'components/scroll/scroll';
  import Loading from 'components/loading/loading';
  const PRE_HEIGHT = 40
  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      bgImage: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted() {
      const height = this.$refs.img.clientHeight
      this.maxHeight = height - PRE_HEIGHT
      this.$refs.list.$el.style.top = height + 'px'
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      scroll(pos) {
        this.scrollY = pos.y
      }
    },
    watch: {
      scrollY(newY) {
        const height = this.$refs.img.clientHeight
        const distance = Math.max(newY, -this.maxHeight)
        let zIndex = 0
        let scale = 1
        let percent = Math.abs(newY / height) 
        this.$refs.layer.style.transform = `translate3d(0,${distance}px,0)`
        if(newY > 0) {
          scale = 1 + percent
          zIndex = 10
        }


        if(newY < -this.maxHeight) {
          zIndex = 10
          this.$refs.img.style.height = PRE_HEIGHT + 'px'
          this.$refs.img.style.paddingTop = 0
          this.$refs.play.style.display = 'none'
        }else {
          this.$refs.img.style.height = 0
          this.$refs.img.style.paddingTop = '70%'
          this.$refs.play.style.display = ''
        }
        this.$refs.img.style.zIndex = zIndex
        this.$refs.img.style.transform = `scale(${scale})`


        
      }
    },
    components: {
      SongList,Scroll,Loading
    }
  }
</script>

<style scoped lang='stylus'>
  @import '~common/stylus/variable';
  @import '~common/stylus/mixin';
  .music-list
    position fixed
    z-index 100
    top 0
    bottom 0
    width 100%
    background-color $color-background
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large
        color $color-theme
    .title
      position absolute
      top 0
      left 10%
      z-index 40
      width 80%
      no-wrap()
      text-align center
      color $color-text
      font-size $font-size-large
      line-height 40px
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
      .play-wrapper
        position absolute
        bottom 20px
        z-index 50
        width 100%
        .play
          box-sizing border-box
          width 135px
          padding 7px 0px
          margin 0 auto
          text-align center
          border-radius 100px
          border 1px solid $color-theme
          font-size 0
          color $color-theme
          .icon-play
            display inline-block
            margin-right 6px
            font-size $font-size-medium-x
            vertical-align middle
          .text
            display inline-block
            vertical-align middle
            font-size $font-size-medium
      .filter
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(7,17,27,.4)
    .bg-layer
      position relative
      height 100%
      background-color $color-background
    .list
      position fixed
      top 0
      bottom 0
      width 100%
      background $color-background
      .song-list-wrapper
        padding 20px 30px
      .loading-container
        position absolute
        top 50%
        transform translateY(-50%)  
        width 100%
</style>