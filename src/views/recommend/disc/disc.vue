<template>
  <transition name='slide'>
    <music-list :title='title' :bgImage='bgImage' :songs='songs'></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list';
  import { mapGetters } from 'vuex';
  import { getDiscSongs } from 'api/recommend';
  import { createDiscSong } from 'common/js/song';
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.name
      },
      bgImage() {
        return this.disc.pic
      },
      // discList [{…}, {…}, {…}, {…}, {…}]
      // item: {
      //     "id": "3527223053",
      //     "name": "这锅“狗粮”你干了！我随意～",
      //     "creator": "环球音乐国际部",
      //     "createTime": "2019-01-28",
      //     "pic": "http://p.qpic.cn/music_cover/MUKZmQKcCRia0Ly3AKNpxBezFaJ4icyQrfGje0XIYN7ia3t4fEM050GWQ/600?n=1",
      //     "playCount": "119621"
      // }
      ...mapGetters(['disc'])
    },
    created() {
      this._getDiscSongs()
    },
    methods: {
      async _getDiscSongs() {
        if(!this.disc.id) {
          this.$router.push('/recommend')
          return 
        }
        let res = await getDiscSongs(this.disc.id)
        // console.log(res.data.songs)
        this.songs = this._normalizeSongs(res.data.songs)
        // console.log(this.songs)
      },
      _normalizeSongs(list) {
        let ret = []
        list.map(e=>{
          ret.push(createDiscSong(e))
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang='stylus'>
   .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>