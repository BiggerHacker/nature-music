<template>
  <div class="section">
    <div class="search-config">section</div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'section'
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variable';
  .section {
    position: relative;
    margin-left: $menu-width;
    height: 100%;
  }
  .search-config {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #d5d3d2;
  }
</style>
