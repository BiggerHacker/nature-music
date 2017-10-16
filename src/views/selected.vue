<template>
  <div class="selected-wrap" v-iscroll="getIscroll">
    <div>
      <div v-if="selectedList.focus">
        <div class="slide-wrap">
          <v-slide :slideList="selectedList.focus"></v-slide>
        </div>
        <div class="hot-wrap">
          <h2 class="title">热门推荐</h2>
          <v-list :list="hotList" @selectList="selectSheet" @playList="playerHotlist"></v-list>
        </div>
        <div class="album-wrap" v-if="albums[0]">
          <div class="title">
            <h2 class="name pull-left">新歌首发</h2>
            <ul class="album-title-list pull-left">
              <li 
                v-for="(item, index) in albumTitle" 
                :key="index"
                class="pull-left" 
                :class="{active: albumIndex === index}"
                @click="setCurrent(index);"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <v-album :albumList="albums" :refresh="albumIndex" @select="selectItem" @tosinger="tosinger"></v-album>
        </div>
        <div class="singer-wrap" v-if="hotSingers.length">
          <div class="title">
            <h2 class="name pull-left">热门歌手</h2>
            <router-link to="singer" class="more pull-right">更多 &gt;</router-link>
          </div>
          <ul class="singer-hot">
            <li class="pull-left" v-for="(item, index) in hotSingers" :key="index">
              <router-link 
                :to="{path: 'singer/'+ item.Fsinger_mid}" 
                class="thumb" 
                v-lazy:background-image="'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+ item.Fsinger_mid +'.jpg?max_age=2592000'"
              ></router-link>
              <router-link 
                :to="{path: 'singer/'+ item.Fsinger_mid}"  
                class="singer-name"
              >
                {{ item.Fsinger_name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import VSlide from '@/components/v-slide'
  import VList from '@/components/v-list'
  import VAlbum from '@/components/v-album'
  import { getSelected, getAlbum, getAlbumSing } from '@/api/selected'
  import { getSingers } from '@/api/singer'
  import { getSheetList } from '@/api/sheet'
  import { ERR_OK } from '@/util/config'
  import List from '@/class/list'
  export default {
    name: 'selected',
    components: {
      VSlide,
      VList,
      VAlbum
    },
    data () {
      return {
        selectedList: [],
        hotList: [],
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
      this.getSingers()
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
            this.hotList = this._createHotlist(res.data.hotdiss.list)
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
      selectItem (albums, index) {
        getAlbumSing(albums.album_mid).then(res => {
          if (res.code === ERR_OK) {
            this.selectPlay({
              list: res.data.list,
              index: 0
            })
          }
        })
      },
      tosinger (albums, index) {
        this.$router.push({
          path: `/singer/${albums.singer_mid}`
        })
      },
      _createHotlist (list) {
        let result = []
        list.forEach(item => {
          result.push(new List({
            id: item.dissid,
            mid: 0,
            name: item.dissname,
            url: item.imgurl
          }))
        })
        return result
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
      ]),
      ...mapMutations([
        'SET_PLAYING_STATE'
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
    background-color: $white;
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
    .thumb {
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
