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
        <div @click="changeMode" class="pull-right play-mode">
          <i class="iconfont" :class="playMode"></i>
        </div>
      </div>
      <div class="play-intro clearfix">
        <div class="pull-left thrum" v-lazy:background-image="thrumUrl" @click="fullScreenToggle"></div>
        <div class="pull-left play-music">
          <div class="play-music-intro" v-if="!isNull">
            <span @click="fullScreenToggle" class="song-name">
              {{ currentSong.songname }}
            </span>
            <router-link 
              class="singer-name" 
              :to="{path: '/singer/' + currentSong.singer[0].mid}"
            >
                --{{ currentSong.singer[0].name }}
            </router-link>
          </div>
          <div class="play-music-intro" v-else>聆听你的心动</div>
          <div class="play-music-time" v-if="!isNull">{{ filterTime(currentTime) }} / {{ filterTime(currentSong.interval) }}</div>
          <div class="play-music-time" v-else>00:00 / 00:00</div>
          <v-progress-bar :percent="percent" @upPlay="onupplay"></v-progress-bar>
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
      <div class="back" @click="fullScreenToggle">
        <i class="iconfont icon-prev"></i>
      </div>
      <div class="player-content">
        <div class="player-bd">
          <div class="player-mod">
            <div class="mod-thrum" :style="{'background-image': 'url('+ thrumUrl +')'}"></div>
            <div class="name">{{ currentSong.songname }}</div>
            <div class="info">
              <router-link 
                :to="{path: '/singer/' + currentSong.singer[0].mid}"
              >
                歌手: {{ currentSong.singer[0].name }}
              </router-link>
              <router-link :to="{path: '/album/detail/' + currentSong.albumid}">专辑: {{ currentSong.albumname }}</router-link>
            </div>
            <div class="lyric-wrap" v-if="currentLyric">
              <div class="lyric-box" v-iscroll="getIscroll">
                <div 
                  class="lyric-info" 
                  ref="lyricInfo" 
                  v-if="currentLyric.lines.length > 0">
                  <p 
                    v-for="(item, index) in currentLyric.lines"
                    :key="index"
                    ref="line" 
                    :class="{on: currentLineNum === index}"
                    v-html="item.txt"
                  >
                  </p>
                </div>
                <div class="lyric-info lyric-default" ref="lyricInfo" v-else>
                  此歌曲为没有填词的纯音乐
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio 
      ref="audio" 
      @canplay="ready" 
      @error="error" 
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import Base64 from 'js-base64'
  import Lyric from 'lyric-parser'
  import { mode, ERR_OK } from '@/util/config'
  import { shuffle } from '@/util/util'
  import { getLyric, getVKey } from '@/api/song'
  import { getUid } from '@/util/uid'
  import { prefix } from '@/util/dom'
  import defaultThrum from './../assets/images/lazyloading.png'
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
        songReady: false,
        currentTime: 0,
        currentLyric: null,
        currentLineNum: 0,
        currentLineOffsetY: 0
      }
    },
    computed: {
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-player'
      },
      disableCls () {
        return this.songReady ? '' : 'disable'
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
      getIscroll (iscroll) {
        this._resetLyricOffset()
        if (this.currentLyric.lines.length === 0) {
          prefix(this.$refs.lyricInfo, 'translate(0px, 0px)')
        } else {
          prefix(this.$refs.lyricInfo, 'translate(0px, 200px)')
        }
        iscroll.on('scrollStart', () => {
          iscroll.y = -this.currentLineOffsetY
        })
      },
      fullScreenToggle () {
        if (!this.isNull) {
          this.SET_FULL_SCREEN_STATE(!this.fullScreen)
        }
      },
      togglePlay () {
        if (!this.songReady) {
          return
        }
        if (!this.isNull) {
          this.SET_PLAYING_STATE(!this.playing)
        }
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
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
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      next () {
        if (!this.songReady) {
          return
        }
        if (this.mode === mode.loop || this.playList.length === 1) {
          this.loop()
          if (!this.playing) {
            this.togglePlay()
          }
          if (this.currentLyric) {
            this.currentLyric.seek(0)
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
        if (this.mode === mode.loop || this.playList.length === 1) {
          this.loop()
          if (!this.playing) {
            this.togglePlay()
          }
          if (this.currentLyric) {
            this.currentLyric.seek(0)
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
        if (this.playing) {
          this.songReady = true
          alert('抱歉，暂未提供该歌曲')
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
        let currentTime = percent * this.currentSong.interval
        this.currentTime = this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlay()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
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
      _resetLyricOffset () {
        prefix(this.$refs.lyricInfo, '0.68s', 'TransitionDuration')
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
      _getLyric (id) {
        let lyric
        if (lyric) {
          return Promise.resolve(lyric)
        }
        return new Promise((resolve, reject) => {
          getLyric(id).then(res => {
            if (res.retcode === ERR_OK) {
              lyric = Base64.Base64.decode(res.lyric)
              resolve(lyric)
            } else {
              reject('no lyric')
            }
          })
        })
      },
      _lyricPlay ({lineNum, text}) {
        if (!this.$refs.lyricInfo) {
          return
        }
        this.currentLineNum = lineNum
        if (lineNum > 0) {
          let lineEl = this.$refs.line[lineNum]
          this.currentLineOffsetY = lineEl.offsetTop - 200
          prefix(this.$refs.lyricInfo, `translate(0px, ${-this.currentLineOffsetY}px)`)
          this._resetLyricOffset()
        }
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
        if (!newSong.songid) {
          return
        }
        if (newSong.songid === oldSong.songid) {
          return
        }
        this.songReady = false
        this.thrumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${newSong.albummid}.jpg?max_age=2592000`
        if (this.currentLyric) {
          this.currentLyric.stop()
          this.currentLyric = null
          this.currentTime = 0
          this.currentLineNum = 0
        }
        this.$nextTick(() => {
          const filename = `C400${newSong.songmid}.m4a`
          getVKey(newSong.songmid, filename).then(res => {
            if (res.code === ERR_OK) {
              const vkey = res.data.items[0].vkey
              this.$refs.audio.src = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`
              this.$refs.audio.play()
            }
          })
          this.SET_ISNULL_STATE(false)
          this._getLyric(newSong.songmid).then(res => {
            this.currentLyric = new Lyric(res, this._lyricPlay)
            if (this.playing) {
              this.currentLyric.play()
            }
            if (this.songReady) {
              this.currentLyric.seek(this.currentTime * 1000)
            }
          }).catch(() => {
            this.currentLyric = null
            this.currentLineNum = 0
            this.currentLineOffsetY = 0
          })
        })
      },
      playing (newPlaying) {
        if (!this.songReady) {
          return
        }
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
    z-index: 20;
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
      .play-mode .iconfont {
        color: $white;
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
      .disable {
        border: 0;
        color: #ccc;
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
  }
  .spread-player {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 18;
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
        a {
          display: inline-block;
          margin-left: $module-margin*2;
          max-width: 40%;
          height: 20px;
          @include text-overflow;
          text-decoration: none;
          transition: all .18s ease-out;
          font-size: 20px;
          color: rgba(255, 255, 255, .4);
          &:first-child {
            margin-left: 0;
          }
          &:hover {
            color: $white;
          }
        }
      }
    }
    .lyric-wrap {
      position: absolute;
      left: 0;
      top: 75px;
      bottom: 60px;
      padding-left: 374px;
      width: 100%;
      overflow: hidden;
      mask-image: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,.6) 15%,rgba(255,255,255,1) 25%,rgba(255,255,255,1) 75%,rgba(255,255,255,1) 85%,rgba(255,255,255,0) 100%);
    }
    .lyric-box {
      position: absolute;
      left: 374px;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      .lyric-info {
        padding-bottom: 50px;
        color: $white;
      }
      p {
        margin: 0;
        line-height: 34px;
        color: $white;
        &.on {
          transition: all .18s ease-out;
          color: $select-bg-color;
        }
      }
    }
    .lyric-default {
      position: relative;
      top: 150px;
    }
  }
</style>
