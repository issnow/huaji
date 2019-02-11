<template>
  <div class="recommend" ref="recommend">
    <scroll ref='scroll' class="recommend-content" :data='discList'>
      <div>
        <!-- 当recommends有值的时候才渲染slider组件 -->
        <div v-if='recommends.length' class="slider-wrapper">
          <slider>
            <div class="swiper-slide" v-for='(item,index) in recommends' :key='index'>
              <a :href="item.linkUrl">
                <img @load='loadImage' :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item,index) in discList" :key='index' @click='selectItem(item)'>
              <div class="icon">
                <img width='60' height='60' v-lazy="item.pic" alt="">
              </div>
              <div class="text">
                <p class="desc">{{item.name}}</p>
                <h2 class="name">{{item.creator}}</h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getRecommend,getDiscList } from 'api/recommend';
  import { ERR_OK } from 'api/config';
  import { mapMutations } from 'vuex';
  import * as types from 'store/mutation-types';
  // slider 轮播组件
  import Slider from 'components/slider/slider';
  // scroll 滚动组件
  import Scroll from 'components/scroll/scroll';
  // loading
  import Loading from 'components/loading/loading';
  import { playlistMixin } from 'common/js/mixin';
  export default {
    mixins: [playlistMixin],
    data() {
      return {
        // 轮播图数据
        recommends: [],
        // 热门歌单数据
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      // mixin
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      // 点击歌单
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.id}`
        })
        this[types.SET_DISC](item)
      },
      // 获取轮播图
      async _getRecommend() {
        let res = await getRecommend()
        if(res.code === ERR_OK) {
          // console.log(res.data.slider)
          // recommend [{…}, {…}, {…}, {…}, {…}]
          this.recommends = res.data.slider
        }
      },
      // 获取歌单
      async _getDiscList() {
        let res = await getDiscList()
        if(res.code === 200) {
          // discList [{…}, {…}, {…}, {…}, {…}]
          // item: {
          //     "id": "3527223053",
          //     "name": "这锅“狗粮”你干了！我随意～",
          //     "creator": "环球音乐国际部",
          //     "createTime": "2019-01-28",
          //     "pic": "http://p.qpic.cn/music_cover/MUKZmQKcCRia0Ly3AKNpxBezFaJ4icyQrfGje0XIYN7ia3t4fEM050GWQ/600?n=1",
          //     "playCount": "119621"
          // }
          this.discList = res.data
          // console.log(this.discList)
        }
      },
      // 当图片加载完成时,重新执行scroll组件的refresh方法
      loadImage() {
        // 避免多张图片执行loadImage方法,确保这个逻辑只执行一次
        if(!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      ...mapMutations([types.SET_DISC])
    },
    components: {
      Slider,Scroll,Loading
    }
  }
</script>

<style scoped lang='stylus'>
  @import '~common/stylus/variable';
  .recommend
    position fixed
    top 88px
    bottom 0
    width 100%
    .recommend-content
      overflow hidden
      height 100%
      .slider-wrapper
        overflow hidden
      .recommend-list
        h1
          text-align center
          height 65px
          line-height 65px
          color $color-theme
          font-size $font-size-medium-x
        li
          display flex
          box-sizing border-box
          padding 0 20px 20px
          .icon
            width 60px
            padding-right 20px
          .text
            display flex
            flex 1
            flex-flow column
            justify-content space-around
            overflow hidden
            font-size $font-size-medium
            .name
              color $color-text-d
            .desc
              color $color-text
      .loading-container      
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>