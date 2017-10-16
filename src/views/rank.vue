<template>
  <div class="rank" v-iscroll="getIscroll">
    <div>
      <div class="title">
        QQ音乐巅峰榜
      </div>
      <ul class="top-list clearfix">
        <li v-for="(item, index) in toplist" v-if="item.id !== 201" :key="index">
          <div class="item clearfix">
            <div class="pic pull-left" v-lazy:background-image="item.picUrl">
              <div class="player">
                <div class="player-icon">
                  <i class="iconfont icon-player"></i>
                </div>
              </div>
              <div class="num">{{ filterCount(item.listenCount) }}</div>
            </div>
            <div class="list">
              <div class="songname" v-for="(item, index) in item.songList" :key="index">
                <span class="count">{{ index + 1 }}</span> {{ item.songname }} - {{ item.singername }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getToplist } from '@/api/rank'
  import { ERR_OK } from '@/util/config'
  export default {
    name: 'rank',
    data () {
      return {
        toplist: []
      }
    },
    created () {
      this._getToplist()
    },
    methods: {
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
        })
      },
      filterCount (n) {
        if (n > 9999) {
          let decimal = n / 10000
          return this._cutDecimal(decimal, 1) + '万'
        } else {
          return n
        }
      },
      _cutDecimal (n, num) {
        return parseInt(n * Math.pow(10, num) + 0.5, 10) / Math.pow(10, num)
      },
      _getToplist () {
        getToplist().then(res => {
          if (res.code === ERR_OK) {
            this.toplist = res.data.topList
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  @import '~@/assets/scss/mixin';
  .rank {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
    padding: 0 $module-padding;
    width: 100%;
    overflow: hidden;
    background-color: $white;
    .title {
      height: $module-title-height;
      line-height: $module-title-height;
      border-bottom: 1px solid $border-color;
      font-size: $font-size-bg;
      color: $black;
    }
  }
  .top-list {
    margin: 0;
    margin-right: -$module-margin;
    padding: 0 0 $module-padding;
    list-style: none;
    li {
      float: left;
      margin-top: $module-margin;
      padding-right: $module-padding;
      width: 50%;
    }
    .item {
      width: 100%;
      cursor: pointer;
      background-color: $section-bg-color;
      &:hover {
        background-color: $section-depth-color;
      }
    }
    .pic {
      position: relative;
      width: 125px;
      height: 125px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      &:hover {
        .player {
          opacity: 1;
        }
      }
      .num {
        position: absolute;
        bottom: 5px;
        right: 5px;
        left: 0;
        text-align: right;
        font-size: $font-size-base;
        color: $white;
      }
      .player {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        transition: opacity .18s ease-out;
        background-color: rgba(0, 0, 0, .6);
      }
      .player-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 44px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        border-radius: 50%;
        transition: all .18s ease-out;
        background-color: $select-bg-color;
        &:hover {
          background-color: $select-depth-color;
        }
      }
      .iconfont {
        transition: color .18s ease-out;
        font-size: 24px;
        color: $white;
        &:hover {
          color: $white;
        }
      }
    }
    .list {
      padding: $module-padding;
      padding-left: 125px + $module-margin;
      padding-right: $module-margin;
      .songname {
        margin-top: 5px;
        width: 100%;
        height: $nav-height;
        line-height: $nav-height;
        @include text-overflow;
        font-size: $font-size-base;
        color: $black;
      }
      .count {
        margin-right: 5px;
      }
    }
  }
</style>
