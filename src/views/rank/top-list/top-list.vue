<template>
  <transition name='slide'>
    <music-list :rank='rank' :songs='songs' :title='title' :bgImage='bgImage'></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list';
  import { mapGetters } from 'vuex';
  import { ERR_OK } from 'api/config';
  import { getMusicList } from 'api/rank';
  import { createSong } from 'common/js/song';
  export default {
    computed: {
      title() {
        return this.toplist.topTitle
      },
      bgImage() { 
        if(this.songs.length) {
          return this.songs[0].image
        }
        return ''
        // return this.toplist.picUrl
      },
      ...mapGetters(['toplist'])
    },
    created() {
      this._getMusicList()
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    methods: {
      async _getMusicList() {
        if(!this.toplist.id) {
          this.$router.push('/rank')
          return
        }
        let res = await getMusicList(this.toplist.id)
        if(res.code === ERR_OK) {
          // console.log(res)
          this.songs = this._normalizeList(res.songlist)
        }
      },
      _normalizeList(list) {
        let ret = []
        list.map(e=>{
          let {data} = e
          if(data.songid && data.albumid) {
            ret.push(createSong(data))
          }
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
  .slide-enter-active,.slide-leave-active
    transition .3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%,0,0)
</style>