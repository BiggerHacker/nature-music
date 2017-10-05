<template>
  <div class="album-detail-wrap">
    <div class="album-detail" v-iscroll="getIscroll" v-if="!loading">
      <div>
        <div class="detail-head clearfix">
          <div class="thrum pull-left" v-if="albumDetail.headpiclist">
            <img :src="albumDetail.headpiclist[0].picurl" alt="">
          </div>
          <div class="illustrate">
            <h2 class="title">{{ albumDetail.album_name }}</h2>
            <div class="intro" v-if="albumDetail.singerinfo">
              <span class="name">{{ albumDetail.singerinfo[0].singername }}</span>
              <span class="time">{{ albumDetail.publictime }}发行</span>
            </div>
            <div class="desc">
              <div class="text" v-html="albumDetail.desc"></div>
              <div class="desc all-desc" v-show="descShow">
                <div class="text" v-html="albumDetail.desc"></div>
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
          <div class="song-count" v-if="albumDetail.songlist">歌 曲 ( {{ albumDetail.songlist.length }} )</div>
          <v-song-list :list="songList" @select="selectItem" :isAlbumName="false"></v-song-list>
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
  import { getAlbumDetail } from '@/api/album'
  import { ERR_OK } from '@/util/config'
  import Song from '@/class/song'
  export default {
    name: 'album-detail',
    components: {
      VSongList,
      VLoading
    },
    data () {
      return {
        descShow: false,
        loading: true,
        albumDetail: [],
        songList: []
      }
    },
    activated () {
      this.loading = true
      this.descShow = false
      let mid = this.$route.params.id
      this._getAlbumDetail(mid)
    },
    methods: {
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
        })
      },
      showDesc () {
        this.descShow = true
      },
      hideDesc () {
        this.descShow = false
      },
      playAll () {
        this.selectPlay({
          list: this.albumDetail.songlist,
          index: 0
        })
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.albumDetail.songlist,
          index: index
        })
      },
      _getAlbumDetail (mid) {
        getAlbumDetail(mid).then(res => {
          if (res.code === ERR_OK) {
            this.albumDetail = res.data
            this.songList = this._createSonglist(res.data.songlist)
            this.loading = false
          }
        })
      },
      _createSonglist (list) {
        let result = []
        list.forEach(item => {
          result.push(new Song({
            songid: item.songid,
            mid: item.songmid,
            songname: item.songname,
            singername: item.singer,
            albumname: item.albumname,
            interval: item.interval
          }))
        })
        return result
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
  .album-detail-wrap,
  .album-detail {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 44px;
    overflow: hidden;
    background-color: $white;
  }
  .album-detail {
    top: 0;
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
