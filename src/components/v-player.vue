<template>
  <div class="player">
    <div class="mini-player clearfix" :class="{'mini-opacity': fullScreen}">
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
      <div class="background" :style="{'background-image': thrumUrl}"></div>
      <div class="back" @click="fullScreenDown">
        <i class="iconfont icon-prev"></i>
      </div>
      <div class="player-content">
        <div class="player-bd">
          <div class="player-mod">
            <div class="mod-thrum" :style="{'background-image': thrumUrl}"></div>
            <div class="name">{{ currentSong.songname }}</div>
            <div class="info">
              <span>歌手: {{ currentSong.singer[0].name }}</span>
              <span>专辑: {{ currentSong.albumname }}</span>
            </div>
          </div>
        </div>
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
  @import '~@/assets/scss/mixin';
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
    &.mini-opacity {
      background-color: rgba(0, 0, 0, 0);
      .play-config {
        background-color: rgba(0, 0, 0, 0);
      }
      .play-intro {
        border-top: 0;
      }
    }
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
      z-index: 50;
      padding: $module-padding;
      transform: rotate(-90deg);
      cursor: pointer;
      color: $white;
      &:hover {
        color: $select-bg-color;
      }
    }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(65px);
      opacity: .6;
    }
    .player-content {
      position: relative;
      z-index: 3;
      height: 100%;
      margin: 0 13%;
    }
    .player-bd {
      position: absolute;
      top: 18%;
      bottom: 18%;
      width: 100%;
      min-height: 408px;
    }
    .player-mod {
      margin-left: 374px;
      height: 100%;
      color: rgba(255, 255, 255, .4);
      .mod-thrum {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 260px;
        height: 260px;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .name {
        height: 24px;
        @include text-overflow;
        font-size: 24px;
        color: $white;
      }
      .info {
        margin-top: $module-margin;
        span {
          display: inline-block;
          margin-left: $module-margin*2;
          max-width: 40%;
          height: 20px;
          @include text-overflow;
          cursor: pointer;
          transition: all .18s ease-out;
          font-size: 20px;
          &:first-child {
            margin-left: 0;
          }
          &:hover {
            color: $white;
          }
        }
      }
    }
  }
</style>
