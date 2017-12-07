<template>
  <div class="controller clearfix">
    <div class="history-btn icon-gray pull-left">
      <i class="iconfont icon-prev"></i>
    </div>
    <div class="history-btn icon-gray pull-left">
      <i class="iconfont icon-next"></i>
    </div>
    <div class="search-form">
      <input class="search-inp" type="text" placeholder="搜索">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'controller'
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .history-btn {
    margin-right: $module-margin;
    cursor: pointer;
    &.icon-gray {
      color: $gray-color;
    }
    .iconfont {
      font-size: $font-size-base;
    }
  }
  .search-form {
    position: relative;
    .search-inp {
      border: 0;
      outline: none;
      padding: $module-sm-padding $module-padding;
      width: 242px;
      background-color: $section-bg-color;
      border-radius: 20px;
      font-size: $font-size-base;
    }
  }
</style>

