<template>
  <div class="singer-detail-wrap">
    <div class="singer-detail" v-iscroll="getIscroll">
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import { getSingerDetail } from '@/api/singer'
  import { ERR_OK } from '@/util/config'
  export default {
    name: 'singer-detail',
    data () {
      return {
        begin: 0,
        num: 30,
        singerDetailList: {}
      }
    },
    activated () {
      this.mid = this.$route.params.id
      this._getSingerList(this.mid, this.begin, this.num)
    },
    methods: {
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
        })
      },
      _getSingerList (mid, begin, num) {
        getSingerDetail(mid, begin, num).then(res => {
          if (res.code === ERR_OK) {
            this.singerDetailList = res.data
            console.log(this.singerDetailList)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
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
</style>
