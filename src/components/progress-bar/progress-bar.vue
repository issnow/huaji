<template>
  <!-- 进度条组件 -->
  <div class='progress-bar' ref='progressBar' @click='ProgressClick'>
    <div class="bar-inner">
      <div class="progress" ref='progress'></div>
      <div class="progress-btn-wrapper" ref='progressBtn'
           @touchstart.prevent='progressBtnTouchStart'
           @touchmove.prevent='progressBtnTouchMove'
           @touchend.prevent='progressBtnTouchEnd'
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  const btnWidth = 16
  export default {
    props: {
      // 进度的百分比
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      ProgressClick(e) {
        // 此时是点击事件,无法使用e.touches[0],e.touches是touch相关事件里面的
        const offsetLeft = e.pageX - this.$refs.progressBar.getBoundingClientRect().left
        this._offset(offsetLeft)
        this._triggerPercent()
      },
      progressBtnTouchStart(e) {
        this.touch.init = true
        this.touch.startX = e.touches[0].pageX
        this.touch.startWidth = this.$refs.progress.clientWidth
      },
      progressBtnTouchMove(e) {
        if(!this.touch.init) return
        let deltaX = e.touches[0].pageX - this.touch.startX
        let offsetLeft = Math.min(this.$refs.progressBar.clientWidth - btnWidth,Math.max(0,this.touch.startWidth + deltaX))
        this._offset(offsetLeft)
      },
      progressBtnTouchEnd() {
        this.touch.init = false
        this._triggerPercent()
      },
      _triggerPercent() {
        const percent = this.$refs.progress.clientWidth / (this.$refs.progressBar.clientWidth - btnWidth)
        this.$emit('percentChange',percent)
      },
      _offset(offsetLeft) {
        this.$refs.progress.style.width = `${offsetLeft}px`
        this.$refs.progressBtn.style.transform = `translate3d(${offsetLeft}px,0,0)`
      }
    },
    watch: {
      // 进度的百分比
      percent(newV) {
        if(newV >= 0 && !this.touch.init) {
          const width = this.$refs.progressBar.clientWidth - btnWidth
          let offsetLeft = newV * width
          this._offset(offsetLeft)
        }
      }
    }
  }
</script>

<style scoped lang='stylus'>
  @import '~common/stylus/variable';
  .progress-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background-color rgba(0,0,0,.3)
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left -8px
        top -13px
        width 30px
        height 30px
        .progress-btn
          position absolute
          top 7px
          left 7px
          box-sizing border-box
          width 16px
          height 16px
          border 3px solid $color-text
          border-radius 50%
          background-color $color-theme
</style>