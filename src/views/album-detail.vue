<template>
  <div class="album-detail">
    album-detail
  </div>
</template>

<script>
  import { getAlbumDetail } from '@/api/album'
  import { ERR_OK } from '@/util/config'
  export default {
    name: 'album-detail',
    data () {
      return {
        albumDetail: []
      }
    },
    activated () {
      let mid = this.$route.params.id
      this._getAlbumDetail(mid)
    },
    methods: {
      _getAlbumDetail (mid) {
        getAlbumDetail(mid).then(res => {
          if (res.code === ERR_OK) {
            this.albumDetail = res.data
            console.log(this.albumDetail)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .album-detail {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 44px;
    overflow: hidden;
    background-color: $white;
  }
</style>
