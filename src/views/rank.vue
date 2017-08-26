<template>
  <div class="rank">
    <div v-iscroll>
      <div>
        <div class="title">
          QQ音乐巅峰榜
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rank'
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .rank {
    padding: 0 $module-padding;
    .title {
      height: $module-title-height;
      line-height: $module-title-height;
      border-bottom: 1px solid $border-color;
      font-size: $font-size-bg;
      color: $black;
    }
  }
</style>
