<template>
  <!-- 音乐详情组件,包含100个歌手的歌曲 -->
  <div class='music-list'>

    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>

    <h1 class="title" v-html='title'></h1>

    <div class="bg-image" :style='bgStyle' ref='img'>

      <div class="play-wrapper">
        <div @click='_randomPlay' class="play" v-show="songs.length>0" ref='playBtn'>
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>

      <div class="filter"></div>
    </div>

    <!-- layer层,控制滚动 -->
    <div ref='layer' class="bg-layer"></div>

    <!-- 滚动区域 -->
    <scroll @scroll='scroll' :probeType='probeType' :listenScroll='listenScroll' :data='songs' class="list" ref='list'> 
      <div class="song-list-wrapper">
        <!-- 歌曲列表 -->
        <song-list :rank='rank' @select='selectItem' :songs='songs'></song-list>
      </div>

      <!-- loading -->
      <div class="loading-container" v-show='!songs.length'>
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import SongList from 'components/song-list/song-list';
  import Scroll from 'components/scroll/scroll';
  import Loading from 'components/loading/loading';
  import { mapActions} from 'vuex';
  import { playlistMixin } from 'common/js/mixin';
  const RESERVED_HEIGHT = 40
  export default {
    mixins: [playlistMixin],
    props: {
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
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
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.imageHeight = this.$refs.img.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = this.imageHeight + 'px'
    },
    methods: {
      // mixin里面的方法
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px': ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      // 随机播放全部
      _randomPlay() {
        this.randomPlay({
          list: this.songs
        })
      },
      back() {
        this.$router.go(-1)
      },
      // 处理scroll组件的scroll事件,子传父自定义事件
      scroll(pos) {
        this.scrollY = pos.y
      },

      // 处理子组件song-list emit的事件,选择歌曲播放
      selectItem(song, index) {
        // 业务逻辑 : 
        // 1.设置所有的vuex中的state,
        // 2.等于需要提交多个mutation
        // 3.派发一个actions提交多个mutation
        this.selectPlay({list:this.songs, index})
      },

      ...mapActions(['selectPlay', 'randomPlay']),
    },
    components: {
      SongList,Scroll,Loading
    },
    watch: {
      // 监听纵向滚动的距离
      scrollY(newY) {
        let translateY = Math.max(newY, this.minTranslateY)
        let zIndex = 0
        let scale = 1
        this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`
        const percent = Math.abs(newY / this.imageHeight)
        // newY为正值,往下滚动
        if(newY > 0) {
          scale = 1 + percent
          zIndex = 10
        }
        // 当滚动到最上面
        if(newY<this.minTranslateY) {
          zIndex = 10
          this.$refs.img.style.paddingTop = 0
          this.$refs.img.style.height = RESERVED_HEIGHT + 'px'
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.img.style.paddingTop = '70%'
          this.$refs.img.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.img.style.zIndex = zIndex
        this.$refs.img.style.transform = `scale(${scale})`
      }
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
      // overflow hidden
      .song-list-wrapper
        padding 20px 30px
      .loading-container
        position absolute
        top 50%
        transform translateY(-50%)  
        width 100%
    
</style>