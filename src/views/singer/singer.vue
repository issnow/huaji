<template>
  <div class="singer" ref='singer'>
    <listview ref="listview" @select='selectSinger' :data='singers'></listview>
    <!-- 当有子路由的时候,需要在父级加上router-view -->
    <router-view></router-view>
  </div>
</template>

<script>
  import { getSingerList } from 'api/singer';
  import { ERR_OK } from 'api/config';
  import Singer from 'common/js/singer';
  import Listview from 'components/listview/listview';
  import { mapMutations } from 'vuex';
  import * as types from 'store/mutation-types';
  import { playlistMixin } from 'common/js/mixin';
  const HOT_NAME = "热门",
        HOT_SIGNER_LEN = 10
  export default {
    mixins: [playlistMixin],
    data() {
      return {
        // [{…}, {…}, {…}, {…}, {…}, {…}]
        // {items: (3) [Singer, Singer, Singer],title: "A"}
        // singer: {id: "xxx",name: "xxx",pic: "xxx"}
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      // mixin里面的方法
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px': ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.listview.refresh()
      },
      // 调用getsingerlist接口
      async _getSingerList() {
        let res = await getSingerList()
        if(res.code === ERR_OK) {
          // (100) [{…}, {…}, {…}, {…}, {…}, {…}]
          /* item: {
            Farea: "0",
            Fattribute_3: "2",
            Fattribute_4: "0",
            Fgenre: "0",
            Findex: "Z",
            Fother_name: "Jay Chou",
            Fsinger_id: "4558",
            Fsinger_mid: "0025NhlN2yWrP4",
            Fsinger_name: "周杰伦",
            Fsinger_tag: "541,555",
            Fsort: "2",
            Ftrend: "0",
            Ftype: "0",
            voc: "0",
          }, */
          // console.log(res.data.list)
          // console.log(this._normalizeSinger(res.data.list))
          this.singers = this._normalizeSinger(res.data.list)
          // console.log(this.singers)
        }
      },
      // 将res.data.list包装成需要的数据结构
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.map((e,i)=>{
          if(i < HOT_SIGNER_LEN) {
            map.hot.items.push(new Singer({
              id: e.Fsinger_mid,
              name: e.Fsinger_name,
            }))
          }
          const key = e.Findex
          if(!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: e.Fsinger_mid,
            name: e.Fsinger_name,
          }))
        })
        // map {9: {…}, hot: {…}, X: {…}, Z: {…}, B: {…}, C: {…}, …}
        // {items: (3) [Singer, Singer, Singer],title: "A"}
        // console.log(map)

        // 为了得到有序列表,需要处理map
        let hot = []
        let ret = []
        for(let key in map) {
          let val = map[key]
          if(/[a-zA-Z]/.test(val.title)) {
            ret.push(val)
          }else if(val.title===HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a,b)=>a.title.charCodeAt()-b.title.charCodeAt())
        return [...hot,...ret]
      },
      // 接受listview子组件传递的数据
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this[types.SET_SINGER](singer)
      },
      ...mapMutations([types.SET_SINGER])
    },
    components: {
      Listview
    }
  }
</script>

<style scoped lang='stylus'>
  @import '~common/stylus/variable';
  .singer
    position fixed
    top 88px
    width 100%
    bottom 0
</style>