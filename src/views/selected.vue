<template>
  <div class="selected-wrap" v-iscroll="getIscroll">
    <div>
      <div v-if="selectedList.focus">
        <div class="slide-wrap">
          <v-slide :slideList="selectedList.focus"></v-slide>
        </div>
        <div class="hot-wrap">
          <h2 class="title">热门推荐</h2>
          <ul class="hot-list">
            <li class="pull-left" v-for="(item, index) in selectedList.hotdiss.list" v-if="index < 5">
              <div class="pic" :style="{'background-image': 'url(' + item.imgurl + ')'}" @click="selectSheet(item.dissid)">
                <div class="player">
                  <i class="iconfont icon-player" @click.stop="playerHotlist(item.dissid)"></i>
                </div>
              </div>
              <div class="name" @click="selectSheet(item.dissid)">{{ item.dissname }}</div>
            </li>
          </ul>
        </div>
        <div class="album-wrap" v-if="albums[0]">
          <div class="title">
            <h2 class="name pull-left">新歌首发</h2>
            <ul class="album-title-list pull-left">
              <li 
                v-for="(item, index) in albumTitle" 
                class="pull-left" 
                :class="{active: albumIndex === index}"
                @click="setCurrent(index);"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <v-album :albumList="albums" :refresh="albumIndex"></v-album>
        </div>
        <div class="singer-wrap" v-if="hotSingers.length">
          <div class="title">
            <h2 class="name pull-left">热门歌手</h2>
            <router-link to="selected" class="more pull-right">更多 &gt;</router-link>
          </div>
          <ul class="singer-hot">
            <li class="pull-left" v-for="item in hotSingers">
              <router-link 
                to="selected" 
                class="thrum" 
                :style="{'background-image': 'url(https://y.gtimg.cn/music/photo_new/T001R300x300M000'+ item.Fsinger_mid +'.jpg?max_age=2592000)'}"
              ></router-link>
              <router-link to="selected" class="singer-name">{{ item.Fsinger_name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VSlide from '@/components/v-slide'
  import VAlbum from '@/components/v-album'
  import { getSelected, getAlbum } from '@/api/selected'
  import { getSingers } from '@/api/singer'
  import { getSheetList } from '@/api/sheet'
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
        hotSingers: [],
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
      this.getSingers(1, 50)
    },
    methods: {
      getAlbum (language = 0) {
        getAlbum(0, 36, language).then(res => {
          if (res.code === ERR_OK) {
            this.albums = this._filterAlbums(res.data)
          }
        })
      },
      getCurrentAlbum (language) {
        this.getAlbum(language)
      },
      setCurrent (index) {
        this.albumIndex = index
      },
      getSelected () {
        getSelected().then(res => {
          if (res.code === ERR_OK) {
            this.selectedList = res.data
          }
        })
      },
      getSingers (pagenum = 1, pagesize = 100) {
        getSingers(pagenum, pagesize).then(res => {
          if (res.code === ERR_OK) {
            this.hotSingers = this._filterSingers(res.data)
          }
        })
      },
      selectSheet (disstid) {
        this.$router.push({
          path: `/sheet/${disstid}`
        })
      },
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
        })
      },
      playerHotlist (id) {
        getSheetList(id).then(res => {
          if (res.code === ERR_OK) {
            this.selectPlay({
              list: res.cdlist[0].songlist,
              index: 0
            })
          }
        })
      },
      _filterAlbums (list) {
        let albums = list.albumlist
        let result = [[], [], [], []]
        albums.forEach((k, i) => {
          if (i < 9) {
            result[0].push(k)
          } else if (i >= 9 && i < 18) {
            result[1].push(k)
          } else if (i >= 18 && i < 27) {
            result[2].push(k)
          } else if (i >= 27) {
            result[3].push(k)
          }
        })
        return result
      },
      _filterSingers (list) {
        let singers = list.list
        let result = []
        singers.forEach((k, i) => {
          if (i < 5) {
            result.push(k)
          }
        })
        return result
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      albumIndex (newIndex) {
        this.getCurrentAlbum(this.albumTitle[newIndex].language)
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
      margin: 0;
      font-weight: normal;
      height: $module-title-height;
      line-height: $module-title-height;
      font-size: $font-size-bg;
      color: $black;
    }
  }
  .album-title-list {
    margin: 0 0 0 $module-margin;
    padding: 0;
    list-style: none;
    overflow: hidden;
    li {
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
  .singer-wrap {
    padding: 0 $module-padding $module-padding;
    background-color: $section-bg-color;
    .title {
      height: $module-title-height;
      overflow: hidden;
    }
    .name {
      margin: 0;
      font-weight: normal;
      height: $module-title-height;
      line-height: $module-title-height;
      font-size: $font-size-bg;
      color: $black;
    }
    .more {
      height: $module-title-height;
      line-height: $module-title-height;
      text-decoration: none;
      font-size: $font-size-base;
      color: $gray-color;
      &:hover {
        color: $select-bg-color;
      }
    }
  }
  .singer-hot {
    margin: 0;
    padding: 0 0 $module-padding;
    list-style: none;
    overflow: hidden;
    li {
      padding: 0 $module-sm-padding*2;
      width: 20%;
      text-align: center;
    }
    .thrum {
      display: block;
      width: 100%;
      padding-top: 100%;
      border-radius: 50%;
      background-size: cover;
    }
    .singer-name {
      display: inline-block;
      margin-top: $module-margin;
      text-decoration: none;
      font-size: $font-size-base;
      color: $black;
      &:hover {
        color: $select-bg-color;
      }
    }
  }
</style>
