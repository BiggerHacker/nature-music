<template>
  <div class="selected-wrap" v-iscroll>
    <div>
      <div v-if="selectedList.focus">
        <div class="slide-wrap">
          <v-slide :slideList="selectedList.focus"></v-slide>
        </div>
        <div class="hot-wrap">
          <h2 class="title">热门推荐</h2>
          <ul class="hot-list">
            <li v-for="(item, index) in selectedList.hotdiss.list" v-if="index < 5">
              <div class="pic" :style="{'background-image': 'url(' + item.imgurl + ')'}">
                <div class="player">
                  <i class="iconfont icon-player"></i>
                </div>
              </div>
              <div class="name">{{ item.dissname }}</div>
            </li>
          </ul>
        </div>
        <div class="album-wrap" v-if="albums.albumlist">
          <div class="title">
            <h2 class="name">新歌首发</h2>
            <ul class="album-title-list">
              <li v-for="(item, index) in albumTitle" :class="{active: albumIndex === index}">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="album-body">
            <v-album></v-album>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VSlide from '@/components/v-slide'
  import VAlbum from '@/components/v-album'
  import { getSelected, getAlbum } from '@/api/selected'
  import { ERR_OK } from '@/util/config'
  export default {
    name: 'selected',
    components: {
      VSlide,
      VAlbum
    },
    data () {
      return {
        selectedList: [],
        albums: [],
        albumIndex: 0
      }
    },
    created () {
      this.albumTitle = [
        {
          name: '内地',
          language: 0
        },
        {
          name: '港台',
          language: 1
        },
        {
          name: '欧美',
          language: 5
        },
        {
          name: '韩国',
          language: 4
        },
        {
          name: '日本',
          language: 3
        }
      ]
      this.getSelected()
      this.getAlbum()
    },
    methods: {
      getSelected () {
        getSelected().then(res => {
          if (res.code === ERR_OK) {
            this.selectedList = res.data
          }
        })
      },
      getAlbum (language = 0) {
        getAlbum(0, 36, language).then(res => {
          if (res.code === ERR_OK) {
            this.albums = res.data
            console.log(this.albums)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .selected-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .slide-wrap {
    padding: $module-padding;
    background-color: $white;
  }
  .hot-wrap {
    padding: 0 $module-padding $module-padding;
    background-color: $section-bg-color;
    .title {
      margin: 0;
      font-weight: normal;
      height: $module-title-height;
      line-height: $module-title-height;
      font-size: $font-size-bg;
      color: $black;
    }
  }
  .hot-list {
    margin: 0;
    margin-left: -$module-margin;
    padding: 0;
    list-style: none;
    overflow: hidden;
    li {
      float: left;
      width: 182px;
      overflow: hidden;
      margin-left: $module-margin;
    }
    .pic {
      position: relative;
      padding-top: 100%;
      cursor: pointer;
      background-size: cover;
      &:hover {
        .player {
          opacity: 1;
        }
      }
      .player {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: opacity .18s ease-out;
        background-color: rgba(0, 0, 0, .6);
      }
      .iconfont {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: color .18s ease-out;
        font-size: 48px;
        color: $select-bg-color;
        &:hover {
          color: $white;
        }
      }
    }
    .name {
      margin-top: $module-sm-margin;
      max-height: 38px;
      line-height: 18px;
      overflow: hidden;
      cursor: pointer;
      transition: color .18s ease-out;
      font-size: $font-size-base;
      &:hover {
        color: $select-bg-color;
      }
    }
  }
  .album-wrap {
    padding: $module-padding;
    background-color: $white;
    .title {
      height: $module-title-height;
      overflow: hidden;
    }
    .name {
      float: left;
      margin: 0;
      font-weight: normal;
      height: $module-title-height;
      line-height: $module-title-height;
      font-size: $font-size-bg;
      color: $black;
    }
  }
  .album-title-list {
    float: left;
    margin: 0 0 0 $module-margin;
    padding: 0;
    list-style: none;
    overflow: hidden;
    li {
      float: left;
      height: $module-title-height;
      line-height: $module-title-height;
      margin-right: $module-margin;
      cursor: pointer;
      font-size: $font-size-base;
      color: #6c757b;
      &:hover {
        color: $select-bg-color;
      }
      &.active {
        color: $select-bg-color;
      }
    }
  }
  .album-body {
    background-color: $section-bg-color;
  }
</style>
