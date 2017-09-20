<template>
  <div class="album-singer-wrap">
    <div class="album-singer" v-iscroll="getIscroll" v-if="!loading">
      <div ref="scrollBox">
        <h2 class="album-title">{{ albumName }}的专辑</h2>
        <v-list :list="albumList" :isBreviary="false" @selectList="selectAlbum"></v-list>
        <div class="pagination-wrap">
          <v-pagination v-if="allPage !== 1" :allPage="allPage" @update="update"></v-pagination>
        </div>
      </div>
    </div>
    <v-loading v-if="loading"></v-loading>
  </div>
</template>

<script>
  import VLoading from '@/components/v-loading'
  import VList from '@/components/v-list'
  import VPagination from '@/components/v-pagination'
  import { getSingerAlbums, getAlbumDetail } from '@/api/album'
  import { ERR_OK } from '@/util/config'
  import List from '@/class/list'
  import { prefix } from '@/util/dom'
  export default {
    name: 'album-singer',
    components: {
      VLoading,
      VList,
      VPagination
    },
    data () {
      return {
        loading: true,
        scrollY: true,
        albumName: '',
        albumList: [],
        allPage: 1
      }
    },
    activated () {
      this.loading = true
      this.mid = this.$route.params.id
      this._getAlbums(this.mid, 0, 20)
    },
    methods: {
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
      update (current) {
        this.scrollY = true
        let begin = (current - 1) * 20
        prefix(this.$refs.scrollBox, 'translate(0, 0)')
        this._getAlbums(this.mid, begin, 20)
      },
      selectAlbum (id) {
        this.$router.push({
          path: `/album/detail/${id}`
        })
      },
      _getAlbums (mid, begin, num) {
        getSingerAlbums(mid, begin, num).then(res => {
          if (res.code === ERR_OK) {
            this.albumName = res.data.singer_name
            this.albumList = this._createSingerAlbums(res.data.list)
            this.allPage = Math.ceil(res.data.total / 20)
            this.loading = false
          }
        })
      },
      _getAlbumDetail (mid) {
        getAlbumDetail(mid).then(res => {
          if (res.code === ERR_OK) {
            console.log(res)
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .album-singer-wrap,
  .album-singer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 44px;
    overflow: hidden;
    background-color: $white;
  }
  .album-singer {
    top: 0;
    padding: 0 $module-padding;
  }
  .album-title {
    margin: 0 0 $module-margin;
    font-weight: normal;
    height: $module-title-height;
    line-height: $module-title-height;
    border-bottom: 1px solid $border-color;
    font-size: $font-size-bg;
    color: $black;
  }
  .pagination-wrap {
    padding: $module-padding;
    text-align: center;
  }
</style>
