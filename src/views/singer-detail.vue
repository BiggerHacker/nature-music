<template>
  <div class="singer-detail-wrap">
    <div class="singer-detail" v-iscroll="getIscroll" v-if="!loading">
      <div ref="scrollBox">
        <div class="detail-head clearfix">
          <div class="thumb pull-left" :style="{'background-image': 'url(https://y.gtimg.cn/music/photo_new/T001R300x300M000'+ singerDetailList.singer_mid +'.jpg?max_age=2592000)'}"></div>
          <div class="thumb-state">
            <h2 class="title">{{ singerDetailList.singer_name }}的歌曲</h2>
            <p class="desc">
              <span>单曲: {{ singerDetailList.total }}</span>
              |
              <span>专辑: {{ singerAlbumsLength }}</span>
            </p>
          </div>
        </div>
        <div class="detail-body">
          <div class="song-count">
            <span v-if="ismore">热门歌曲</span>
            <span v-if="!ismore">全部歌曲</span>
            <span class="count-btn" @click="allSongs" v-if="ismore">查看全部</span>
            <span class="count-btn" @click="hotSongs" v-if="!ismore">返回热门</span>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th width="33%">歌曲名</th>
                <th width="33%">专辑</th>
                <th width="10%">时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in singerDetailList.list" @dblclick="selectItem(item, index)">
                <td>
                  <div class="td-wrap">
                    {{ item.musicData.songname }}
                  </div>
                  <div class="player-contro" @click="selectItem(item, index)">
                    播放歌曲
                  </div>
                  <div class="player-on" v-if="item.musicData.songid === currentSong.songid">
                    -正在播放-
                  </div>
                </td>
                <td>
                  <div class="td-wrap">
                    <span class="album-name">{{ item.musicData.albumname }}</span>
                  </div>
                </td>
                <td class="time">{{ filterTime(item.musicData.interval) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-wrap" v-if="!ismore">
            <v-pagination v-if="allPage !== 1" :allPage="allPage" @update="update"></v-pagination>
          </div>
          <div class="song-count" v-if="ismore">
            专辑
            <span class="count-btn">全部</span>
          </div>
          <v-list v-if="ismore" :list="singerAlbums"></v-list>
          <div class="song-count" v-if="ismore">
            相似歌手
          </div>
          <v-singer-list v-if="ismore" :list="simSinger"></v-singer-list>
        </div>
      </div>
    </div>
    <v-loading v-if="loading"></v-loading>
  </div>
</template>

<script>
  import VLoading from '@/components/v-loading'
  import VPagination from '@/components/v-pagination'
  import VList from '@/components/v-list'
  import VSingerList from '@/components/v-singer-list'
  import { mapGetters, mapActions } from 'vuex'
  import { getSimSingers, getSingerDetail, getSingerAlbums } from '@/api/singer'
  import { ERR_OK } from '@/util/config'
  import { prefix } from '@/util/dom'
  import List from '@/util/list'
  export default {
    name: 'singer-detail',
    components: {
      VLoading,
      VPagination,
      VList,
      VSingerList
    },
    data () {
      return {
        scrollY: true,
        ismore: true,
        loading: true,
        simSinger: [],
        singerDetailList: [],
        singerAlbumsLength: 0,
        singerAlbums: [],
        allPage: 1
      }
    },
    activated () {
      this.init()
      this.mid = this.$route.params.id
      this._getData(this.mid)
    },
    computed: {
      ...mapGetters([
        'currentSong'
      ])
    },
    beforeRouteUpdate (to, from, next) {
      this.init()
      this.mid = to.params.id
      this._getData(this.mid)
      next()
    },
    methods: {
      init () {
        this.ismore = true
        this.loading = true
      },
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
          if (this.scrollY) {
            scroll.y = 0
          }
        })
        scroll.on('scrollEnd', () => {
          this.scrollY = false
        })
      },
      selectItem (item, index) {
        this.selectPlay({
          list: [item.musicData],
          index: 0
        })
      },
      filterTime (time) {
        time = time | 0
        let minute = time / 60 | 0
        let second = this._getzero(time % 60)
        return `${minute}:${second}`
      },
      hotSongs () {
        this.loading = true
        this.ismore = true
        this._getSingerList(this.mid, 0, 10)
      },
      allSongs () {
        this.loading = true
        this.ismore = false
        this._getSingerList(this.mid, 0, 30)
        this.allPage = Math.ceil(this.singerDetailList.total / 30)
      },
      update (current) {
        this.scrollY = true
        let begin = (current - 1) * 30
        prefix(this.$refs.scrollBox, 'translate(0, 0)')
        this._getSingerList(this.mid, begin, 30)
      },
      _getData (mid) {
        this._getSimSinger(this.mid, 0, 5)
        this._getSingerList(this.mid, 0, 10)
        this._getSingerAlbums(this.mid, 0, 5)
      },
      _getzero (time) {
        if (parseInt(time) < 10) {
          time = `0${time}`
        }
        return time
      },
      _getSimSinger (mid, start, num) {
        getSimSingers(mid, start, num).then(res => {
          this.simSinger = res.singers.items
          this.loading = false
        })
      },
      _getSingerList (mid, begin, num) {
        getSingerDetail(mid, begin, num).then(res => {
          if (res.code === ERR_OK) {
            this.singerDetailList = res.data
            this.loading = false
          } else {
            this.$router.push({
              path: '/notfound'
            })
          }
        })
      },
      _getSingerAlbums (mid, begin, num) {
        getSingerAlbums(mid, begin, num).then(res => {
          if (res.code === ERR_OK) {
            this.singerAlbumsLength = res.data.total
            this.singerAlbums = this._createSingerAlbums(res.data.list)
          }
        })
      },
      _createSingerAlbums (list) {
        let result = []
        list.forEach(item => {
          result.push(new List({
            id: item.albumID,
            mid: item.albumMID,
            name: item.albumName,
            url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMID}.jpg?max_age=2592000`,
            time: item.pubTime
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
  .singer-detail-wrap,
  .singer-detail {
    position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: $white;
  }
  .singer-detail {
    top: 0;
  }
  .detail-head {
    padding: $module-padding;
    .thumb {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .thumb-state {
      padding-left: 50px + $module-padding;
    }
    .title {
      margin: $module-sm-margin 0 0;
      font-weight: normal;
      font-size: $font-size-large;
    }
    .desc {
      margin: $module-sm-margin * 2 0 0;
      font-size: $font-size-base;
      color: $select-bg-color;
    }
  }
  .detail-body {
    padding: 0 $module-padding $module-padding;
    .song-count {
      position: relative;
      height: $module-title-height;
      line-height: $module-title-height;
      font-family: "Microsoft YaHei";
      font-weight: 100;
      .count-btn {
        position: absolute;
        right: 0;
        top: 0;
        height: $module-title-height;
        cursor: pointer;
        &:hover {
          color: $select-bg-color;
        }
      }
    }
    .table {
      width: 100%;
      text-align: left;
      border-collapse: collapse;
      .singer-name,
      .album-name {
        cursor: pointer;
        &:hover {
          color: $select-bg-color;
        }
      }
      .td-wrap {
        height: 42px;
        overflow: hidden;
      }
      td,
      th {
        margin: 0;
        padding: 0 0 0 $module-padding;
        height: 42px;
        border-bottom: 1px solid $border-color;
        font-size: $font-size-base;
      }
      td:last-child,
      th:last-child {
        padding-right: $module-padding;
      }
      th {
        font-weight: normal;
        background-color: $section-bg-color;
        color: $gray-color;
      }
      td {
        position: relative;
        line-height: 42px;
        color: $black;
      }
      .time {
        color: $gray-color;
      }
      tbody tr:hover {
        background-color: #fff1f1;
        .player-contro,
        .player-on {
          display: block;
          &:before {
            background-color: #fff1f1;
          }
        }
      }
    }
  }
  .player-contro,
  .player-on {
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
  .player-contro {
    &:hover {
      background-color: $select-depth-color;
    }
  }
  .player-on {
    display: block;
  }
  .pagination-wrap {
    padding: $module-padding;
    text-align: center;
  }
</style>
