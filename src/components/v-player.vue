<template>
  <div class="player">
    <div class="mini-player clearfix">
      <div class="play-config pull-left clearfix">
        <div class="pull-left prev-song">
          <i class="iconfont icon-prev-song"></i>
        </div>
        <div class="pull-left play-song">
          <i class="iconfont icon-player"></i>
        </div>
        <div class="pull-left next-song">
          <i class="iconfont icon-next-song"></i>
        </div>
      </div>
      <div class="play-intro clearfix">
        <div class="pull-left thrum" :style="{'background-image': thrumUrl}" @click="fullScreenUp"></div>
      </div>
    </div>
    <div class="spread-player" :class="{'spread-player-up': fullScreen}" :style="{height: spreadHeight}">
      <div class="back" @click="fullScreenDown">
        <i class="iconfont icon-prev"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import defaultThrum from './../assets/images/player_cover.png'
  export default {
    name: 'player',
    data () {
      return {
        spreadHeight: 0,
        thrumUrl: ''
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'sequenceList',
        'currentSong'
      ])
    },
    created () {
      this.thrumUrl = `url(${defaultThrum})`
      this.spreadHeight = document.body.clientHeight + 'px'
      window.addEventListener('resize', () => {
        this.spreadHeight = document.body.clientHeight + 'px'
      })
    },
    methods: {
      fullScreenUp () {
        this.sequenceList.length > 0 ? this.SET_FULL_SCREEN_STATE(true) : ''
      },
      fullScreenDown () {
        this.sequenceList.length > 0 ? this.SET_FULL_SCREEN_STATE(false) : ''
      },
      ...mapMutations([
        'SET_FULL_SCREEN_STATE'
      ])
    },
    watch: {
      currentSong (song) {
        this.thrumUrl = `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000)`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .player {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
  }
  .mini-player {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: $white;
    .play-config {
      padding: $module-padding;
      width: $menu-width;
      height: 100%;
      background-color: $menu-tint-color;
    }
    .prev-song,
    .next-song,
    .play-song {
      margin-top: 4px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border: 1px solid $select-bg-color;
      border-radius: 50%;
      cursor: pointer;
      color: $select-bg-color;
      .iconfont {
        position: relative;
        top: -2px;
        font-size: 12px;
      }
    }
    .play-song {
      margin: 4px $module-margin 0;
      transform: scale(1.2);
    }
    .play-intro {
      padding-left: $menu-width + $module-padding;
      padding-right: $module-padding;
      padding-top: 10px;
      padding-bottom: 10px;
      height: 100%;
      border-top: 1px solid $border-color;
      .thrum {
        width: 36px;
        height: 100%;
        background-size: cover;
      }
    }
  }
  .spread-player {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 8;
    width: 1200px;
    margin: 0 auto;
    transition: all .3s ease-out;
    transform: translateY(100%);
    background-color: $black;
    color: $white;
    &.spread-player-up {
      transform: translateY(0);
    }
    .back {
      position: absolute;
      left: 0;
      top: 0;
      padding: $module-padding;
      transform: rotate(-90deg);
      cursor: pointer;
      color: $white;
      &:hover {
        color: $select-bg-color;
      }
    }
  }
</style>
