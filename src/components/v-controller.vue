<template>
  <div class="controller clearfix">
    <div class="history-btn pull-left" @click="back">
      <i class="iconfont icon-prev"></i>
    </div>
    <div class="history-btn pull-left" @click="forward">
      <i class="iconfont icon-next"></i>
    </div>
    <div class="search-form pull-left">
      <input class="search-inp" type="text" placeholder="搜索歌曲">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'controller',
    methods: {
      back () {
        this.$router.go(-1)
      },
      forward () {
        this.$router.go(1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .history-btn {
    margin-right: $module-margin;
    height: 44px;
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

