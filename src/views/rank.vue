<template>
  <div class="rank" v-iscroll="getIscroll">
    <div>
      <div class="title">
        QQ音乐巅峰榜
      </div>
      <ul class="top-list clearfix">
        <li v-for="item in toplist" v-if="item.id !== 201">
          <div class="item clearfix">
            <div class="pic pull-left" v-lazy:background-image="item.picUrl"></div>
            <div class="list">
              <div class="songname" v-for="(item, index) in item.songList">
                <span class="count">{{ index }}</span> {{ item.songname }} - {{ item.singername }}
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
      }
      .count {
        margin-right: 5px;
      }
    }
  }
</style>
