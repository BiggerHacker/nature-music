<template>
  <div class="sheet-detail-wrap">
    <div class="sheet-detail" v-iscroll="getIscroll" v-if="!loading">
      <div>
        <div class="module-detail">
          <div class="detail-head clearfix">
            <div class="thrum pull-left" :class="{'thrum-cir': !sheetDetailList.disstid}">
              <img :src="sheetDetailList.logo" alt="">
            </div>
            <div class="illustrate">
              <h2 class="title">{{ sheetDetailList.dissname }}</h2>
              <div class="intro" v-if="sheetDetailList.nickname">
                <span class="name">{{ sheetDetailList.nickname }}</span>
                <span class="time">{{ format(sheetDetailList.ctime) }}创建</span>
                <span class="tag" v-for="(item, index) in sheetDetailList.tags" :key="index">{{ item.name }}</span>
              </div>
              <div class="desc">
                <div class="text" v-html="sheetDetailList.desc"></div>
                <div class="desc all-desc" v-show="descShow">
                  <div class="text" v-html="sheetDetailList.desc"></div>
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
            <div class="song-count">歌 曲 ( {{ sheetDetailList.total_song_num }} )</div>
            <v-song-list :list="songList" @select="selectItem"></v-song-list>
          </div>
        </div>
      </div>
    </div>
    <v-loading v-if="loading"></v-loading>
  </div>
</template>

<script>
  import VSongList from '@/components/v-song-list'
  import VLoading from '@/components/v-loading'
  import { mapActions } from 'vuex'
  import { getSheetList } from '@/api/sheet'
  import { ERR_OK } from '@/util/config'
  import Song from '@/class/song'
  export default {
    name: 'sheet-detail',
    components: {
      VSongList,
      VLoading
    },
    activated () {
      this.loading = true
      this.descShow = false
      this.getSheetDetail(this.$route.params.id)
    },
    data () {
      return {
        sheetDetailList: {},
        songList: [],
        loading: true,
        descShow: false
      }
    },
    methods: {
      getSheetDetail (disstid) {
        getSheetList(disstid).then(res => {
          if (res.code === ERR_OK) {
            this.sheetDetailList = res.cdlist[0]
            this.songList = this._createSonglist(res.cdlist[0].songlist)
            this.loading = false
          }
        })
      },
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
        })
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.sheetDetailList.songlist,
          index: index
        })
      },
      format (time) {
        let date = new Date(time * 1000)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return `${year}-${this._getzero(month)}-${this._getzero(day)}`
      },
      showDesc () {
        this.descShow = true
      },
      hideDesc () {
        this.descShow = false
      },
      playAll () {
        this.selectPlay({
          list: this.sheetDetailList.songlist,
          index: 0
        })
      },
      _createSonglist (list) {
        let result = []
        list.forEach(item => {
          result.push(new Song({
            songid: item.songid,
            mid: item.songmid,
            albummid: item.albumid,
            songname: item.songname,
            singername: item.singer,
            albumname: item.albumname,
            interval: item.interval
          }))
        })
        return result
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
  .sheet-detail-wrap,
  .sheet-detail {
    position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: $white;
  }
  .sheet-detail {
    top: 0;
  }
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
  }
</style>
