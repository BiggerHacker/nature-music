<template>
  <div class="singer-detail-wrap">
    <div class="singer-detail" v-iscroll="getIscroll" v-if="!loading">
      <div ref="scrollBox">
        <div class="detail-head clearfix">
          <img class="thumb pull-left" v-lazy="'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+ singerDetailList.singer_mid +'.jpg?max_age=2592000'" :onerror="errImg">
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
          <v-song-list :list="songList" @select="selectItem" :isSingerName="false"></v-song-list>
          <div class="pagination-wrap" v-if="!ismore">
            <v-pagination v-if="allPage !== 1" :allPage="allPage" @update="update"></v-pagination>
          </div>
          <div class="song-count" v-if="ismore && singerAlbums.length !== 0">
            专辑
            <span class="count-btn" @click="toAlbum">查看全部</span>
          </div>
          <v-list 
            v-if="ismore" 
            :list="singerAlbums" 
            @selectList="selectAlbum"
            @playList="playAlbumSong"
          ></v-list>
          <div class="song-count" v-if="ismore && simSinger.length !== 0">
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
  import VSongList from '@/components/v-song-list'
  import { mapGetters, mapActions } from 'vuex'
  import { getSimSingers, getSingerDetail } from '@/api/singer'
  import { getSingerAlbums, getAlbumDetail } from '@/api/album'
  import { ERR_OK } from '@/util/config'
  import { prefix } from '@/util/dom'
  import List from '@/class/list'
  import Song from '@/class/song'
  export default {
    name: 'singer-detail',
    components: {
      VLoading,
      VPagination,
      VList,
      VSingerList,
      VSongList
    },
    data () {
      return {
        errImg: 'this.src="' + require('@/assets/images/error_singer.png') + '"',
        scrollY: true,
        ismore: true,
        loading: true,
        simSinger: [],
        singerDetailList: [],
        songList: [],
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
        this.simSinger = []
        this.singerDetailList = []
        this.singerAlbums = []
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
        let musicData = []
        for (let i = 0; i < this.singerDetailList.list.length; i++) {
          musicData.push(this.singerDetailList.list[i].musicData)
        }
        this.selectPlay({
          list: musicData,
          index: index
        })
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
      toAlbum () {
        this.$router.push({
          path: `/album/${this.singerDetailList.singer_mid}`
        })
      },
      selectAlbum (id) {
        this.$router.push({
          path: `/album/detail/${id}`
        })
      },
      playAlbumSong (id) {
        getAlbumDetail(id).then(res => {
          if (res.code === ERR_OK) {
            this.selectPlay({
              list: res.data.songlist,
              index: 0
            })
          }
        })
      },
      _getData (mid) {
        this._getSimSinger(this.mid, 0, 5)
        this._getSingerList(this.mid, 0, 10)
        this._getSingerAlbums(this.mid, 0, 5)
      },
      _getSimSinger (mid, start, num) {
        getSimSingers(mid, start, num).then(res => {
          this.simSinger = res.singers.items
        })
      },
      _getSingerList (mid, begin, num) {
        getSingerDetail(mid, begin, num).then(res => {
          if (res.code === ERR_OK) {
            this.singerDetailList = res.data
            this.songList = this._createSonglist(res.data.list)
            this.loading = false
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
      _createSonglist (list) {
        let result = []
        list.forEach(item => {
          result.push(new Song({
            songid: item.musicData.songid,
            mid: item.musicData.songmid,
            albummid: item.musicData.albumid,
            songname: item.musicData.songname,
            singername: item.musicData.singer,
            albumname: item.musicData.albumname,
            interval: item.musicData.interval
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
  }
  .pagination-wrap {
    padding: $module-padding;
    text-align: center;
  }
</style>
