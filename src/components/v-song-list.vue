<template>
  <div class="song-list">
    <ul class="song-list-head clearfix" :class="{'col-3': !isSingerName}">
      <li>歌曲</li>
      <li v-if="isSingerName">歌手</li>
      <li v-if="isAlbumName">专辑</li>
      <li>时间</li>
    </ul>
    <ul class="song-list-body">
      <li 
        class="clearfix" 
        :class="{'col-3': !isSingerName}"
        v-for="(item, index) in list" 
        :key="index"
        @dblclick="selectItem(item, index)"
      >
        <div class="item pull-left">
          {{ item.songname }}
          <div class="play-contro" @click="selectItem(item, index)">播放歌曲</div>
          <div class="play-on" v-if="item.songid === currentSong.songid">-正在播放-</div>
        </div>
        <div class="item pull-left" v-if="isSingerName">
          <span v-for="(item, index) in item.singername" class="singer-name" :key="index">
            <span v-if="index !== 0">/</span>
            <router-link :to="{path: '/singer/' + item.mid}">{{ item.name }}</router-link>
          </span>
        </div>
        <div class="item pull-left" v-if="isAlbumName">
          <router-link :to="{path: '/album/detail/' + item.albummid}">{{ item.albumname }}</router-link>
        </div>
        <div class="item time pull-left">
          {{ filterTime(item.interval) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'song-list',
    props: {
      list: {
        type: Array,
        default: []
      },
      isSingerName: {
        type: Boolean,
        default: true
      },
      isAlbumName: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters([
        'currentSong'
      ])
    },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      filterTime (time) {
        time = time | 0
        let minute = time / 60 | 0
        let second = this._getzero(time % 60)
        return `${minute}:${second}`
      },
      _getzero (time) {
        if (parseInt(time) < 10) {
          time = `0${time}`
        }
        return time
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  @import '~@/assets/scss/mixin';
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
    &.col-3 {
      li {
        width: 33%;
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
        height: 42px;
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
      &.col-3 {
        .item {
          width: 33%;
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
