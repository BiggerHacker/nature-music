<template>
  <div class="singer-detail-wrap">
    <div class="singer-detail" v-iscroll="getIscroll" v-if="!loading">
      <div>
        <div class="detail-head">
          <h2 class="title">{{ singerDetailList.singer_name }}的歌曲</h2>
        </div>
        <div class="detail-body">
          <div class="song-count">
            热门歌曲
            <span class="count-btn" @click="allSongs" v-if="ismore">全部</span>
            <span class="count-btn" @click="hotSongs" v-if="!ismore">热门</span>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>歌曲名</th>
                <th>专辑</th>
                <th>时间</th>
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
                  <div class="player-on" v-if="item.musicData.songname === currentSong.songname">
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
            <v-pagination 
              :currentPage="currentPage" 
              :allPage="allPage" 
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <v-loading v-if="loading"></v-loading>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getSingerDetail } from '@/api/singer'
  import { ERR_OK } from '@/util/config'
  import VLoading from '@/components/v-loading'
  import VPagination from '@/components/v-pagination'
  export default {
    name: 'singer-detail',
    components: {
      VLoading,
      VPagination
    },
    data () {
      return {
        ismore: true,
        loading: true,
        singerDetailList: {},
        currentPage: 1,
        allPage: 1
      }
    },
    activated () {
      this.init()
      this.mid = this.$route.params.id
      this._getSingerList(this.mid, 0, 10)
    },
    computed: {
      ...mapGetters([
        'currentSong'
      ])
    },
    methods: {
      init () {
        this.ismore = true
        this.loading = true
        this.currentPage = 1
        this.allPage = 1
      },
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
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
      _getzero (time) {
        if (parseInt(time) < 10) {
          time = `0${time}`
        }
        return time
      },
      _getSingerList (mid, begin, num) {
        getSingerDetail(mid, begin, num).then(res => {
          if (res.code === ERR_OK) {
            this.singerDetailList = res.data
            this.loading = false
          }
        })
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
    .title {
      margin: 0;
      font-weight: normal;
      font-size: $font-size-bg;
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
