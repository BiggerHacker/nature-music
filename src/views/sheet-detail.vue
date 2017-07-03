<template>
  <div class="sheet-detail" v-iscroll>
    <div>
      detail
    </div>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getSheetList } from '@/api/sheet'
  export default {
    name: 'sheet-detail',
    computed: {
      ...mapGetters({
        sheetId: 'sheetId'
      })
    },
    activated () {
      if (this.sheetId !== '') {
        this.getSheetDetail(this.sheetId)
      } else {
        this.getSheetDetail(this.$route.params.id)
      }
    },
    methods: {
      getSheetDetail (disstid) {
        getSheetList(disstid).then(res => {
          console.log(res.cdlist[0])
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
