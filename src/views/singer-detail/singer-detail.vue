<template>
  <transition name='slide'>
    <!-- bgImage 需要写成bg-image,不写好像也可以 -->
    <music-list :songs='songs' :title='title' :bgImage='bgImage'></music-list>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getSingerDetail } from 'api/singer';
  import { ERR_OK } from 'api/config';
  import { createSong } from 'common/js/song';
  import MusicList from 'components/music-list/music-list';
  export default {
    data() {
      return {
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
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.pic
      },
      // singer: {
      //   "id":"0025NhlN2yWrP4",
      //   "name":"周杰伦",
      //   "pic":"https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000"
      // }
      ...mapGetters(['singer'])
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      // 调用api获取歌手详情
      async _getSingerDetail() {
        if(!this.singer.id) {
          this.$router.push('/singer')
          return 
        }
        let res = await getSingerDetail(this.singer.id)
        if(res.code === ERR_OK) {
          // console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
          // console.log(this.songs)
        }
      },
      _normalizeSongs(list) {
        let ret = []
        list.map((item, index)=>{
          let {musicData} = item
          if(musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
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
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>