<template>
  <scroll @scrollToEnd='searchMore' class='suggest' :data='result' :pullup='pullup'>

    <ul class="suggest-list">
      <!-- 搜索列表 -->
      <li @click='selectItem(e)' class="suggest-item" v-for="(e,i) in result" :key='i'>
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(e)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>

    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title='抱歉，暂无搜索结果'></no-result>
    </div>
  </scroll>
</template>

<script>
  import { search } from 'api/search';
  import { ERR_OK } from 'api/config';
  import Scroll from 'components/scroll/scroll';
  import loading from 'components/loading/loading';
  import { mapActions } from 'vuex';
  import { createDiscSong } from 'common/js/song';
  import NoResult from 'components/no-result/no-result';
  const TYPE_SINGER = 'singer'
  // 每页搜索多少条数据
  const limit = 20
  export default {
    props: {
      // 搜说词
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        // 第几页
        page: 1,
        // 搜索的数据
        result: [],
        // 上拉刷新
        pullup: true,
        // 是否有更多
        hasMore: true
      }
    },
    methods: {
      // selectItem 点击列表
      selectItem(item) {
        this.insertSong(item)
        // 历史保存,派发一个事件
        this.$emit('select')
      },
      async search() {
        this.hasMore = true
        this.page = 1
        let res = await search(this.query, this.page, limit)
        if(res.code === 200) {
          this.result = this._normalizeSongs(res.data)
          // console.log(this.result)
          this._checkMore(res.data)
        }
      },
      getDisplayName(e) {
        return `${e.name}-${e.singer}`
      },
      async searchMore() {
        if(!this.hasMore) return
        this.page++
        let res = await search(this.query,this.page,limit)
        if(res.code === 200) {
          this.result = [...this.result, ...this._normalizeSongs(res.data)]
          // console.log(this.result)
          this._checkMore(res.data)
        }
      },
      _checkMore(data) {
        if(data.length < limit) {
          this.hasMore = false
        }
      },
      // 请求的结果序列化
      _normalizeSongs(list) {
        let ret = []
        list.map(e=>{
          ret.push(createDiscSong(e))
        })
        return ret
      },
      ...mapActions(['insertSong'])
    },
    watch: {
      // 搜索变化执行search方法
      query(newValue, oldValue) {
        if(!newValue) return
        this.search()
      }
    },
    components: {
      Scroll,loading,NoResult
    }
  }
</script>

<style scoped lang='stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>