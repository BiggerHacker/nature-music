<template>
  <div class="sheet-detail-wrap">
    <div class="sheet-detail" v-iscroll="getIscroll" v-if="!loading">
      <div>
        <v-detail @select="selectItem" :list="sheetDetailList"></v-detail>
      </div>
    </div>
    <v-loading v-if="loading"></v-loading>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { getSheetList } from '@/api/sheet'
  import { ERR_OK } from '@/util/config'
  import VDetail from '@/components/v-detail'
  import VLoading from '@/components/v-loading'
  export default {
    name: 'sheet-detail',
    components: {
      VDetail,
      VLoading
    },
    activated () {
      this.loading = true
      this.getSheetDetail(this.$route.params.id)
    },
    data () {
      return {
        sheetDetailList: {},
        loading: true
      }
    },
    methods: {
      getSheetDetail (disstid) {
        getSheetList(disstid).then(res => {
          if (res.code === ERR_OK) {
            this.sheetDetailList = res.cdlist[0]
            this.loading = false
          } else {
            this.$router.push({
              path: '/notfound'
            })
          }
        })
      },
      getIscroll (scroll) {
        scroll.on('scrollStart', () => {
          scroll.refresh()
        })
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.sheetDetailList.songlist,
          index: index
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
  .sheet-detail-wrap,
  .sheet-detail {
    position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: $white;
  }
  .sheet-detail {
    top: 0;
  }
</style>
