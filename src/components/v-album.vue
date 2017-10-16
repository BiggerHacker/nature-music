<template>
  <div class="album"> 
    <div class="title">
      <div class="btns">
        <div class="btn prev" :class="{active: prefFlag}" @click="prev">
          <i class="iconfont icon-prev"></i>
        </div>
        <div class="btn next" :class="{active: nextFlag}" @click="next">
          <i class="iconfont icon-next"></i>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="panel">
        <ul class="album-list" :style="{width: (count * 100) + '%'}" ref="albums">
          <li :style="{width: (100 / count) + '%'}" v-for="(item, index) in albumList" :key="index">
            <div 
              class="item" 
              v-for="(albums, index) in item" 
              :key="index"
              @dblclick="selectItem(albums, index)"
            >
              <div class="thumb" v-lazy:background-image="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+ albums.album_mid +'.jpg?max_age=2592000'">
                <div class="cover"></div>
              </div>
              <div class="intro">
                <div class="name">{{ albums.album_name }}</div>
                <div class="singer">
                  <span @click="toSinger(albums, index)">{{ albums.singer_name }}</span>
                  <div class="player-contro" @click="selectItem(albums, index)">
                    播放
                  </div>
                  <div class="player-on" v-if="currentSong.albummid === albums.album_mid">
                    - 正在播放 -
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { prefix } from '@/util/dom'
  export default {
    name: 'album',
    props: {
      albumList: {
        type: Array,
        default: []
      },
      refresh: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        n: 0,
        nextFlag: false,
        prefFlag: true
      }
    },
    computed: {
      count () {
        return this.albumList.length
      },
      ...mapGetters([
        'currentSong'
      ])
    },
    methods: {
      next () {
        this.n += 1
        this.prefFlag = false
        if (this.n >= (this.count - 1)) {
          this.nextFlag = true
          this.n = this.count - 1
        }
        this._slideAlbums(this.n)
      },
      prev () {
        this.n -= 1
        this.nextFlag = false
        if (this.n <= 0) {
          this.prefFlag = true
          this.n = 0
        }
        this._slideAlbums(this.n)
      },
      selectItem (albums, index) {
        this.$emit('select', albums, index)
      },
      toSinger (albums, index) {
        this.$emit('tosinger', albums, index)
      },
      _slideAlbums (n) {
        let albums = this.$refs.albums
        prefix(albums, `translateX(-${25 * n}%)`)
      }
    },
    watch: {
      refresh () {
        this.n = 0
        this.nextFlag = false
        this.prefFlag = true
        this._slideAlbums(this.n)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  @import '~@/assets/scss/mixin';
  .album {
    background-color: $section-bg-color;
    .title {
      padding: $module-padding;
      border-bottom: 1px solid $border-color;
      overflow: hidden;
    }
    .btns {
      float: left;
      overflow: hidden;
    }
    .btn {
      float: left;
      margin-right: $module-margin;
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
      border-radius: 50%;
      border: 1px solid $select-bg-color;
      color: $select-bg-color;
      .iconfont {
        font-size: 12px;
      }
      &.active {
        cursor: default;
        border: 1px solid #e9e9e9;
        color: #e9e9e9;
      }
    }
    .body {
      padding: $module-padding;
    }
    .panel {
      width: 100%;
      height: 158px;
      overflow: hidden;
    }
  }
  .album-list {
    margin: 0;
    padding: 0;
    list-style: none;
    height: 100%;
    overflow: hidden;
    transition: all .6s ease-out;
    li {
      float: left;
      width: 25%;
      height: 100%;
      overflow: hidden;
    }
    .item {
      float: left;
      margin-bottom: $module-sm-margin*2;
      width: 33.3333%;
      height: 46px;
      overflow: hidden;
      &:hover {
        .cover {
          opacity: 1;
        }
        .player-contro {
          display: block;
        }
      }
    }
    .thumb {
      float: left;
      position: relative;
      width: 46px;
      height: 46px;
      cursor: pointer;
      background-size: cover;
      .cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity .18s ease-out;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
    .intro {
      padding-right: $module-padding;
      padding-top: $module-sm-padding;
      margin-left: 46px + $module-sm-margin;
      height: 100%;
      .name {
        height: 14px;
        @include text-overflow;
        font-size: $font-size-base;
        color: $black;
      }
    }
    .singer {
      position: relative;
      margin-top: $module-sm-margin;
      height: 18px;
      overflow: hidden;
      span {
        margin-left: $module-sm-margin;
        cursor: pointer;
        font-size: $font-size-base;
        color: $gray-color;
        &:first-child {
          margin-left: 0;
        }
        &:hover {
          color: $select-bg-color;
        }
      }
      .player-contro,
      .player-on {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 0 $module-padding;
        height: 18px;
        line-height: 18px;
        cursor: pointer;
        border-radius: $border-radius-base;
        background-color: $select-bg-color;
        font-size: $font-size-base;
        color: $white;
      }
      .player-on {
        display: block;
      }
    }
  }
</style>
