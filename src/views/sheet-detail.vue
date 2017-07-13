<template>
  <div class="sheet-detail" v-iscroll="getIscroll">
    <div>
      <v-detail :list="sheetDetailList"></v-detail>
    </div>
  </div>  
</template>

<script>
  import { getSheetList } from '@/api/sheet'
  import { ERR_OK } from '@/util/config'
  import VDetail from '@/components/v-detail'
  export default {
    name: 'sheet-detail',
    components: {
      VDetail
    },
    activated () {
      this.getSheetDetail(this.$route.params.id)
    },
    data () {
      return {
        sheetDetailList: {}
      }
    },
    methods: {
      getSheetDetail (disstid) {
        getSheetList(disstid).then(res => {
          if (res.code === ERR_OK) {
            this.sheetDetailList = res.cdlist[0]
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .sheet-detail {
    position: absolute;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: $white;
  }
</style>
