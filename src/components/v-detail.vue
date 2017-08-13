<template>
  <div class="module-detail">
    <div class="detail-head clearfix">
      <div class="thrum pull-left" :class="{'thrum-cir': !list.disstid}">
        <img :src="list.logo" alt="">
      </div>
      <div class="illustrate">
        <h2 class="title">{{ list.dissname }}</h2>
        <div class="intro" v-if="list.nickname">
          <span class="name">{{ list.nickname }}</span>
          <span class="time">{{ format(list.ctime) }}创建</span>
          <span class="tag" v-for="item in list.tags">{{ item.name }}</span>
        </div>
        <div class="desc">
          <div class="text" v-html="list.desc"></div>
          <div class="desc all-desc" v-show="descShow">
            <div class="text" v-html="list.desc"></div>
            <div class="hide-desc" @click="hideDesc">[收起]</div>
          </div>
          <div class="up" v-show="!descShow" @click="showDesc">[展开]</div>
        </div>
        <div class="config">
          <span class="config-btn config-play-all" @click="playAll">
            <i class="iconfont icon-i-player"></i>
            播放全部
          </span>
        </div>
      </div>
    </div>
    <div class="detail-body">
      <div class="song-count">歌 曲 ( {{ list.total_song_num }} )</div>
      <div class="song-list">
        <ul class="song-list-head clearfix">
          <li>歌曲</li>
          <li>歌手</li>
          <li>专辑</li>
          <li>时间</li>
        </ul>
        <ul class="song-list-body">
          <li class="clearfix" v-for="(item, index) in list.songlist" @dblclick="selectItem(item, index)">
            <div class="item pull-left">
              {{ item.songname }}
              <div class="play-contro" @click="selectItem(item, index)">播放歌曲</div>
              <div class="play-on" v-if="item.songid === currentSong.songid">-正在播放-</div>
            </div>
            <div class="item pull-left">
              <span v-for="(item, index) in item.singer" class="singer-name">
                <span v-if="index !== 0">/</span>
                <router-link :to="{path: '/singer/' + item.mid}">{{ item.name }}</router-link>
              </span>
            </div>
            <div class="item pull-left">
              <router-link to="/selected">{{ item.albumname }}</router-link>
            </div>
            <div class="item time pull-left">
              {{ filterTime(item.interval) }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'detail',
    props: {
      list: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        descShow: false
      }
    },
    activated () {
      this.loading = true
      this.descShow = false
    },
    computed: {
      ...mapGetters([
        'currentSong'
      ])
    },
    methods: {
      format (time) {
        let date = new Date(time * 1000)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return `${year}-${this._getzero(month)}-${this._getzero(day)}`
      },
      filterTime (time) {
        time = time | 0
        let minute = time / 60 | 0
        let second = this._getzero(time % 60)
        return `${minute}:${second}`
      },
      showDesc () {
        this.descShow = true
      },
      hideDesc () {
        this.descShow = false
      },
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      playAll () {
        this.selectPlay({
          list: this.list.songlist,
          index: 0
        })
      },
      _getzero (time) {
        if (parseInt(time) < 10) {
          time = `0${time}`
        }
        return time
      },
      ...mapActions([
        'selectPlay'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  @import '~@/assets/scss/mixin';
  .module-detail {
    background-color: $white;
  }
  .detail-head {
    padding: $module-padding;
    background-color: $section-bg-color;
    .thrum {
      width: 150px;
      height: 150px;
      overflow: hidden;
      img {
        width: 100%;
      }
      &.thrum-cir {
        border-radius: 50%;
      }
    }
    .illustrate {
      padding-left: 150px + $module-padding;
      padding-top: $module-sm-padding;
    }
    .title {
      margin: 0;
      line-height: 100%;
      height: 24px;
      @include text-overflow;
    }
    .intro {
      margin-top: $module-margin;
      font-size: $font-size-base;
    }
    .name {
      cursor: pointer;
      color: $black;
      &:hover {
        color: $select-bg-color;
      }
    }
    .time {
      margin-left: $module-sm-margin;
      color: $gray-color;
    }
    .tag {
      display: inline-block;
      margin-left: $module-sm-margin;
      padding: 0 $module-sm-margin;
      cursor: pointer;
      height: 20px;
      line-height: 20px;
      transition: all .18s ease-out;
      border-radius: $border-radius-base;
      background-color: $select-bg-color;
      color: $white;
      &:hover {
        background-color: $select-depth-color;
      }
    }
    .desc {
      position: relative;
      padding-right: 40px;
      margin-top: $module-sm-margin;
      .text {
        height: 48px;
        overflow: hidden;
        line-height: 24px;
        font-size: $font-size-base;
        color: $gray-color;
      }
      .up {
        position: absolute;
        right: 0;
        bottom: 5px;
        cursor: pointer;
        font-size: $font-size-base;
        color: $black;
        &:hover {
          color: $select-bg-color;
        }
      }
      &.all-desc {
        position: absolute;
        left: -$module-margin;
        top: -($module-padding + $module-sm-margin);
        z-index: 10;
        width: 100%;
        overflow: hidden;
        background-color: $white;
        border-radius: $border-radius-base;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
        .text {
          padding: $module-padding 0 $module-padding*2 $module-padding;
          height: auto;
          overflow: auto;
        }
        .hide-desc {
          position: absolute;
          right: $module-margin;
          bottom: $module-margin;
          cursor: pointer;
          font-size: $font-size-base;
          color: $black;
          &:hover {
            color: $select-bg-color;
          }
        }
      }
    }
    .config {
      margin-top: $module-sm-margin;
      .config-btn {
        display: inline-block;
        margin-right: $module-margin;
        padding: $module-sm-padding 0;
        width: 102px;
        text-align: center;
        cursor: pointer;
        border: 1px solid $border-color;
        border-radius: $border-radius-base;
        transition: all .18s ease-out;
        color: $black;
        font-size: $font-size-base;
        &:hover {
          color: $select-bg-color;
        }
        &.config-play-all {
          border: 1px solid $select-bg-color;
          background-color: $select-bg-color;
          color: $white;
          .iconfont {
            color: $white;
          }
          &:hover {
            background-color: $select-depth-color;
            border: 1px solid $select-depth-color;
          }
        }
      }
      .iconfont {
        color: $select-bg-color;
        font-size: $font-size-base;
        margin-right: $module-sm-margin;
      }
    }
  }
  .detail-body {
    padding: 0 $module-padding $module-padding;
    .song-count {
      height: $module-title-height;
      line-height: $module-title-height;
      font-family: "Microsoft YaHei";
      font-weight: 100;
    }
    .song-list {
      font-size: $font-size-base;
      overflow: hidden;
    }
    .song-list-head,
    .song-list-body {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .song-list-head {
      background-color: $section-bg-color;
      height: 42px;
      line-height: 42px;
      border-bottom: 1px solid $border-color;
      color: $gray-color;
      li {
        float: left;
        padding-left: $module-padding;
        width: 25%;
        white-space: normal;
        &:last-child {
          text-align: center;
        }
      }
    }
    .song-list-body {
      width: 100%;
      color: $black;
      li {
        height: 42px;
        line-height: 42px;
        background-color: $white;
        border-bottom: 1px solid $border-color;
        &:hover {
          background-color: #fff1f1;
          .play-contro,
          .play-on {
            display: block;
            &:before {
              background-color: #fff1f1;
            }
          }
        }
        .item {
          position: relative;
          width: 25%;
          padding-left: $module-padding;
          @include text-overflow;
        }
        a {
          text-decoration: none;
          color: $black;
          &:hover {
            color: $select-bg-color;
          }
        }
        .time {
          text-align: center;
          color: $gray-color;
        }
      }
    }
  }
  .play-contro,
  .play-on {
    display: inline-block;
    padding: 0 $module-padding;
    display: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    border-radius: $border-radius-base;
    background-color: $select-bg-color;
    font-size: $font-size-base;
    color: $white;
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: -20px;
      top: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      background-color: #fff;
    }
  }
  .play-contro {
    &:hover {
      background-color: $select-depth-color;
    }
  }
  .play-on {
    display: block;
  }
</style>
