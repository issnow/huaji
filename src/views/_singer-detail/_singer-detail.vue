<template>
  <transition>
    <music-list :songs='songs' :name='name' :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex';
  import { getSingerDetail } from 'api/singer.js';
  import { ERR_OK } from 'api/config';
  import { createSong } from 'common/js/song';
  import MusicList from './_music-list.vue';
  export default {
    computed: {
      name() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.pic
      },
      ...mapGetters(['singer'])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      async _getSingerDetail() {
        if(!this.singer.id) {
          this.$router.push('/singer')
        }
        let res = await getSingerDetail(this.singer.id)
        if(res.code === ERR_OK) {
          // console.log(res.data.list)
          this.songs = this._normalizeData(res.data.list)
          // console.log(this.songs)
        }
      },
      _normalizeData(list) {
        let ret = []
        list.map(e=>{
          let {musicData} = e
          let song = createSong(musicData)
          ret.push(song)
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
  .v-enter-active,.v-leave-active
    transition all 0.3s
  .v-enter,.v-leave-to
    transform translate3d(100%,0,0)
</style>