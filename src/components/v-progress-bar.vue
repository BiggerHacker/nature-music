<template>
  <div class="progress-bar-wrap" @click="skipPlay">
    <div class="progress-bar" ref="progressBar">
      <div class="progress-inner" ref="progressInner"></div>
      <div 
        class="progress-btn" 
        ref="progressBtn" 
        v-if="!isNull" 
        @mousedown="progressBtnDown"
      >
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { prefix } from '@/util/dom'
  export default {
    name: 'progress-bar',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapGetters([
        'isNull'
      ])
    },
    created () {
      this.move = {}
    },
    methods: {
      progressBtnDown (e) {
        this.move.init = true
        this.move.pageX = e.pageX
        this.move.innerWidth = this.$refs.progressInner.clientWidth
        document.addEventListener('mousemove', this.progressMove)
        document.addEventListener('mouseup', this.progressUp)
      },
      progressMove (e) {
        if (!this.move.init) {
          return
        }
        e.preventDefault()
        let progressWidth = this.$refs.progressBar.clientWidth
        let deltaX = e.pageX - this.move.pageX
        let offsetX = Math.min(progressWidth, Math.max(0, this.move.innerWidth + deltaX))
        if (!this.isNull) {
          this._calcOffset(offsetX)
        }
      },
      progressUp () {
        this.move.init = false
        this._upPlay()
        document.removeEventListener('mousemove', this.progressMove)
        document.removeEventListener('mouseup', this.progressUp)
      },
      skipPlay (e) {
        if (!this.isNull) {
          let rect = this.$refs.progressBar.getBoundingClientRect()
          let offsetWidth = e.pageX - rect.left
          this._calcOffset(offsetWidth)
          this._upPlay()
        }
      },
      _upPlay () {
        let progressWidth = this.$refs.progressBar.clientWidth
        let percent = this.$refs.progressInner.clientWidth / progressWidth
        this.$emit('upPlay', percent)
      },
      _calcOffset (offset) {
        this.$refs.progressInner.style.width = `${offset}px`
        prefix(this.$refs.progressBtn, `translateX(${offset}px)`)
      }
    },
    watch: {
      percent (newPercent) {
        if (newPercent >= 0 && !this.move.init) {
          let progressWidth = this.$refs.progressBar.clientWidth
          let offsetWidth = newPercent * progressWidth
          if (!this.isNull) {
            this._calcOffset(offsetWidth)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .progress-bar-wrap {
    padding: $module-padding 0;
    width: 100%;
    &:hover {
      .progress-btn {
        display: block;
      }
    }
  }
  .progress-bar {
    position: relative;
    width: 100%;
    height: 2px;
    background-color: $border-color;
  }
  .progress-inner {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: $select-bg-color;
  }
  .progress-btn {
    display: none;
    position: absolute;
    left: -3px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $select-bg-color;
  }
</style>
