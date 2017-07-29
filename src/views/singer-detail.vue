<template>
  <div class="singer-detail-wrap">
    <div class="singer-detail" v-iscroll="getIscroll">
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'singer-detail',
    methods: {
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
