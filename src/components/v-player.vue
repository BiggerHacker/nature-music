<template>
  <div class="player">
    <div class="mini-player clearfix" :class="{'mini-opacity': fullScreen}">
      <div class="play-config pull-left clearfix">
        <div @click="prev" class="pull-left prev-song" :class="disableCls">
          <i class="iconfont icon-prev-song"></i>
        </div>
        <div @click="togglePlay" class="pull-left play-song" :class="disableCls">
          <i class="iconfont" :class="playIcon"></i>
        </div>
        <div @click="next" class="pull-left next-song" :class="disableCls">
          <i class="iconfont icon-next-song"></i>
        </div>
        <div class="pull-right play-mode" @click="changeMode">
          <i class="iconfont" :class="playMode"></i>
        </div>
      </div>
      <div class="play-intro clearfix">
        <div class="pull-left thrum" :style="{'background-image': 'url('+ thrumUrl +')'}" @click="fullScreenUp"></div>
        <div class="pull-left play-music">
          <div class="play-music-intro" v-if="!isNull">
            <span @click="fullScreenUp" class="song-name">
              {{ currentSong.songname }}
            </span>
            <router-link class="singer-name" to="/selected">--{{ currentSong.singer[0].name }}</router-link>
          </div>
          <div class="play-music-intro" v-else>聆听你的心动</div>
          <div class="play-music-time" v-if="!isNull">{{ filterTime(currentTime) }} / {{ filterTime(currentSong.interval) }}</div>
          <div class="play-music-time" v-else>00:00 / 00:00</div>
          <div class="progress-wrap">
            <v-progress-bar :percent="percent" @upPlay="onupplay"></v-progress-bar>
          </div>
        </div>
      </div>
    </div>
    <div 
      class="spread-player"
      v-if="!isNull"
      :class="{'spread-player-up': fullScreen}"
      :style="{height: spreadHeight}"
    >
      <div class="background" :class="background" :style="{'background-image': 'url('+ thrumUrl +')'}"></div>
      <div class="back" @click="fullScreenDown">
        <i class="iconfont icon-prev"></i>
      </div>
      <div class="player-content">
        <div class="player-bd">
          <div class="player-mod">
            <div class="mod-thrum" :style="{'background-image': 'url('+ thrumUrl +')'}"></div>
            <div class="name">{{ currentSong.songname }}</div>
            <div class="info">
              <span>歌手: {{ currentSong.singer[0].name }}</span>
              <span>专辑: {{ currentSong.albumname }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio 
      ref="audio" 
      :src="audioSrc" 
      @canplay="ready" 
      @error="error" 
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import { mode, ERR_OK } from '@/util/config'
  import { shuffle } from '@/util/util'
  import { getLyric } from '@/api/song'
  import defaultThrum from './../assets/images/player_cover.png'
  import VProgressBar from '@/components/v-progress-bar'
  export default {
    name: 'player',
    components: {
      VProgressBar
    },
    data () {
      return {
        spreadHeight: 0,
        thrumUrl: '',
        audioSrc: '',
        songReady: false,
        currentTime: 0
      }
    },
    computed: {
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-player'
      },
      disableCls () {
        return !this.songReady ? 'disable' : ''
      },
      background () {
        return this.fullScreen ? 'spread-bg' : ''
      },
      percent () {
        return this.currentTime / this.currentSong.interval
      },
      playMode () {
        return this.mode === mode.sequence ? 'icon-sequence' : this.mode === mode.loop ? 'icon-loop' : 'icon-random'
      },
      ...mapGetters([
        'isNull',
        'playing',
        'playList',
        'fullScreen',
        'currentIndex',
        'mode',
        'currentSong',
        'sequenceList'
      ])
    },
    created () {
      this.thrumUrl = defaultThrum
      this.spreadHeight = document.body.clientHeight + 'px'
      window.addEventListener('resize', () => {
        this.spreadHeight = document.body.clientHeight + 'px'
      })
    },
    methods: {
      fullScreenUp () {
        !this.isNull ? this.SET_FULL_SCREEN_STATE(true) : ''
      },
      fullScreenDown () {
        !this.isNull ? this.SET_FULL_SCREEN_STATE(false) : ''
      },
      togglePlay () {
        if (!this.isNull) {
          this.SET_PLAYING_STATE(!this.playing)
        }
      },
      end () {
        if (this.mode === mode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop () {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      },
      next () {
        if (!this.songReady) {
          return
        }
        if (this.mode === mode.loop) {
          this.loop()
          if (!this.playing) {
            this.togglePlay()
          }
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.SET_CURRENT_INDEX(index)
        if (!this.playing) {
          this.togglePlay()
        }
        this.songReady = false
      },
      prev () {
        if (!this.songReady) {
          return
        }
        if (this.mode === mode.loop) {
          this.loop()
          if (!this.playing) {
            this.togglePlay()
          }
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.SET_CURRENT_INDEX(index)
        if (!this.playing) {
          this.togglePlay()
        }
        this.songReady = false
      },
      ready () {
        this.songReady = true
      },
      error () {
        if (!this.isNull) {
          this.songReady = true
        }
      },
      timeupdate (e) {
        this.currentTime = e.target.currentTime
      },
      filterTime (time) {
        time = time | 0
        let minute = this._getzero(time / 60 | 0)
        let second = this._getzero(time % 60)
        return `${minute}:${second}`
      },
      onupplay (percent) {
        this.$refs.audio.currentTime = percent * this.currentSong.interval
        if (!this.playing) {
          this.togglePlay()
        }
      },
      changeMode () {
        if (this.isNull) {
          return
        }
        let playmode = (this.mode + 1) % 3
        this.SET_MODE(playmode)
        let list = []
        if (playmode === mode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this._setCurrentIndex(list)
        this.SET_PLAY_LIST(list)
      },
      _setCurrentIndex (list) {
        let index = list.findIndex((item) => {
          return item.songid === this.currentSong.songid
        })
        this.SET_CURRENT_INDEX(index)
      },
      _getzero (time) {
        if (parseInt(time) < 10) {
          time = `0${time}`
        }
        return time
      },
      ...mapMutations([
        'SET_ISNULL_STATE',
        'SET_FULL_SCREEN_STATE',
        'SET_PLAYING_STATE',
        'SET_CURRENT_INDEX',
        'SET_MODE',
        'SET_PLAY_LIST'
      ])
    },
    watch: {
      currentSong (newSong, oldSong) {
        this.thrumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${newSong.albummid}.jpg?max_age=2592000`
        this.audioSrc = `http://ws.stream.qqmusic.qq.com/${newSong.songid}.m4a?fromtag=46`
        this.$nextTick(() => {
          this.SET_ISNULL_STATE(false)
          if (newSong.songid === oldSong.songid) {
            return
          }
          this.$refs.audio.play()
          getLyric(newSong.songmid).then(res => {
            if (res.retcode === ERR_OK) {
              console.log(res.lyric)
            }
          })
        })
      },
      playing (newPlaying) {
        let audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
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
      .play-music-intro {
        color: $white;
        .singer-name {
          color: $gray-color;
          &:hover {
            color: $select-bg-color;
          }
        }
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
    .disable {
      border: 1px solid #ccc;
      color: #ccc;
    }
    .play-song {
      margin: 4px $module-margin 0;
      transform: scale(1.2);
    }
    .play-mode {
      margin-top: 6px;
      cursor: pointer;
      .iconfont {
        color: $black;
        font-size: 24px;
      }
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
    .play-music {
      position: relative;
      width: 50%;
      height: 100%;
      margin: 0 $module-margin;
    }
    .play-music-intro {
      padding-right: 85px;
      height: 14px;
      @include text-overflow;
      transition: all .18s ease-out;
      font-size: $font-size-base;
      color: $black;
      .song-name {
        cursor: pointer;
        &:hover {
          color: $select-bg-color;
        }
      }
      .singer-name {
        text-decoration: none;
        margin-left: $module-sm-margin;
        color: $gray-color;
        &:hover {
          color: $select-bg-color;
        }
      }
    }
    .play-music-time {
      position: absolute;
      right: 0;
      top: 0;
      font-size: $font-size-base;
      color: $gray-color;
    }
    .progress-wrap {
      padding-top: $module-padding;
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
      background-position: 50%;
      filter: blur(65px);
      opacity: .6;
      &.spread-bg {
        background-size: cover;
      }
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
