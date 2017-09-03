<template>
  <div class="loading">
    正在加载数据...
  </div>
</template>

<script>
  export default {
    name: 'loading'
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .loading {
    padding: $module-padding;
    text-align: center;
    color: $black;
    font-size: $font-size-base;
  }
</style>
